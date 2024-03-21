import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IconBell, IconCreditCard, IconGift, IconHome, IconMessage, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';

// Élément du side bar
import MenuElement from './components/MenuElement';
import SubMenuElement from './components/SubMenuElement';
import { Majax } from '../../Majax/Majax'

const SideBar = ({ activeItem }) => {
    const [activeItemState] = useState(activeItem);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const majaxInstance = new Majax();
        
        const fetchData = async () => {
            const userData = await majaxInstance.getToken();
            if(userData) {
                setUserInfo(userData);
            }
        };

        fetchData();
    }, []);


    const menuItems = [
        { label: 'Accueil', link: '/Home', icon: <IconHome className='w-4 stroke-1' />, id: 0 },
        { label: 'Messagerie', link: '/Direct', icon: <IconMessage className='w-4 stroke-1' />, id: 1 },
        { label: 'Recherche', link: '#', icon: <IconSearch className='w-4 stroke-1' />, id: 2 },
        { label: 'Notifications', link: '#', icon: <IconBell className='w-4 stroke-1' />, id: 3 },
        { label: 'Don', link: '#', icon: <IconGift className='w-4 stroke-1' />, id: 4 },
    ];

    const subMenuItems = [
        { label: 'Paramètres', link: '#', icon: <IconSettings className='w-4 stroke-1' /> },
        { label: userInfo && <p>{userInfo.name}</p>, link: '#', icon: <IconUser className='w-4 stroke-1' /> },
        { label: 'Forfait', link: '#', icon: <IconCreditCard className='w-4 stroke-1' /> }
    ];

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
            <ul className='mt-2'>
                {menuItems?.map((item, index) => (
                    <MenuElement
                        key={index}
                        item={item} // Correction : Passer l'élément en tant que "item"
                        activeItem={activeItemState}
                    />
                ))}
            </ul>

            <div className='mt-auto border border-l-0 border-r-0 border-b-0 '>
                {subMenuItems?.map((item, index) => (
                    <SubMenuElement
                        key={index} // Ajout de la clé unique
                        item={item}
                        index={index}
                    />
                ))}
            </div>
        </header>
    );
};

export default SideBar;