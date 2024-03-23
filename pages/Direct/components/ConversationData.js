import { IconUserCircle } from '@tabler/icons-react';
import React, { useState } from 'react';

function ConversationData({ conversationData, handleConversationClick }) {
    const [activeConversationId, setActiveConversationId] = useState(null);

    const handleClick = (participant) => {
        const participantData = {
            name: participant.name,
            email: participant.email 
        };
        handleConversationClick(participantData);
        setActiveConversationId(participant.name);
    };

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    return (
        <div className="flex border p-1 flex-col w-96 bg-gray-50 overflow-y-auto h-full">
            {conversationData.participants && conversationData.participants.map((participant, index) => {
                const isActive = participant.name === activeConversationId;
                const participantName = participant.name;
                const listMessage = conversationData.messages;
                const participantMessages = listMessage[participantName];
                const participantMessagesArray = Array.isArray(participantMessages) ? participantMessages : [];

                const latestMessage = participantMessagesArray.length > 0 ? participantMessagesArray[participantMessagesArray.length - 1] : null;

                let messageTimeFormatted = '';
                let content = '';

                if (latestMessage) {
                    const messageTime = latestMessage.messageTime;
                    content = latestMessage.content;
                    messageTimeFormatted = formatTime(messageTime);
                } else {
                    content = null
                }

                return (
                    <section
                        key={index}
                        className={`flex flex-row rounded-lg items-center cursor-pointer p-1 mb-1 ${isActive ? 'bg-gray-200' : ''} hover:bg-gray-100`}
                        onClick={() => handleClick(participant)}
                    >
                        <div>
                            <IconUserCircle className="w-8 h-8 mr-2 stroke-1" />
                        </div>

                        <div className="text-sm flex flex-col w-full">
                            <div className='flex'>
                                <div className="flex justify-between w-full">
                                    
                                    <p style={{ fontFamily: 'Cantarell' }}>{participantName}</p>

                                    <p className="text-gray-500 ml-auto">
                                        {messageTimeFormatted}
                                    </p>
                                </div>
                            </div>

                            <div className="text-gray-700 overflow-hidden whitespace-nowrap text-overflow-ellipsis max-w-56">
                                {content}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ConversationData;