// Importe les dépendances nécessaires
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Private from "./pages/Private";
import Messagerie from "./pages/Messagerie";
import Connect from "./pages/Connect";
import React from "react";
const Home = React.lazy(() => import("./pages/Home"));


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Messagerie" element={<Messagerie />} />
                <Route path="/Connect" element={<Connect />} />
                {/* Créé une route privée avec privateRoute dans le /Aceuil */}
                <Route path="/Accueil" element={<Private />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
