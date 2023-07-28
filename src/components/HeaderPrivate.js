import React from 'react';
import { NavLink } from 'react-router-dom';
import './stylesComponents/HeaderPrivates.scss';
import handleLogout from '../GestionComptes/HandleLogout.js';

const HeaderPrivate = () => {

    return (
        <header>
            <div className='logo'>
                <span>Mercure</span>
                <img src="assets/logo_light.png" alt="random" />
            </div>
            <ul>
                <li>
                    <NavLink to="/Home">
                        <img src="./assets/dashboard.png" alt="random" />
                        Acceuil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Private">
                        <img src="./assets/notification.png" alt="random" />
                        Notification
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Private">
                        <img src="./assets/user_default.png" alt="random" />
                        Profil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Private">
                        <img src="./assets/search.png" alt="random" />
                        Recherche
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Messagerie">
                        <img src="./assets/message.png" alt="random" />
                        Message
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Private">
                        <img src="./assets/settings.png" alt="random" />
                        Paramètre
                    </NavLink>
                </li>
            </ul>
            <div className='logout'>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
        </header>
    );
};

export default HeaderPrivate;