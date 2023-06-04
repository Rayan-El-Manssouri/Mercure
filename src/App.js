import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import SignInModal from './components/SignInModal';
import Private from './Private/Private';
import PrivateHome from './Private/PrivateHome/PrivateHome';
const Home = lazy(() => import('./pages/Home'));
const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>La page se charge ...</div>}>
                <SignUpModal />
                <SignInModal />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/private" element={<Private />}>
                        <Route path='/private/private-home' element={<PrivateHome />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;