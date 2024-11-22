// src/components/LoadingSpinner.js
import React from "react";
import "./loadingSpinner.css";  // Upewnij się, że masz odpowiedni plik CSS

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
