import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardsList.css";
import LoadingSpinner from "../../components/LoadingSpinner";
const BoardsList = () => {
    const [boards, setBoards] = useState([]);  // Tablice
    const [loading, setLoading] = useState(true);  // Ładowanie
    const [error, setError] = useState(null);  // Obsługa błędów

    // Pobranie API URL z zmiennej środowiskowej
    const apiUrl = process.env.REACT_APP_API_GET_BOARD_URL;
    const token = localStorage.getItem('token');

    // Funkcja do pobierania danych o tablicach
    useEffect(() => {
        if (!token) {
            setError("Brak tokena uwierzytelniającego.");
            setLoading(false);
            return;
        }

        axios.get(`${apiUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Odpowiedź z serwera:", response.data);  // Logowanie odpowiedzi
            // Sprawdzamy, czy odpowiedź zawiera klucz `boards`
            if (response.data && Array.isArray(response.data.boards)) {
                setBoards(response.data.boards);  // Ustawienie tablic
            } else {
                setError("Nieprawidłowe dane z serwera.");
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setError("Błąd podczas ładowania tablic.");
            setLoading(false);
        });
    }, [apiUrl, token]);

    const handleBoardClick = (boardId) => {
        console.log("Kliknięta tablica ID:", boardId);  // Logowanie kliknięcia
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log("Stan boards w renderze:", boards);  // Logowanie stanu `boards` w renderze

    return (
        <div className="boards-list-container">
            <h2>Lista Tablic</h2>
            <div className="boards-list">
                {boards.length === 0 ? (
                    <p>Brak dostępnych tablic.</p>
                ) : (
                    boards.map((board) => (
                        <div
                            key={board._id}  // Używaj _id jako klucza
                            className="board-item"
                            onClick={() => handleBoardClick(board._id)}
                        >
                            <h3>{board.title}</h3>
                            <p>{board.description}</p>
                            <div
                                className="board-item-color"
                                style={{ backgroundColor: board.color }}
                            ></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BoardsList;
