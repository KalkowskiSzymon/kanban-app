import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateBoard from "./pages/CreateBoard/CreateBoard"; // Importowanie strony do tworzenia tablicy
import SquaresBackground from "./components/SquaresBackground"; // Importujemy komponent kwadratów
import BoardsList from "./pages/BoardsList/BoardsList"; // Import strony z listą tablic

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
                {/* Strona główna, dostępna tylko po zalogowaniu */}
                <Route 
                    path="/" 
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
                />

                {/* Strony dostępne tylko dla niezalogowanych */}
                <Route 
                    path="/login" 
                    element={<><SquaresBackground /> <Login /> </>} 
                />
                <Route 
                    path="/register" 
                    element={<><SquaresBackground /> <Register /> </>} 
                />

                {/* Strona główna */}
                <Route 
                    path="/home" 
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
                />

                {/* Strona do tworzenia tablicy */}
                <Route 
                    path="/create-board" 
                    element={isAuthenticated ? <><SquaresBackground /> <CreateBoard /> </> : <Navigate to="/login" />} 
                />

                {/* Strona z listą tablic */}
                <Route 
                    path="/boards-list" 
                    element={isAuthenticated ? <><SquaresBackground /> <BoardsList /> </> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
