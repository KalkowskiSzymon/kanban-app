// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SquaresBackground from "./components/SquaresBackground"; // Importujemy komponent kwadratów

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Sprawdzamy stan logowania użytkownika na podstawie tokenu w localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true); // Użytkownik jest zalogowany
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Zabezpieczenie przed dostępem do stron, gdy użytkownik nie jest zalogowany */}
                <Route 
                    path="/" 
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
                /> {/* Strona główna, jeśli zalogowany */}

                {/* Strony dostępne tylko dla niezalogowanych */}
                <Route 
                    path="/login" 
                    element={<><SquaresBackground /> <Login /> </>} 
                /> {/* Strona logowania z animacją */}
                <Route 
                    path="/register" 
                    element={<><SquaresBackground /> <Register /> </>} 
                /> {/* Strona rejestracji z animacją */}

                {/* Strona główna, dostępna tylko po zalogowaniu */}
                <Route 
                    path="/home" 
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;