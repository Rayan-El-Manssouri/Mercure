import React, { useEffect, useState } from 'react';
import PrivateStyle from '../styles/Private.scss';
import HeaderPrivate from '../components/HeaderPrivate';
import { NavLink } from 'react-router-dom';
const Private = () => {
  const [user, setUser] = useState({});
  const numberViewBoxCompte = 10;
  const numberPublication = 5;
  useEffect(() => {
    fetch('http://localhost:8000/Compte.txt', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const userEmail = localStorage.getItem('email');
        const user = data.find((userData) => userData.email === userEmail);
        setUser(user);
      });
  }, []);

  // Créez le composant ProfilViewBox
  const ProfilViewBox = ({ number }) => {
    return (
      <div className='profil_view_box'>
        <img src='./assets/user_default.png' alt='' />
        <p>Utilisateur Mercure</p>
        <p className='petit'>Vous suit</p>
        <NavLink to='/profil'>Voir le profil</NavLink>
      </div>
    );
  };

  const Publication = ({ numberPublication }) => {
    return (
      <div className='publication_text'>
        <img src='./assets/user_default.png' alt='' />
        <p className='Auteur'>Netflix • 1j</p>
        <p>Sortie de élite 8 !</p>
        <textarea
          name='publication'
          id='publication'
          placeholder='Rajouter un commentaire ...'
        ></textarea>
      </div>
    )
  }

  return (
    <div style={PrivateStyle} >
      <HeaderPrivate />
      <div className='bull_info_profil_vite_fais'>
        <img src='./assets/user_default.png' alt='' />
        <p>{user.pseudo}</p>
        <p>{user.NomMessage}</p>
      </div>
      <div className='sugestion'>
        <h1>Sugestion pour vous<span>Voir tous</span></h1>
        <div className='bull_sugestion'>
          <div className='bull_sugestion_profil'>
            {Array.from({ length: numberViewBoxCompte }, (_, index) => (
              <ProfilViewBox key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className='Publications'>
        
        <h1>Publications</h1>
      </div>
      {/* Ui Message */}
      {Array.from({ length: numberPublication }, (_, index) => (
        <Publication key={index} />
      ))}
    </div>
  );
};

export default Private;
