import { createContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
export const UserContext = createContext();

export function UserContextProvider(props) {
    
    const signUp = (email, pwd) => createUserWithEmailAndPassword
    (auth, email, pwd)
     
    const signIn = (email, pwd) => signInWithEmailAndPassword
    (auth, email, pwd)
    
    const [user, setUser] = useState({
        signUpModal: false,
        signInModal: false,
    });
    
    const [currentUser, setCurrentUser] = useState();
    const [loginData, setLoginData] = useState(true)

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoginData(false)
        });
        return unsubscribe;
    }, []);


    const toggleModals = (modalName) => {
        if (modalName === 'signUpModal') {
            setUser({
                signUpModal: true,
                signInModal: false,
            });
        }
        if (modalName === 'signInModal') {
            setUser({
                signUpModal: false,
                signInModal: true,
            });
        }
        if (modalName === 'close') {
            setUser({
                signUpModal: false,
                signInModal: false,
            });
        }
    };

    return (
        <UserContext.Provider value={{ user, toggleModals, signUp, currentUser, signIn }}>
            {!loginData &&  props.children }
        </UserContext.Provider>
    );
}