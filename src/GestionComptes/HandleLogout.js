const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:8000/logout', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            window.location.href = '/Connect';
        } else {
            console.error('Erreur lors de la déconnexion côté serveur');
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};

export default handleLogout;