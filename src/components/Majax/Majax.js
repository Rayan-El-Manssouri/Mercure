import React from 'react';
import Auth from './UserManager/UserManager';

class Majax extends React.Component {
    apiKey = null;

    async init(url, apiKey) {
        await Auth.init(url, apiKey);
        this.apiKey = Auth.apiKey;
    }

    async connect(email, password, url, urlRedirect, apikey) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            await Auth.connect(email, password, url, urlRedirect, apikey);
            localStorage.setItem("email", email);
        } catch (error) {
            throw new Error("Erreur lors de la connexion de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de connect");
        }
    }

    async logout(url, urlRedirect) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'. Appelle de logout");
        }
        try {
            await Auth.logout(url, urlRedirect);
        } catch (error) {
            throw new Error("Erreur lors de la déconnexion de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de logout");
        }
    }

    async verifyaccount(email, urlEndpoint) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'. Appelle de verifyaccount");
        }
        try {
            const statue = await Auth.verifyaccount(email, urlEndpoint);
            return statue;
        } catch (error) {
            throw new Error("Erreur lors de la vérification du compte, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de verifyaccount");
        }
    }

    async fetchUser(url, UserEmail, apikey, functionName) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'. Appelle de fetchUser");
        }
        try {
            const user = await Auth.fetchUser(url, UserEmail, apikey, functionName);
            return user;
        } catch (error) {
            throw new Error("Erreur lors de la récupération de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de fetchUser");
        }
    }

    async fetchUsers(url, apikey, functionName) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'. Appelle de fetchUsers");
        }
        try {
            const users = await Auth.fetchUsers(url, apikey, functionName);
            return users;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des utilisateurs, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de fetchUsers");
        }
    }


    async fetchUserUniqueComunity(url, UserEmail, apikey, functionName) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'. Appelle de fetchUserUniqueComunity");
        }
        try {
            const user = await Auth.fetchUserUniqueComunity(url, UserEmail, apikey, functionName);
            return user;
        } catch (error) {
            throw new Error("Erreur lors de la récupération de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de fetchUserUniqueComunity");
        }
    }

    // http://localhost:8000/api", sender, receiver, content, "apikey", "sendMessage"
    async sendMessage(url, apikey, functionName, content, receiver, timestamp, sender) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'. Appelle de sendMessage");
        }
        try {
            const users = await Auth.sendMessage(url, apikey, functionName, content, receiver, timestamp, sender);
            return users;
        } catch (error) {
            throw new Error("Erreur lors de l'envoie du message, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée. Proviens de sendMessage");
        }
    }

    render() {
        return null;
    }
}

export default Majax;