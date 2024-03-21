import { useState } from 'react';
import NavLink from 'next/link';

const HeaderLiCST = "hover:bg-[#eee2ff] rounded transition-all cursor-pointer flex items-center mt-1 w-full text-1xl px-1 py-1 text-1xl";

const MenuElement = ({ item, index, activeItem }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Removed unnecessary if condition
    // setIsHovered(activeItem === item.id);

    const isActive = activeItem === item.id;

    return (
        <li>
            <NavLink
                className={`${HeaderLiCST} mr-16 ${isActive ? 'bg-purple-200' : isHovered ? 'bg-purple-100' : ''}`}
                href={item.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center flex-row">
                    <div
                        className={`transition-all border h-[15px] ${isActive ? 'border-purple-500' : isHovered ? 'border-purple-400' : 'border-transparent'} w-0 rounded`}
                    ></div>
                    <div className='flex items-center'>
                        <p className='ml-1 mr-1 font-Cantarell' style={{ fontFamily: 'Cantarell' }}>
                            {item.icon}
                        </p>
                        <p className='text-sm' style={{ fontFamily: 'Cantarell' }}>{item.label}</p>
                    </div>
                </div>
            </NavLink>
        </li>
    );
};

export default MenuElement;