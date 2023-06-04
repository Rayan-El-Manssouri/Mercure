import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
const Navbar = () => {
    const { toggleModals } = useContext(UserContext);
    const navigate = useNavigate();
    const logOut = async () => {
        try{
            await signOut(auth);
            navigate('/');
        }catch{
            alert("Une erreur c'est passée veuiller vérifier votre connexion internet et réessayer");
        }
    };

    return (
        <div className='navbar navbar-light bg-light px-4'>
            <Link to="/" className='navbar-brand'>
                Authjs
            </Link>
            <div>
                <button className='btn btn-primary' onClick={() => toggleModals("signUpModal")}>
                    Sign Up
                </button>
                <button className='btn btn-primary ms-2' onClick={() => toggleModals("signInModal")}>
                    Sign In
                </button>
                <button className='btn btn-danger ms-2' onClick={logOut}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Navbar;