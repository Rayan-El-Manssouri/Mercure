import '../styles/main.scss';
import logo from '../assets/color light 500.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

// Inscription
const Connect = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        const response = await axios.post('http://localhost:5000/login', {
            password: password,
            email: email
        });

        try {
            console.log('Login successful:', response.data.access_token);
            localStorage.setItem('Token', response.data.access_token);
        } catch (error) {
            console.error('Error during login:', error.response.data.message);
        }
    };

    return (
        <div className='form-contenaire'>
            <div className='form'>
                <div className='form-contenaire-header'>
                    <img src={logo} alt='Icon Mercure Logo' />
                    <p>Mercure Connect</p>
                </div>
                <div className='inscription'>
                    <div className='inscription-header'>
                        <div>
                            <label>Email</label>
                            <input type='email' placeholder="Votre email ou nom d'utilisateur" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Mot de passe</label>
                            <input type='password' placeholder='Votre mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='footer'>
                        <NavLink to="/" className="compte-active-a">
                            Vous avez déjà un compte ?
                        </NavLink>

                        <NavLink to="/" className="compte-active-a forget">
                            Mot de passe oublié ?
                        </NavLink>
                    </div>
                </div>
                <div className='button-connect'>
                    <button type='submit' onClick={handleLogin}>Connexion</button>
                </div>
            </div>
        </div>
    );
};

export default Connect;
