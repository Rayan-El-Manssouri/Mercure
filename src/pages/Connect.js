import React from 'react';
import '../styles/Connect.scss'
const Connect = () => {
    return (
        <div className='central_connect_form'>
            <form>
                <img src={process.env.PUBLIC_URL + './assets/Connect_Icon.png'} alt='' />
                <h1>Mercure Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
                <label htmlFor="password" >Mot de passe</label>
                <input type="password" id="password" />
                <span className='error'>* Mot de passe ou nom d'utilisateur incorrect</span>
                <button type="submit" >Se connecter</button>
                <div className='central_connect_form__links'>
                    <a href="/register">Créer un compte</a>
                    <a href="/forgot-password">Mot de passe oublié</a>
                </div>
            </form>

        </div>
    );
};

export default Connect;