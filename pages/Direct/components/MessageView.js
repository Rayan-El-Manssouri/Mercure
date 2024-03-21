import React from 'react';

function MessageView({ messages }) {
    return (
        <div className="flex border p-1 flex-col w-96 bg-gray-50 overflow-y-auto h-full">
            {messages.map((message, index) => (
                <section key={index} className="flex flex-row mb-1">
                    <div className="text-sm flex flex-col w-full">
                        <div className="flex justify-between">
                            <p style={{ fontFamily: 'Cantarell' }}>{message.sender}</p>
                            <p style={{ fontFamily: 'Cantarell' }} className="text-gray-500 mr-4">{message.time}</p>
                        </div>
                        <p className="text-gray-700">{message.content}</p>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default MessageView;
