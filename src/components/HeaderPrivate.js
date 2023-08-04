import React from "react";
import { NavLink } from "react-router-dom";
import "./stylesComponents/HeaderPrivates.scss";
import handleLogout from '../GestionComptes/HandleLogout.js';
import { IconHome, IconMail, IconSearch, IconBell, IconUser, IconSettings } from "@tabler/icons-react";
const HeaderPrivate = () => {
    return (
        <div id="sidebar">
            <div id="logo">
                <img src="assets/logo/color light 50.webp" alt="logo" />
                <p>Mercure</p>
            </div>
            <nav>
                <NavLink exact="true" to="/Accueil">
                    <IconHome />
                    Accueil
                </NavLink>
                <NavLink exact="true" to="/Messagerie">
                    <IconMail />
                    Messagerie
                </NavLink>
                <NavLink exact="true" to="/Recherche">
                    <IconSearch />
                    Recherche
                </NavLink>
                <NavLink exact="true" to="/Notifications">
                    <IconBell />
                    Notifications
                </NavLink>
                <NavLink exact="true" to="/Profil">
                    <IconUser />
                    Mon profil
                </NavLink>
                <NavLink exact="true" to="/Paramètres">
                    <IconSettings />
                    Paramètres
                </NavLink>
                <div onClick={handleLogout} className="logout" >
                    <p>Déconnexion</p>
                </div>
            </nav>
        </div>
    );
};

export default HeaderPrivate;
