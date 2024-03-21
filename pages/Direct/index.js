import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar/SideBar";
import SectionJS from "./components/SectionJS";
import axios from 'axios';
import NewConversationDialog from './components/NewConversationDialog';
import Search from './components/Search';
import Info from './components/Info';

export default function Direct() {
    const [conversationData] = useState({
        participants: ["utilisateur1", "utilisateur2"],
        messages: []
    });

    const [showNewConversationDialog, setShowNewConversationDialog] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const openNewConversationDialog = () => {
        setShowNewConversationDialog(true);
        getUsers(); // Call getUsers when new users section is displayed
    };

    const closeNewConversationDialog = () => {
        setShowNewConversationDialog(false);
    };

    // Function to fetch users
    const getUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/getUsers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users: ' + error.message);
        }
    };

    const getConv = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/conversation/conv', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (err) {
            setError('Error fetching conversations: ' + err.message);
        }
    }

    useEffect(() => {
        getConv();
    }, []) // empty dependency array to run only once on mount

    return (
        <div className="flex flex-1 h-full">

            <SideBar activeItem={1} />

            <div className="flex flex-col">
                <Search openNewConversationDialog={openNewConversationDialog} />

                {/* Existing conversation display */}
                <div className="flex border p-1 flex-col w-96 bg-gray-50 overflow-y-auto h-full">
                    {/* Display conversation with each user */}
                    {conversationData.participants.map(user => (
                        <SectionJS
                            key={user}
                            senderName={user}
                            messageTime={null}
                            messageContent={"null"}
                        />
                    ))}
                </div>
            </div>

            <Info
                openNewConversationDialog={openNewConversationDialog}
            />

            <NewConversationDialog
                show={showNewConversationDialog}
                onClose={closeNewConversationDialog}
                users={users}
            />

            {error && <p>Error: {error}</p>}
        </div>
    );
}
