import React, { useState } from 'react';
import '../styles/Connect.scss';
const Connect = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('email', data.email);
        window.location.href = '/Private';
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <div className='body'>
      <div className='central_connect_form'>
        <div className='form'>
            <img src={process.env.PUBLIC_URL + './assets/Connect_Icon.png'} alt='' />
            <h1>Mercure Login</h1>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password" >Mot de passe</label>
            <input type="password" id="password"  onChange={(e) => setPassword(e.target.value)}/>
            <span className='error'>
                {error}
            </span>
            <button type="submit" onClick={handleLogin} >Se connecter</button>
            <div className='central_connect_form__links'>
                <a href="/register">Créer un compte</a>
                <a href="/forgot-password">Mot de passe oublié</a>
            </div>
        </div>
      </div>
    </div>


  );
};

export default Connect;