import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom';
import Private from './pages/Private';
const Connect = React.lazy(() => import('./pages/Connect'));
const Home = React.lazy(() => import('./pages/Home'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Vérifier l'état de connexion côté serveur
        const response = await fetch('http://localhost:8000/checkLogin', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'état de connexion :', error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    // Mettre à jour l'état dans le localStorage de manière synchrone
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Private"
          element={isLoggedIn ?  <Private /> : <Navigate to="/Connect" />}
        />
        {/* Créé une route privée pour la page de Connect si isLoggedIn est false on laisse sinon on le redirgie dans le Private */}
        <Route
          path="/Connect"
          element={isLoggedIn ? <Navigate to="/Private" /> : <Connect />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
