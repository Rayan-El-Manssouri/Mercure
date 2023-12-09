import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connect from './pages/Connect';
import Panel from './pages/Users/Panel';
import Messagerie from './pages/Users/Messagerie';
import Inscription from './pages/Inscription';
import Loader from './components/toast/Loader';
const Home = lazy(() => import('./pages/Home'));

const App = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Connect" element={<Connect />} />
                    <Route path="/Accueil" element={<Panel />} />
                    <Route path="/Messagerie" element={<Messagerie />} />
                    <Route path="/Inscription" element={<Inscription />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;