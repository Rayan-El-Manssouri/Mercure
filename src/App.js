import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
const Connect = lazy(() => import('./pages/Connect'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>La page se charge ...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Connect" element={<Connect />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;