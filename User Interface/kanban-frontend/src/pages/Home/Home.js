// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SquaresBackground from "../../components/SquaresBackground"; // Importujemy komponent SquaresBackground
import ToastNotification from "../../components/ToastNotification"; // Importujemy nasz toast
import "./home.css"; // Dodajemy odpowiednie style

const Home = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(""); // Stan przechowujący komunikat o sukcesie
    const [showToast, setShowToast] = useState(false); // Stan do kontrolowania widoczności toasta
    const [userName, setUserName] = useState("");
    // Obsługuje wylogowanie użytkownika
    const handleLogout = () => {
        localStorage.removeItem("token"); // Usuń token z lokalStorage
        navigate("/login"); // Przekieruj na stronę logowania
    };

    // Gdy komponent się załaduje, sprawdzamy, czy mamy komunikat sukcesu w localStorage
    useEffect(() => {
        const message = localStorage.getItem("successMessage");
        if (message) {
            setSuccessMessage(message);
            setShowToast(true); // Pokaż toast

            // Usuwamy komunikat z localStorage po wyświetleniu
            localStorage.removeItem("successMessage");

            // Ustawiamy timer do zamknięcia toasta po 5 sekundach
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
    }, []);

    useEffect(() => {
        // Pobierz dane użytkownika z localStorage
        const savedUser = JSON.parse(localStorage.getItem("user"));  // Zmieniamy to, aby odczytać obiekt
        if (savedUser && savedUser.username) {
            setUserName(savedUser.username);  // Ustawiamy tylko username
        } else {
            setUserName("Użytkownik"); // Domyślna nazwa, jeśli brak danych
        }
    }, []);

    return (
        <div className="home-container">
            <SquaresBackground />

            {/* Pasek nawigacyjny */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <h3>KanBan</h3>
                </div>
                <div className="navbar-links">
                    <button className="btn btn-logout" onClick={handleLogout}>
                        Wyloguj
                    </button>
                </div>
            </nav>

            <div className="content">
                <h3>Witaj  {userName} w systemie zarządzania zadaniami!</h3>
                <p>Wybierz zakładkę, aby rozpocząć.</p>
            </div>

            {/* Wyświetlamy ToastNotification, jeśli showToast jest true */}
            {showToast && <ToastNotification message={successMessage} onClose={() => setShowToast(false)} />}
        
            {/* Zakładki */}
            <div className="tabs">
                <button className="tab-btn" onClick={() => navigate("/create-board")}>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2z" />
                        </svg>
                        <span className="tab-text">Stwórz tablicę zadań</span>
                    </div>
                </button>
                <button className="tab-btn" onClick={() => navigate("/admin")}>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                            <path d="M12 2a6 6 0 0 0-6 6v4H5a3 3 0 0 0-3 3v5h20v-5a3 3 0 0 0-3-3h-1V8a6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4v4H8V8a4 4 0 0 1 4-4zm-7 8h14a1 1 0 0 1 1 1v3H4v-3a1 1 0 0 1 1-1zm2 3a2 2 0 1 0 4 0H7zm6 0a2 2 0 1 0 4 0h-2z" />
                        </svg>
                        <span className="tab-text">Administracja</span>
                    </div>
                </button>
                <button className="tab-btn" onClick={() => navigate("/profile")}>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.5 0-7 1.75-7 4v2h14v-2c0-2.25-3.5-4-7-4z" />
                        </svg>
                        <span className="tab-text">Profil użytkownika</span>
                    </div>
                </button>
                <button className="tab-btn" onClick={() => navigate("/reports")}>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                            <path d="M3 3v18h18V3H3zm10 2h5v6h-5V5zm-2 2H5v2h6V7zm0 4H5v2h6v-2zm-6 4h6v2H5v-2zm8 0h5v2h-5v-2zm0-4h5v2h-5v-2z" />
                        </svg>
                        <span className="tab-text">Raporty</span>
                    </div>
                </button>
                <button className="tab-btn" onClick={() => navigate("/boards-list")}>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm4 2h6v2H9V7zm0 4h6v2H9v-2zm0 4h6v2H9v-2z" />
                        </svg>
                        <span className="tab-text">Lista tablic zadań</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Home;
