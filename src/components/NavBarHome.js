import { NavLink } from "react-router-dom";
import { IconHome, IconMail, IconSearch, IconBell, IconUser, IconSettings, IconGift } from "@tabler/icons-react";

const HeaderPrivate = ({ logo }) => {
    return (
        <div id="sidebar">
            <div id="logo">
                <img src={logo} alt="logo" />
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
                <NavLink exact="true" to="/Paramètres">
                    <IconGift />
                    Don
                </NavLink>

                <div className="logout" >
                    <IconUser />
                    <p>Nom d'utilisateur</p>
                </div>
            </nav>
        </div>
    );
};

export default HeaderPrivate;