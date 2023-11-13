import React from 'react';
import Header from '../components/Header';
import logo from '../assets/color light 500.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    
    const handleRefresh = ((redirect) => {
        navigate(redirect)
    })
    
    return (
        <>
            <Header />
            <div className='contenaire'>
                <div>
                    <img src={logo} alt='Icon Mercure Logo' />
                    <p>Bievenue sur Mercure !</p>
                </div>

                <div>
                    <button onClick={() => handleRefresh("dowload")}>Télécharger</button>
                    <button onClick={() => handleRefresh("Accueil")}>Acceder aux site web</button>
                </div>
            </div>
        </>
    );
};

export default Home;