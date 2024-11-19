import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");  
    const [notification, setNotification] = useState(""); // Stan na powiadomienie
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/register`, {
                username,
                password,
                email,
            });

            // Wyświetlenie powiadomienia
            setNotification(response.data.message);

            // Automatyczne ukrycie powiadomienia po 4 sekundach
            setTimeout(() => {
                setNotification("");
                navigate("/login"); // Przekierowanie na stronę logowania
            }, 4000);
        } catch (error) {
            setError("Błąd rejestracji: " + error.response?.data?.error);
            setTimeout(() => {
                setError("");
            }, 5000);
            
        }
    };

    return (
        <div className="register-container">
            {notification && <div className="notification">{notification}</div>}
            <h2>Załóż konto już dziś!</h2>
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
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>Jeśli posiadasz już konto, zaloguj się tutaj klikając w <a href="/login">Logowanie</a>.</p>
        </div>
    );
};

export default Register;
