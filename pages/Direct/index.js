import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar/SideBar";
import NewConversationDialog from './components/NewConversationDialog';
import Search from './components/Search';
import Info from './components/Info';
import ConversationData from './components/ConversationData';

import { Majax } from '../Majax/Majax';
import { IconCamera, IconPhone, IconPointFilled, IconUserCircle } from '@tabler/icons-react';

const yourMessageStyle = "bg-gray-200 rounded text-sm p-1";
const otherMessageStyle = "bg-gray-200 text-black self-start px-2 py-1 rounded-lg text-sm mt-1 mb-1";

export default function Direct() {
    const [conversationData, setConversationData] = useState({ participants: [], messages: {} });
    const [showNewConversationDialog, setShowNewConversationDialog] = useState(false);
    const [users, setUsers] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);

    const majax = new Majax();

    const openNewConversationDialog = () => {
        setShowNewConversationDialog(true);
        majax.getUsers()
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const closeNewConversationDialog = () => {
        setShowNewConversationDialog(false);
    };

    const getConv = async () => {
        try {
            const token = localStorage.getItem('token');
            const convData = await majax.getConv(token);
            setConversationData(convData);
        } catch (err) {
            console.log("Erreur dans la récupération des conversations :", err);
        }
    };

    useEffect(() => {
        getConv();
    }, []);

    const handleConversationClick = (conversation) => {
        setActiveConversation(conversation);
    };

    return (
        <div className="flex flex-1 h-full">
            <SideBar activeItem={1} />

            <div className="flex flex-col">
                <Search openNewConversationDialog={openNewConversationDialog} />
                <ConversationData conversationData={conversationData} handleConversationClick={handleConversationClick} />
            </div>

            {activeConversation && conversationData.messages[activeConversation] ? (
                <div className='flex flex-1 flex-col'>
                    <div className='px-1 py-2 w-full border h-10 border-t-0 border-r-0 border-l-0 text-center items-center flex'>
                        <div>
                            <IconUserCircle className='stroke-1' />
                        </div>
                        <div className='ml-1 flex items-center text-center'>
                            <p className=' hover:bg-gray-100 rounded px-1 py-1 cursor-pointer' style={{ fontFamily: 'Cantarell' }}>
                                {activeConversation}
                            </p>

                            <IconPointFilled color='rgb(134, 239 ,172)' />
                            <p className='text-sm text-gray-400'>- En ligne</p>
                        </div>
                        <div className='flex items-center ml-auto'>
                            <IconCamera className='stroke-1 mr-1 hover:bg-gray-200 rounded transition-all ' />
                            <IconPhone className='stroke-1 mr-1 hover:bg-gray-200 rounded transition-all ' />
                        </div>
                    </div>

                    {/* Afficher les messages envoyés par tous les participants */}
                    <div>
                        {conversationData.messages[activeConversation].map((message, index) => (
                            <div key={index}>
                                <div className={`flex items-center ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>

                                    {/* Afficher l'icône uniquement sur le dernier message envoyé par chaque participant */}
                                    {(index === conversationData.messages[activeConversation].length - 1 || conversationData.messages[activeConversation][index + 1]?.sender !== message.sender) && (
                                        <IconUserCircle className="stroke-1 mr-2" />
                                    )}

                                    {message.sender === 'you' ? (
                                        <p className={`message-container ${yourMessageStyle}`}>
                                            {message.content}
                                        </p>
                                    ) : (
                                        <div className={`message-container ${otherMessageStyle}`} style={{ marginLeft: (index === conversationData.messages[activeConversation].length - 1 || conversationData.messages[activeConversation][index + 1]?.sender !== message.sender) ? '0' : '30px' }}>
                                            {message.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ) : (
                <Info openNewConversationDialog={openNewConversationDialog} />
            )}

            <NewConversationDialog
                show={showNewConversationDialog}
                onClose={closeNewConversationDialog}
                users={users}
            />
        </div>
    );
}