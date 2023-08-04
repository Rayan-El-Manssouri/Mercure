import React from 'react';
import Auth from './UserManager/UserManager';

class Majax extends React.Component {
    apiKey = null;

    async init(url, apiKey) {
        await Auth.init(url, apiKey);
        this.apiKey = Auth.apiKey;
    }

    async connect(email, password, url, urlRedirect) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            await Auth.connect(email, password, url, urlRedirect);
            localStorage.setItem("email", email);
        } catch (error) {
            throw new Error("Erreur lors de la connexion de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée.");
        }
    }

    async logout(url, urlRedirect) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            await Auth.logout(url, urlRedirect);
        } catch (error) {
            throw new Error("Erreur lors de la déconnexion de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée.");
        }
    }

    async verifyaccount(email, urlEndpoint) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            const statue = await Auth.verifyaccount(email, urlEndpoint);
            return statue;
        } catch (error) {
            throw new Error("Erreur lors de la vérification du compte, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée.");
        }
    }

    render() {
        return null;
    }
}

export default Majax;