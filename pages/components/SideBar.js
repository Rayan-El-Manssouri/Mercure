import Image from 'next/image';
const HeaderLiCST = "hover:bg-slate-50 rounded transition-all cursor-pointer flex items-center mt-1";
import NavLink from 'next/link';

import { AiOutlineHome } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { CiGift, CiSettings } from "react-icons/ci";
import { useState } from 'react';

const menuItems = [
    { label: 'Accueil', link: '/home', icon: <AiOutlineHome /> },
    { label: 'Messagerie', link: '/Messagerie', icon: <CiMail /> },
    { label: 'Recherche', link: '#', icon: <IoSearchOutline /> },
    { label: 'Notifications', link: '#', icon: <IoIosNotificationsOutline /> },
    { label: 'Mon profil', link: '#', icon: <BsPerson /> },
    { label: 'Don', link: '#', icon: <CiGift /> },
];

const SideBar = ({ activeItem }) => {
    const [activeItemState] = useState(activeItem);

    return (
        <header className='flex flex-col h-full border p-2'>
            <div className='w-full flex text-center items-center justify-center border border-r-0 border-l-0 border-t-0 p-1 mb-2'>
                <Image
                    src="/assets/color light 500.png"
                    width={40}
                    height={40}
                    className='m-1'
                    alt="Logo"
                />
                <h1 className='font-normal text-xl ml-2'>Mercure</h1>
            </div>
            <ul>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} >
                            <NavLink className={`${HeaderLiCST} mr-[70px] w-full text-1xlmr-[60px] px-1 py-1 text-1xl ${activeItemState === index ? 'bg-slate-100' : ''}`} href={item.link}>
                                <p className='ml-1 mr-1 text-lg'>
                                    {item.icon}
                                </p>
                                <p>{item.label}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </ul>
            <div className='mt-auto border border-l-0 border-r-0 border-b-0 '>
                <div className={HeaderLiCST}>
                    <p className='ml-1 mr-1 text-lg'><CiSettings /></p>
                    <p className='mr-[60px] px-1 py-1 text-1xl'>Paramètre</p>
                </div>
            </div>
        </header>
    );
};

export default SideBar;