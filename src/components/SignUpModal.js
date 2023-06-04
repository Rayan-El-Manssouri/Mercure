import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
const SignUpModal = () => {
    const { user, toggleModals, signUp } = useContext(UserContext);
    const [validation, setValidation] = useState("");
    const inputs = useRef([]);
    const navigate = useNavigate();
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    const formRef = useRef();

    const handleForm = async e => {
        e.preventDefault();
        if (inputs.current[1].value.length < 6 || inputs.current[2].value.length < 6) {
          setValidation('6 caractères minimum pour le mot de passe');
          return;
        }

        if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation('Les mots de passe ne correspondent pas');
            return;
        }

        try{
           const cred =  await signUp(inputs.current[0].value, inputs.current[1].value);
           formRef.current.reset();
           setValidation('Utilisateur bien créé !');
           setValidation('');
           formRef.current.reset();
           toggleModals('close');
           navigate('/private/private-home')
        }catch(err){
            if(err.code === 'auth/invalide-email'){
                setValidation('Email format invalide');
            }
            if(err.code === 'auth/email-already-in-use'){
                setValidation('Email déjà utilisé');
            }
        }
    };

    const closeModals = () => {
        setValidation('');
        formRef.current.reset();
        toggleModals('close');
    };

    return (
        <>
            {user.signUpModal && (
                <div className='position-fixed top-0 vw-100 vh-100'>
                    <div
                        onClick={closeModals}
                        className='w-100 h-100 bg-dark bg-opacity-75'>
                    </div>

                        <div className='position-absolute top-50 start-50 translate-middle' style={{ minWidth: "400px" }}>
                            <div className='modal-dialog'>
                                <div className='modal-content bg-light'>
                                    <div className='modal-header' style={{ padding: 20 }}>
                                        <h5 className='modal-title'>Sign Up</h5>
                                        <button className='btn-close' onClick={closeModals}></button>
                                    </div>
                                    <div className='modal-body'>
                                        <form className='sign-up-form' style={{ padding: 20 }} onSubmit={handleForm} ref={formRef}>
                                            <div className='mb-3'>
                                                <label htmlFor='signUpEmail' className='form-label' >Email address</label>
                                                <input type='email' className='form-control' id='signUpEmail'  ref={addInputs}/>
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor='signUppwd' className='form-label' >Password</label>
                                                <input type='password' className='form-control' id='signUppwd' ref={addInputs} />
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor='signUpRepeatePwd' className='form-label' >repeate password</label>
                                                <input type='password' className='form-control' id='signUpRepeatePwd' ref={addInputs} />
                                            </div>
                                            <p className='text-danger mt-1'>{validation}</p>
                                            <button type='submit' className='btn btn-primary' >Sign Up</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            )}
        </>
    );
};

export default SignUpModal;
