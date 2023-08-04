import Majax from "../components/Majax/Majax";
const handleLogout = async () => {
    const majax = new Majax();
    await majax.init("http://localhost:8000/ConnecteServer", "apikey");
    majax.logout("http://localhost:8000/logout", "/Connect")
};

export default handleLogout;