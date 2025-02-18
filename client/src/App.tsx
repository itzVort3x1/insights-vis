import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AstronomyPicture from "./components/AstronomyPicture";
import MarsPhotos from "./components/MarsPhotos";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AstronomyPicture />} />
                <Route path="/mars" element={<MarsPhotos />} />
            </Routes>
        </Router>
    );
};

export default App;
