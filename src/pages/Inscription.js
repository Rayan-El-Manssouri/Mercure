import '../styles/main.scss';
import logo from '../assets/color light 500.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Majax from '../Modules/Majax/Majax';

const Inscription = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');


    const handleLogin = async () => {
        const MajaxInit = new Majax()
        const response = await MajaxInit.subscribe(password, pseudo, email)
        if (response === 200) {
            alert("Inscription réussie .")
            window.location.href = "Connect"
        } else {
            alert(response.message)
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
                        <div>
                            <label>Pseudo</label>
                            <input type='text' placeholder='Votre pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
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

export default Inscription;