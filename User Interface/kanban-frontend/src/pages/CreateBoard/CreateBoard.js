import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createBoard.css";

const CreateBoard = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Resetujemy błąd przed nowym wysłaniem

        const token = localStorage.getItem("token"); // Pobierz token z localStorage

        if (!token) {
            setError("Token is missing!");
            setLoading(false);
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_TASK_URL;

            // Wysyłanie danych na backend za pomocą axios, z nagłówkiem Authorization
            const response = await axios.post(
                `${apiUrl}/create-board`,
                {
                    title,
                    description,
                    color,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Dodanie tokenu JWT w nagłówkach
                    }
                }
            );

            if (response.status === 201) {
                // Jeśli odpowiedź jest pozytywna, zapisujemy komunikat o sukcesie do localStorage
                localStorage.setItem("successMessage", "Tablica została pomyślnie dodana!");

                // Resetujemy formularz po udanym zapisaniu
                setTitle("");
                setDescription("");
                setColor("#ffffff");

                // Przekierowanie na stronę główną
                navigate("/");
            } else {
                setError("Nie udało się utworzyć tablicy. Spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Błąd przy tworzeniu tablicy: ", error);
            setError(error.response?.data?.message || "Wystąpił problem z połączeniem z serwerem.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-board-container">
            <h2>Stwórz nową tablicę</h2>
            <form className="create-board-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Tytuł tablicy:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Wpisz tytuł tablicy"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Opis:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Opcjonalny opis tablicy"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="color">Kolor tablicy:</label>
                    <input
                        type="color"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>

                <button type="submit" className="create-board-btn" disabled={loading}>
                    {loading ? "Tworzenie..." : "Utwórz tablicę"}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CreateBoard;
