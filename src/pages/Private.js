import { NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import PrivateStyle from '../styles/Private.scss';

const Private = () => {
  // const email = localStorage.getItem('email');

  useEffect(() => {
    const styleTag = document.querySelector('style[data-emotion-css]');
    if (styleTag) {
      styleTag.remove();
      const newStyleTag = document.createElement('style');
      newStyleTag.setAttribute('data-emotion-css', 'true');
      newStyleTag.textContent = PrivateStyle; // Injecte le contenu du fichier SCSS dans la balise <style>
      document.head.appendChild(newStyleTag);
    }
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/Connect';
      } else {
        console.error('Erreur lors de la déconnexion côté serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <div style={PrivateStyle} >
      <header>
        <div className='logo'> 
          <span>Mercure</span>
          <img src="assets/logo_light.png" alt="random" />
        </div>
        <ul>
          <li>
            <NavLink to="/Private">
              <img src="./assets/dashboard.png" alt="random" />
              Acceuil
            </NavLink>
          </li>
          <li>
            <NavLink to="/Private">
              <img src="./assets/notification.png" alt="random" />
              Notification
            </NavLink>
          </li>
          <li>
            <NavLink to="/Private">
              <img src="./assets/user_default.png" alt="random" />
              Profil
            </NavLink>
          </li>
          <li>
            <NavLink to="/Private">
              <img src="./assets/search.png" alt="random" />
              Recherche
            </NavLink>
          </li>
          <li>
            <NavLink to="/Private">
              <img src="./assets/message.png" alt="random" />

              Message
            </NavLink>
          </li>
          <li>
            <NavLink to="/Private">
              <img src="./assets/settings.png" alt="random" />
              Paramètre
            </NavLink>
          </li>
          <div className='logout'>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
        </ul>
      </header>
    </div>
  );
};

export default Private;
