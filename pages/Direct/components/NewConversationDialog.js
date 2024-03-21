import Close from '@/pages/components/Close';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

const NewConversationDialog = ({ show, onClose, users }) => {
    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-[60%]">
                <div className='flex flex-row items-center justify-center text-center'>
                    <p className='mr-2'>New</p>
                    <div className='border w-full border-gray-100 mr-4 rounded' />
                    <div className='ml-auto hover:bg-gray-200 rounded p-1 transition-all mr-2 cursor-pointer' onClick={onClose}>
                        <Close />
                    </div>
                </div>
                <div className="transition-all flex items-center flex-row mt-4 border rounded pw-1 py-2 focus-within:border-purple-300">
                    <IoSearch className=' ml-1 mr-1' />
                    <input
                        type="text"
                        placeholder="Rechercher un utilisateur"
                        className="outline-none w-full"
                    />
                </div>
                <div className="mt-4">
                    <ul className="">
                        {users.map((user, index) => (
                            <li key={index} className="py-2 hover:bg-gray-100 cursor-pointer mb-2 rounded px-2 transition-all">{user}</li>
                        ))}
                    </ul>
                </div>
                <button className='bg-purple-600 text-white rounded w-full p-2 mt-2 hover:bg-purple-700'>Envoyer</button>
            </div>
        </div>
    );
};

export default NewConversationDialog;
