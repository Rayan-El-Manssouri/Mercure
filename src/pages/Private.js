import "../styles/Private.scss";
import HeaderPrivate from "../components/HeaderPrivate";
import NavBarHome from "../components/NavBarHome";
import Majax from "../components/Majax/Majax";
import { useEffect } from "react";


const Private = (isLoggedIn) => {

    useEffect(() => {
        if (isLoggedIn) {
            const majax = new Majax();
            majax.init("http://localhost:8000/");
            isLoggedIn = false;
        }
    }, [isLoggedIn]);
    return (
        
        <div className="body_private">
            <HeaderPrivate />
            <main>
                <nav>
                    <NavBarHome />
                </nav>
                <p>Hey !</p>
            </main>
        </div>
    );
};

export default Private;