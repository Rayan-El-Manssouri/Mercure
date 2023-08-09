import React, { useState } from "react";
import "../styles/Connect.scss";
import Majax from "../components/Majax/Majax";
const Connect = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const majax = new Majax();

    const handleLogin = async () => {
        await majax.init("http://localhost:8000/api", "apikey")
            .then(() => {
                localStorage.setItem("email", email);
                majax.connect(email, password, "http://localhost:8000/api", "/Accueil", "apikey")
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="body">
            <div className="central_connect_form">
                <div className="form">
                    <div className="form-background"></div>
                    <img src={process.env.PUBLIC_URL + "assets/logo/color light 500.png"} alt="" />
                    <h1>Mercure Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    <span className="error">{error}</span>
                    <button type="submit" onClick={handleLogin}>
                        Se connecter
                    </button>
                    <div className="central_connect_form__links">
                        <a href="/register">Créer un compte</a>
                        <a href="/forgot-password">Mot de passe oublié</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connect;