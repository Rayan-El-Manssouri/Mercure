import React from 'react';
import logo from '../assets/color light 500.png'
import '../styles/main.scss'
import { useNavigate } from 'react-router-dom';

const Header = ({ active }) => {

    const navigate = useNavigate()
    const activestyle = active
    const handleRefresh = ((redirect) => {
        navigate(redirect)
    })

    return (
        <header>
            <div className='header-top'>
                <img src={logo} alt='Icon Mercure Logo' />
            </div>
            <div className='header-ul'>
                <ul>
                    <li>Télécharger</li>
                    <li>Api</li>
                    <li>Blog</li>
                    <li>Support</li>
                    <li>Nouveauté</li>
                    <li>Github</li>
                    <li>Hébergeur</li>
                </ul>
            </div>
            <div className={"header-right " + activestyle} style={{ marginLeft: "auto" }}>
                <button onClick={() => handleRefresh("Connect")}>Connexion</button>
                <button onClick={() => handleRefresh("register")}>Inscription</button>
            </div>

        </header>
    );
};

export default Header;