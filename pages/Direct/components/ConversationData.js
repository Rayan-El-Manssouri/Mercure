import { IconUserCircle } from '@tabler/icons-react';
import React from 'react';

function ConversationData({ conversationData, handleConversationClick }) {
    const handleClick = () => {
        return conversationData.messages;
    };

    return (
        <div className="flex border p-1 flex-col w-96 bg-gray-50 overflow-y-auto h-full">
            {conversationData.participants.map((participant, index) => {
                const participantMessages = conversationData.messages.filter(message => message.sender === participant);
                const lastMessage = participantMessages[participantMessages.length - 1];
                const messageTime = lastMessage ? new Date(lastMessage.messageTime * 1000) : null;
                const formattedTime = messageTime ? `${messageTime.getHours()}:${messageTime.getMinutes().toString().padStart(2, '0')}` : '';
                
                return (
                    <section key={index} className="flex flex-row hover:bg-gray-100 rounded-lg items-center cursor-pointer p-1 mb-1" onClick={() => handleConversationClick(participant)}>
                        <div>
                            <IconUserCircle className="w-8 h-8 mr-2 stroke-1" />
                        </div>

                        <div className="text-sm flex flex-col w-full">
                            <div className="flex justify-between">
                                <p style={{ fontFamily: 'Cantarell' }}>{participant}</p> {/* Assuming participant has a name property */}
                                <p style={{ fontFamily: 'Cantarell' }} className="text-gray-500 mr-4">{formattedTime}</p>
                            </div>
                            <p className="text-gray-700 overflow-hidden whitespace-nowrap text-overflow-ellipsis max-w-56">
                                {lastMessage ? lastMessage.content : 'No messages'} {/* Rendering content of last message or a fallback text */}
                            </p>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ConversationData;