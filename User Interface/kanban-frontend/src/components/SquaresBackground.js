// src/components/SquaresBackground.js
import { useEffect } from "react";
import "./squares.css";  // Upewnij się, że masz odpowiedni plik CSS dla kwadratów

const SquaresBackground = () => {
    useEffect(() => {
        const createFallingSquares = () => {
            for (let i = 0; i < 50; i++) {
                let square = document.createElement('div');
                square.classList.add('square');
    
                // Losowa pozycja na osi X
                let randomX = Math.random() * window.innerWidth;
                square.style.left = `${randomX}px`;
    
                // Losowa pozycja początkowa na osi Y
                let randomY = Math.random() * -200 - 50;
                square.style.top = `${randomY}px`;
    
                // Losowy rozmiar kwadratu
                let size = Math.random() * (30 - 10) + 10;
                square.style.width = `${size}px`;
                square.style.height = `${size}px`;
    
                // Losowy czas trwania animacji
                let duration = Math.random() * (10 - 5) + 5;
                square.style.animationDuration = `${duration}s`;
    
                // Losowe opóźnienie animacji
                let delay = Math.random() * 2;
                square.style.animationDelay = `${delay}s`;
    
                // Ustawienie niestandardowej zmiennej dla trajektorii w X (ruch na osi X)
                let randomDirection = Math.random() * 2 - 1;  // Losowa wartość między -1 a 1, aby poruszać się na prawo i lewo
                square.style.setProperty('--random-direction', `${randomDirection * 100}px`);
    
                // Ustawienie zmiennej dla początkowej pozycji Y
                square.style.setProperty('--start-y', `${randomY}px`);
    
                // Dodanie kwadratu do strony
                document.body.appendChild(square);
            }
        };

        createFallingSquares();

        // Sprzątanie elementów po opuszczeniu strony
        return () => {
            const squares = document.querySelectorAll(".square");
            squares.forEach((square) => square.remove());
        };
    }, []);

    return null; // Ten komponent nie renderuje nic widocznego
};

export default SquaresBackground;
