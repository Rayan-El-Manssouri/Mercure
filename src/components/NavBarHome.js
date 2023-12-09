import { NavLink } from "react-router-dom";
import { IconHome, IconMail, IconSearch, IconBell, IconUser, IconSettings, IconGift } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const HeaderPrivate = ({ logo }) => {
    const [pseudo, setPseudo] = useState()

    const handleLogginGet = async () => {
        if (localStorage.getItem("Pseudo") == null) {
            alert("Une erreur et survenu ...")
            window.location.href = "/Accueil"
        } else {
            setPseudo(localStorage.getItem("Pseudo"))
        }
    }

    useEffect(() => {
        handleLogginGet()
    })

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