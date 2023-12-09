import '../styles/main.scss';
import logo from '../assets/color light 500.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Majax from '../Modules/Majax/Majax';
import { IconBrandGithub, IconBrandGoogle, IconLock, IconUser } from '@tabler/icons-react';
import axios from 'axios';

const Connect = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('dqsds')

    const handleLogin = async () => {
        const url = 'https://majax.vercel.app/';


        try {
            const response = await axios.get(url, {
                maxRedirects: 5,
                timeout: 5000, // temps d'attente en millisecondes (5 secondes dans cet exemple)
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" >
                <div className="logo-container">
                    <div className="logo">
                        <img src={logo} alt='logo Mercure' />
                        <p>Mercure Connect</p>
                    </div>
                </div>

                <div className='form-group-contenaire'>
                    <div className="form-group">
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                        <div className="input-container">
                            <IconUser />
                            <input
                                type="text"
                                id="email"
                                placeholder="Votre Pseudo"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">
                            Mot de passe
                        </label>
                        <div className="input-container">
                            <IconLock />
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Votre mot de passe"
                            />
                        </div>
                    </div>
                    <div className='sous-register'>
                        <hr />
                        <p>OU</p>
                        <div className='brand'>
                            <IconBrandGoogle />
                            <span>
                                Google
                            </span>
                        </div>
                        <div className='brand'>
                            <IconBrandGithub />
                            <span>
                                Github
                            </span>
                        </div>

                    </div>
                </div>
                <div className="tools">
                    <div className="button-container">
                        <button type="submit" onClick={handleLogin}>
                            Se connecter
                        </button>
                    </div>
                    <div className="link-container">
                        <NavLink to="/register">
                            Mot de passe oublié ?
                        </NavLink>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default Connect;