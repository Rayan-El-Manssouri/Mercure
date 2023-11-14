import { NavLink } from "react-router-dom";
import { IconHome, IconMail, IconSearch, IconBell, IconUser, IconSettings, IconGift } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

const HeaderPrivate = ({ logo }) => {
    const [pseudo, setPseudo] = useState()

    const handleLogginGet = async () => {
        const response = await axios.post('http://localhost:5000/Fetch_Pseudo', {
            user_email: "compte_utilisateur_1@gmail.com"
        } , {
            headers : {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        })
        try {
            setPseudo(response.data.pseudo)
        } catch {
            return 'Une erreur s"est passée...'
        }
    }

    handleLogginGet()

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
                    <p>{pseudo}</p>
                </div>
            </nav>
        </div>
    );
};

export default HeaderPrivate;