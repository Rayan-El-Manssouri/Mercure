import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom';
import Private from './pages/Private';
const Connect = React.lazy(() => import('./pages/Connect'));
const Home = React.lazy(() => import('./pages/Home'));
const Messagerie = React.lazy(() => import('./pages/Messagerie'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
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
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {isLoggedIn ?  <Private /> : <Navigate to="/Connect" />}
            </React.Suspense>
          }
        />
        <Route
          path="/Messagerie"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {isLoggedIn ?  <Messagerie /> : <Navigate to="/Connect" />}
            </React.Suspense>
          }
        />
        <Route
          path="/Connect"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {isLoggedIn ? <Navigate to="/Private" /> : <Connect />}
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
