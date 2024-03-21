import { useState } from "react";

const HeaderLiCST = "hover:bg-[#eee2ff] rounded transition-all cursor-pointer flex items-center mt-1 w-full text-1xl px-1 py-1 text-1xl";

const SubMenuElement = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            key={index}
            className={`flex items-center text-center flex-row ${HeaderLiCST}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Pink border */}
            <div
                className={`transition-all border h-[15px] ${ isHovered ? 'border-purple-400' : 'border-transparent'} w-0 rounded`}
            ></div>
            <p className='mr-1 ml-1'>
                {item.icon}
            </p>
            <p className='text-sm' style={{ fontFamily: 'Cantarell' }}>
                {item.label}
            </p>
        </div>
    );
};

export default SubMenuElement;