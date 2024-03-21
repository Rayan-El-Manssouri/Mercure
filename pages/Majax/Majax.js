import axios from 'axios';

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

    async getUsers() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/getUsers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            return null;
        }
    }

    async getConv(token) {
        try {
            const response = await axios.post('/api/conversation/conv', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching conversations: ' + err.message);
        }
    }
}