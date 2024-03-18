import Image from 'next/image';
import NavLink from 'next/link';
import { useState, useEffect } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { CiGift, CiSettings } from "react-icons/ci";

const HeaderLiCST = "hover:bg-[#eee2ff] rounded transition-all cursor-pointer flex items-center mt-1 w-full text-1xl px-1 py-1 text-1xl";
const menuItems = [
    { label: 'Accueil', link: '/home', icon: <AiOutlineHome /> },
    { label: 'Messagerie', link: '/Messagerie', icon: <CiMail /> },
    { label: 'Recherche', link: '#', icon: <IoSearchOutline /> },
    { label: 'Notifications', link: '#', icon: <IoIosNotificationsOutline /> },
    { label: 'Don', link: '#', icon: <CiGift /> },
];

const SideBar = ({ activeItem }) => {
    const [activeItemState] = useState(activeItem);
    const [userInfo, setUserInfo] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (!storedToken) {
                    throw new Error('Token non trouvé dans sessionStorage');
                }
                const response = await fetch('/api/auth/users', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}` // Inclure le token JWT dans l'en-tête d'authorization
                    }
                });
                if (!response.ok) {
                    throw new Error('Échec de la récupération des informations de l\'utilisateur');
                }
                const userData = await response.json();
                setUserInfo(userData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleMouseEnter = index => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    return (
        <header className='flex flex-col h-full border p-2 bg-[#F4F5F7]'>
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
                <ul className='mt-2'>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                className={`${HeaderLiCST} mr-16 ${activeItemState === index ? 'bg-purple-100' : ''}`}
                                href={item.link}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="flex items-center">
                                    <div
                                        className={`transition-all border h-[15px] ${activeItemState === index ? 'border-purple-500' : 'border-transparent'} w-0 rounded`}
                                    ></div>
                                    <p className='ml-1 mr-1 font-normal'>
                                        {item.icon}
                                    </p>
                                    <p style={{ fontFamily: 'inherit' }}>{item.label}</p>
                                </div>

                            </NavLink>
                        </li>
                    ))}
                </ul>
            </ul>

            <div className='mt-auto border border-l-0 border-r-0 border-b-0 '>
                <div className={HeaderLiCST}>
                    <p className='ml-1 mr-1 text-lg'><CiSettings /></p>
                    <p className='px-1 py-1 text-1xl'>Paramètre</p>
                </div>

                <div className={HeaderLiCST}>
                    <BsPerson className='ml-1 mr-1 text-lg' />
                    <p className='px-1 py-1 text-1xl'>
                        {userInfo && <p>{userInfo.name}</p>}
                    </p>
                </div>

            </div>

        </header>
    );
};

export default SideBar;
