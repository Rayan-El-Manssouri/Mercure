import { IconUserCircle } from '@tabler/icons-react';
import React, { useState } from 'react';

function ConversationData({ conversationData, handleConversationClick }) {
    const [activeConversationId, setActiveConversationId] = useState(null);

    const handleClick = (participant) => {
        handleConversationClick(participant);
        setActiveConversationId(participant);
    };

    return (
        <div className="flex border p-1 flex-col w-96 bg-gray-50 overflow-y-auto h-full">
            {conversationData.participants.map((participant, index) => {
                const isActive = participant === activeConversationId;

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
                                <div className="flex justify-between">
                                    <p style={{ fontFamily: 'Cantarell' }}>{participant}</p>
                                </div>
                                <div className="text-gray-500 ml-auto mr-2">
                                    {/* Afficher l'heure au format h:m */}
                                    {conversationData.messages[participant] &&
                                        conversationData.messages[participant].length > 0 &&
                                        new Date(conversationData.messages[participant][0].messageTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                                </div>
                            </div>

                            <div className="text-gray-700 overflow-hidden whitespace-nowrap text-overflow-ellipsis max-w-56">
                                {/* Afficher le contenu du dernier message envoyé par le participant */}
                                {conversationData.messages[participant] &&
                                    conversationData.messages[participant].length > 0 &&
                                    conversationData.messages[participant][0].content}
                            </div>

                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ConversationData;
