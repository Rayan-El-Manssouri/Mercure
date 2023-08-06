import React, { useEffect, useState } from "react";
import Majax from "../components/Majax/Majax";
import "../styles/Private.scss";
import HeaderPrivate from "../components/HeaderPrivate";
import NavBarHome from "../components/NavBarHome";
import { Navigate } from "react-router-dom";

const Private = () => {
    const majax = new Majax();
    const [isConnected, setIsConnected] = useState();

    useEffect(() => {
        const handleinit = async () => {
            try {
                await majax.init("http://localhost:8000/api", "apikey");
                const status = await majax.verifyaccount(localStorage.getItem("email"), "http://localhost:8000/checkLogin");
                setIsConnected(status);
            } catch (error) {
                console.log("Error in handleinit:", error);
                setIsConnected(false);
            }
        };

        handleinit();
    }, []);

    if (isConnected === false) {
        return (
            <Navigate to="/Connect" />
        );
    }

    return (
        <div className="body_private">
            <HeaderPrivate />
            <main>
                <nav>
                    <NavBarHome />
                </nav>
                <p>Hey !</p>
                {isConnected ? <p>Vous êtes connecté</p> : <p>Vous êtes pas connecté</p>}
            </main>
        </div>
    );
};

export default Private;