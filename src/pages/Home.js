import React from 'react';
import HomeForm from './HomeForm';

const Home = () => {
    return (
        <div>
            {/* Div central de message vers un utilisateur */}
            <div className="message">
                <p>Bienvenue sur Mercure!</p>
                <HomeForm />
            </div>
        </div>
    );
};

export default Home;
