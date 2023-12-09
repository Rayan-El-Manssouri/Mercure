import axios from "axios";
import React from "react";

class Majax extends React.Component {
    async connect(email, password) {
        try {
            const response = await axios.post('http://majax.vercel.app/login', {
                password: password,
                email: email
            });
            return response
        } catch (error) {
            return error.response.data.error
        }
    }

    async subscribe(password, pseudo, email) {
        const Token = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF2VTRtV1R3Qk1Ba0Vwa2Z6cXBzWApHVkpzaUh1blRBWlkzYlVXbTVwRldqdzBzbU1yem5MOElEeHhoRnNhNkNiYVRuNm82clM4TXptUTh6S052MDRKClJ6NVZac3ArT253R2xoQ2JjdDhDU3RiWmh5anFpdHJ5RmdCelcwR0E5KzJER0luSGx6YTczY3E2OWtQWEsrZWgKVUFWa0tOSlNQVktsRUVwYW1GSFE5ZEd4Z2hMVkRIQWxrdkUwbG5CVHNnK3BNQWk5SzVVYVpLQlJNUmQyWFByeQpIbHRrNysxd3RPdVF0RVNOaHM2T1ZJM0VwZUtzWEQ2OWh3QTB1V3ZlUzlxSDl6RzNoWDJ2alYwWmEzVTYrVzJtCm00ekwzQUYzSnlBTjl1V1NqMnRYYWFwQ1JXdFFpVVE3N0pQWHlDMjRCb2pzMDhmclpKa1pOK2JpbHhOVkloQmgKcndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"

        try {
            const response = await axios.post('http://majax.vercel.app/register', {
                password: password,
                pseudo: pseudo,
                email: email
            }, {
                headers: Token
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async FetchPseudoLoggin(user_email) {
        if (localStorage.getItem('Email') == null) {
            alert("Un probléme et survenue veuiller vous reconnecter.")
            localStorage.removeItem('Token');
            localStorage.removeItem('Email');
            window.location.href = "http://localhost:3000/Connect"
        }

        const response = await axios.post('http://localhost:5000/Fetch_Pseudo', {
            user_email: user_email
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        })

        if (response.data.msg === "Token has expired") {
            console.log("true");
        }

        try {
            return response.data.pseudo
        } catch {
            localStorage.removeItem('Token');
            localStorage.removeItem('Email');
            return 'Une erreur s"est passée...'
        }
    }
    async CheckLogin(email) {

        if (localStorage.getItem('Token') == null) {
            const msg = "Le token a expiré. Veuillez vous reconnecter."
            alert(msg)
            window.location.href = "/Connect"
            return;
        } else {
            console.log("Token valide ...");
        }

        try {
            const response = await axios.post('http://localhost:5000/CheckLogin', {
                user_email: email
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
                }
            });

            return response;
        } catch (error) {
            localStorage.removeItem('Token');
            localStorage.removeItem('Email');
            return 'Le token a expiré. Veuillez vous reconnecter.';
        }
    }

    render() {
        return null;
    }
}

export default Majax;