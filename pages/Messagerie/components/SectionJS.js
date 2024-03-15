import React from 'react';
import { BsPerson } from "react-icons/bs";

const SectionJS = () => {
    const senderName = "Utilisateur";
    const messageTime = "13h52";
    const messageContent = "Mon message";

    return (
        <section className="flex flex-row hover:bg-gray-100  rounded-lg items-center cursor-pointer p-1 mb-1">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </div>

            <div className="text-sm= flex flex-col w-full" >


                <div className="flex justify-between">
                    <p className="">{senderName}</p>
                    <p className="text-gray-500 mr-4">{messageTime}</p>
                </div>

                <p className="text-gray-700 overflow-hidden whitespace-nowrap text-overflow-ellipsis max-w-56">
                    {messageContent}
                </p>

            </div>
        </section>
    );
};

export default SectionJS;