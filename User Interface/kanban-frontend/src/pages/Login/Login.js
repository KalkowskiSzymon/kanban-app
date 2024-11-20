import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Zaimportuj useNavigate do przekierowania
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook do przekierowania po udanym logowaniu

    // Funkcja do dekodowania tokenu JWT
    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(window.atob(base64));
        return decoded;
    };

    useEffect(() => {
        // Sprawdzenie, czy token już istnieje w localStorage
        const token = localStorage.getItem("token");
        if (token) {
            // Jeżeli token istnieje, automatycznie przekierowujemy na stronę główną
            navigate("/"); 
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/login`, {
                username,
                password,
            });
            const token = response.data.token;

            // Zapisanie tokenu w localStorage
            localStorage.setItem("token", token);

            // Dekodowanie tokenu i zapisanie danych użytkownika
            const decodedToken = decodeToken(token);
            const user = {
                userId: decodedToken.user_id,
                username: decodedToken.username,
                role: decodedToken.role,
            };
            localStorage.setItem("user", JSON.stringify(user));  // Zapisanie danych użytkownika w localStorage

            setError("");
            navigate("/"); // Przekierowanie na stronę główną po zalogowaniu
        } catch (error) {
            setError("Nieprawidłowe dane logowania. Spróbuj ponownie.");
        }
    };

    return (
        <div className="login-container">
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>Jeśli nie posiadasz konta, zarejestruj się tutaj klikając w <a href="/register">Rejestracja</a>.</p>
        </div>
    );
};

export default Login;
