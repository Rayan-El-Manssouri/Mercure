import '../styles/main.scss'
import logo from '../assets/color light 500.png'
import { NavLink } from 'react-router-dom';

const Connect = () => {
    return (
        <div className='form-contenaire'>
            <form>
                <div className='form-contenaire-header'>
                    <img src={logo} alt='Icon Mercure Logo' />
                    <p>Mercure Connect</p>
                </div>
                <div className='inscription'>
                    <div className='inscription-header'>
                        <div>
                            <label>Email / Nom d'utilisateur</label>
                            <input type='text' placeholder="Vôtre email ou nom d'utilisateur " />
                        </div>
                        <div>
                            <label>Mot de passe</label>
                            <input type='password' placeholder='Vôtre mot de passe' />
                        </div>
                    </div>
                    <div className='footer'>
                        <NavLink to="/" className="compte-active-a">
                            Vous avez déjà un compte ?
                        </NavLink>

                        <NavLink to="/" className="compte-active-a forget">
                            Mot de pass oublier ?
                        </NavLink>
                    </div>
                </div>
                <div className='button-connect'>
                    <button>Connexion</button>
                </div>
            </form>
        </div>
    );
};

export default Connect;