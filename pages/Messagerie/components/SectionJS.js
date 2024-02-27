import React from 'react';

import { BsPerson } from "react-icons/bs";

const SectionJS = () => {
    const senderName = "Mon pseudo";
    const messageTime = "13h52";
    const messageContent = "Le message";

    return (
        <section className="flex flex-row hover:bg-slate-50 h-10 rounded items-center cursor-pointer mb-1">
            <BsPerson className="text-2xl mr-2" />

            <div className="text-sm">

                <div className="flex">
                    <p className="mr-[100px]">{senderName}</p>
                    <p className="mr-1">{messageTime}</p>
                </div>

                <p>{messageContent}</p>
            </div>

        </section>

    );
};

export default SectionJS;