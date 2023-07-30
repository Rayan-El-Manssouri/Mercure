import React from 'react';
import { IconUser  } from '@tabler/icons-react';

const NavBarHome = () => {
    return (
        <div className='Header'>
            <div id="welcome">
                <p>Bienvenue sur Mercure !</p>
            </div>
            <div className="space"></div>
            <div className="button">
                <IconUser />
                <p>Compte</p>
            </div>
        </div>
    );
};

export default NavBarHome;