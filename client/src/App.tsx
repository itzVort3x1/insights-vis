import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AstronomyPicture from "./components/AstronomyPicture.tsx";
import MarsPhotos from "./components/MarsPhotos.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <Link to="/">APOD</Link> | <Link to="/mars">Mars Photos</Link>
            </nav>
            <Routes>
                <Route path="/" element={<AstronomyPicture />} />
                <Route path="/mars" element={<MarsPhotos />} />
            </Routes>
        </Router>
    );
};

export default App;
