// src/pages/BoardsList/BoardsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardsList.css";

const BoardsList = () => {
    const [boards, setBoards] = useState([]);  // Tablice
    const [loading, setLoading] = useState(true);  // Ładowanie
    const [error, setError] = useState(null);  // Obsługa błędów

    // Pobranie API URL z zmiennej środowiskowej
    const apiUrl = process.env.REACT_APP_API_TASK_URL;

    // Funkcja do pobierania danych o tablicach
    useEffect(() => {
        axios.get(`${apiUrl}/board-list`)  // Użycie zmiennej środowiskowej w URL
            .then((response) => {
                setBoards(response.data);  // Ustawienie danych tablic
                setLoading(false);  // Zakończenie ładowania
            })
            .catch((error) => {
                setError("Błąd podczas ładowania tablic.");
                setLoading(false);
            });
    }, [apiUrl]);

    const handleBoardClick = (boardId) => {
        // Możesz tutaj dodać logikę przekierowania do szczegółów tablicy
    };

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="boards-list-container">
            <h2>Lista Tablic</h2>
            <div className="boards-list">
                {boards.length === 0 ? (
                    <p>Brak dostępnych tablic.</p>
                ) : (
                    boards.map((board) => (
                        <div
                            key={board.id}
                            className="board-item"
                            onClick={() => handleBoardClick(board.id)}
                        >
                            <h3>{board.title}</h3>
                            <p>{board.description}</p>
                            <div className="board-item-color" style={{ backgroundColor: board.color }}></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BoardsList;
