import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AstronomyPicture from "./components/AstronomyPicture";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AstronomyPicture />} />
            </Routes>
        </Router>
    );
};

export default App;
