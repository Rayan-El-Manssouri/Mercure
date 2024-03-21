// Import modules
import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar/SideBar";
import NewConversationDialog from './components/NewConversationDialog';
import Search from './components/Search';
import Info from './components/Info';
import ConversationData from './components/ConversationData';

// Import class
import { Majax } from '../Majax/Majax'; // Importer la classe Majax

export default function Direct() {
    const [conversationData, setConversationData] = useState({ participants: [] }); // Initialize state with an empty array

    const [showNewConversationDialog, setShowNewConversationDialog] = useState(false);
    const [users, setUsers] = useState([]);

    const majax = new Majax();

    const openNewConversationDialog = () => {
        setShowNewConversationDialog(true);
        majax.getUsers()
            .then(data => setUsers(data)) // Fixer les data de users
            .catch(error => console.error('Error fetching users:', error));
    };

    const closeNewConversationDialog = () => {
        setShowNewConversationDialog(false);
    };

    // Récupérer les conversations depuis l'api
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
    }, []); // Added empty dependency array to run once on mount


    return (
        <div className="flex flex-1 h-full">
            <SideBar activeItem={1} />
            <div className="flex flex-col">
                <Search openNewConversationDialog={openNewConversationDialog} />
                <ConversationData conversationData={conversationData} /> {/* Utilisation du nouveau composant */}
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