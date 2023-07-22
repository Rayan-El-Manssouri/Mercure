import React from 'react';
import '../styles/Connect.scss'
const Connect = () => {
    return (
        <div className='central_connect_form'>
            <h1>Mercure Connect</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connect;