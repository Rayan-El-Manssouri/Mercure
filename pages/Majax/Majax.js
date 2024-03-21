export class Majax {
    async getToken() {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token non trouvé dans le stockage local');
            }
            const response = await fetch('/api/auth/users', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Échec de la récupération des informations de l\'utilisateur');
            }
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}