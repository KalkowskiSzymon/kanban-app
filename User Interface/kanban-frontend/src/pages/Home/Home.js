// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Usuń token z lokalStorage
        navigate("/login"); // Przekieruj na stronę logowania
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Witamy na stronie głównej!</h1>
                <p>Twoje centrum zarządzania aplikacją.</p>
            </header>
            <div className="home-actions">
                <button onClick={handleLogout} className="logout-button">
                    Wyloguj się
                </button>
            </div>
        </div>
    );
};

export default Home;
