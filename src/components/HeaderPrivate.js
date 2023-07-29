import React from 'react';
import { NavLink } from 'react-router-dom';
import './stylesComponents/HeaderPrivates.scss';
// import handleLogout from '../GestionComptes/HandleLogout.js';
import { IconHome, IconMail, IconSearch, IconBell, IconUser, IconSettings  } from '@tabler/icons-react';
const HeaderPrivate = () => {

    return (
        <div id="sidebar">
            <div id="logo">
                <img src="assets/logo/color light 50.webp" alt="logo" />
                <p>Mercure</p>
            </div>
            <nav>
                <NavLink className="button">
                    <IconHome />
                    Accueil
                </NavLink>
                <NavLink className="button">
                    <IconMail />
                    Messagerie
                </NavLink>
                <NavLink className="button">
                    <IconSearch />
                    Recherche
                </NavLink>
                <NavLink className="button">
                    <IconBell />
                    Notifications
                </NavLink>
                <NavLink className="button">
                    <IconUser />
                    Mon profil
                </NavLink>
                <NavLink className="button">
                    <IconSettings />
                    Paramètres
                </NavLink>
            </nav>
        </div>
    );
};

export default HeaderPrivate;