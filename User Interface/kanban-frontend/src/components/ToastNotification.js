// src/components/ToastNotification.js
import React, { useEffect } from "react";
import "./toastNotification.css"; // Zaimportujemy style dla toastów

const ToastNotification = ({ message, onClose }) => {
    useEffect(() => {
        // Zamykamy toast po 5 sekundach
        const timer = setTimeout(() => {
            onClose(); // Funkcja zamykająca toast
        }, 5000); // Zniknięcie po 5 sekundach

        return () => clearTimeout(timer); // Czyszczenie timera przy odmontowywaniu
    }, [message, onClose]);

    return (
        <div className="toast-notification">
            <p>{message}</p>
        </div>
    );
};

export default ToastNotification;
