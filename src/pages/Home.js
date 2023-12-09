import Header from '../components/Header';
import logo from '../assets/color light 500.png'
import { useNavigate } from 'react-router-dom';
import Majax from '../Modules/Majax/Majax';
import '../styles/main.scss'
const Home = () => {

    const navigate = useNavigate()

    const handleRefresh = ((redirect) => {
        navigate(redirect)
    })

    // const MajaxInit = new Majax()
    // MajaxInit.CheckLogin(localStorage.getItem("Email"))

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