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
                <Route path="/Connect" element={<Connect />} />
                <Route path="/Accueil" element={<Private />} />
                <Route path="/Messagerie" element={<Messagerie />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;