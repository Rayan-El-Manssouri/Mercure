import axios from 'axios';

export class Majax {

    async getToken() {
        return localStorage.getItem('token');
    }

    async getUsers() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/getUsers', null, {
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

    // Token : information de l'utilisateur qui envoie : sender
    async sendMessage(token, received, content, messageTime, email) {
        try {
            const response = await axios.post('/api/Direct/new', {
                received: received,
                content: content,
                messageTime: messageTime,
                email: email
            }, {
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