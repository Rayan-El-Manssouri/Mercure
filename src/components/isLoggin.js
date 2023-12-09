import axios from 'axios';

const isLoggin = () => {

    const handleLoggin = () => {
        const response = axios.post("http://localhost:5000/CheckLogin", { "email": localStorage.getItem("Email") })
        try {
            console.log(response);

        } catch {

        }
    }

    handleLoggin()

    return (
        <>
        </>
    );
};

export default isLoggin;