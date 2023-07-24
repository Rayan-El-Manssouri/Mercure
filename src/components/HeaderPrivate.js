import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderPrivate = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                window.location.href = '/Connect';
            } else {
                console.error('Erreur lors de la déconnexion côté serveur');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

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
                <div className='logout'>
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            </ul>
        </header>
    );
};

export default HeaderPrivate;