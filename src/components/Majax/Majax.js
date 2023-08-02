/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';

class Majax extends React.Component {
    init(url) {
        axios.get(url)
            .then(function (response) {
                return console.log(response.data);
            }
            )
            .catch(function (error) {
                console.log("Connexion aux serveur flask échouée ! Vérifiez que le serveur flask est bien lancé.");
                console.log(error)
            }
        )
    }

    render() {
        return null;
    }
}

export default Majax;