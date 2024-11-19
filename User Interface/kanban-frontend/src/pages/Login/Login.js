import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Zaimportuj useNavigate do przekierowania
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook do przekierowania po udanym logowaniu

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/login`, {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token); // Zapisz token w localStorage po zalogowaniu
            setError("");
            navigate("/"); // Przekieruj na stronę główną po udanym logowaniu
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
