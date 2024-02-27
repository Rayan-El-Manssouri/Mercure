import React, { useState } from 'react';
import Image from 'next/image';

const Header = ({ openModal }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <header className='p-2 border flex items-center justify-between text-sl w-full shadow-sm'>

            <div className='flex items-center space-x-3 w-full'>
                {/* Logo */}
                <Image
                    src="/assets/color light 500.png"
                    width={50}
                    height={50}
                    alt="Logo"
                />

                {/* Navigation */}
                <ul className="flex space-x-1 ">
                    <li className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded  cursor-pointer transition-all">Accueil</li>
                    <li className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded  cursor-pointer transition-all">Message</li>
                    <li className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded  cursor-pointer transition-all">API</li>
                    <li className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded  cursor-pointer transition-all">Support</li>
                    <li className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded  cursor-pointer transition-all">Nouveauté</li>
                    <li className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded  cursor-pointer transition-all">Hébergeur</li>
                </ul>

                <div className='w-full mr-auto text-right'>
                    <button
                        className="group relative justify-center py-2 px-4 text-gray-500 text-sm font-medium rounded-md border border-gray-300 hover:bg-[#F6F8FA] transition"
                        onClick={openModal}
                    >
                        Connexion
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;