const UserManager = {
    async init(url, apiKey) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ apiKey }),
                credentials: "include",
            });

            if (response.ok) {
                this.apiKey = apiKey;
                console.log("Connexion réussie à la base de données");
            } else {
                this.apiKey = null;
                throw new Error("Email ou mot de passe incorrect");
            }
        } catch (error) {
            throw new Error(
                "Erreur lors de la connexion à la bdd, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée."
            );
        }
    },

    async connect(email, password, url, urlRedirect) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            console.log(email, password, url, urlRedirect)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            console.log(response)
            if (response.ok) {
                window.location.href = urlRedirect;
            } else {
                throw new Error("Email ou mot de passe incorrect");
            }
        } catch (error) {
            throw new Error("Erreur lors de la connexion de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée.");
        }
    },

    async logout(url, urlRedirect) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                localStorage.removeItem("email");
                window.location.href = urlRedirect;
            } else {
                console.error("Erreur lors de la déconnexion côté serveur");
            }
        } catch (error) {
            throw new Error("Erreur lors de la connexion de l'utilisateur, vérifie que l'url est correcte, que le serveur est bien lancé et que l'API key est bien renseignée.");
        }
    },

    async verifyaccount(email, urlEndpoint) {
        if (!this.apiKey) {
            throw new Error("La clé d'API n'a pas été initialisée. Appelle d'abord la méthode 'init'.");
        }
        try {
            const urlWithParams = new URL(urlEndpoint);
            urlWithParams.searchParams.append("user_email", email);

            const response = await fetch(urlWithParams, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Server Response Data:", data);
                if (data.message === "Utilisateur connecté") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log("Error in verifyaccount:", error);
            return false;
        }
    },
};

export default UserManager;