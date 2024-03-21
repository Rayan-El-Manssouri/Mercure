import React from 'react';

const Info = ({ openNewConversationDialog }) => {
    return (
        <div className="flex flex-1 justify-center items-center flex-col">
            <div className="flex flex-col items-center">
                <div className="mb-2">
                    <img src="/assets/color light 500.png" alt="Logo" width={50} height={50} />
                </div>
                <p className="mb-2">Pour acceder à un message, cliquer sur une conversation.</p>
            </div>
            <div>
                {/* Button to add new conversation */}
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" onClick={openNewConversationDialog}>
                    Envoyer un message
                </button>
            </div>
        </div>
    );
};

export default Info;