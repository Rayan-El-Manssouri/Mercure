import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar/SideBar";
import NewConversationDialog from './components/NewConversationDialog';
import Search from './components/Search';
import Info from './components/Info';
import ConversationData from './components/ConversationData';
import MessageView from './components/MessageView'; // Importez le composant pour afficher les messages

import { Majax } from '../Majax/Majax';

export default function Direct() {
    const [conversationData, setConversationData] = useState({ participants: [], messages: [] });
    const [showNewConversationDialog, setShowNewConversationDialog] = useState(false);
    const [users, setUsers] = useState([]);

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
            console.log("Erreur dans la récupération des conversation :", err);
        }
    };

    useEffect(() => {
        getConv();
    }, []);

    const handleConversationClick = (conversationId) => {
        console.log(conversationId);
    };

    return (
        <div className="flex flex-1 h-full">
            <SideBar activeItem={1} />
            <div className="flex flex-col">
                <Search openNewConversationDialog={openNewConversationDialog} />

                <ConversationData conversationData={conversationData} handleConversationClick={handleConversationClick} />

            </div>
            <Info openNewConversationDialog={openNewConversationDialog} />

            <NewConversationDialog
                show={showNewConversationDialog}
                onClose={closeNewConversationDialog}
                users={users}
            />
        </div>
    );
}
