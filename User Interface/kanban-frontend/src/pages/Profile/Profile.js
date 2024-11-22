import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [isPasswordChanging, setIsPasswordChanging] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = localStorage.getItem("token"); // Pobieramy token z localStorage
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserData({
                username: user.username,
                email: user.email
            });
        } else {
            navigate("/login");
        }
    }, [navigate]);


    useEffect(() => {
        if (successMessage || errorMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 3000);

            // Cleanup timeout on component unmount or when messages change
            return () => clearTimeout(timeout);
        }
    }, [successMessage, errorMessage]);



    const handleEdit = () => {
        setIsEditing(true);
        setNewUsername(userData.username);
        setNewEmail(userData.email);
    };

    const handleSaveChanges = async () => {
        if (newUsername === "" || newEmail === "") {
            alert("Nazwa użytkownika i e-mail nie mogą być puste");
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_UPDATE_PROFILE_URL;
            const response = await axios.put(
                apiUrl,
                {
                    username: newUsername,
                    email: newEmail
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                setUserData({
                    username: newUsername,
                    email: newEmail
                });
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        username: newUsername,
                        email: newEmail
                    })
                );
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Błąd podczas aktualizacji profilu:", error);
        }
    };

    const handleChangePassword = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        if (newPassword !== confirmPassword) {
            setErrorMessage("Hasła się nie zgadzają!");
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage("Hasło musi mieć co najmniej 6 znaków!");
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_CHANGE_PASSWORD_URL;
            const response = await axios.put(
                apiUrl,
                {
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage("Hasło zostało pomyślnie zmienione!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setIsPasswordChanging(false);
            }
        } catch (error) {
            console.error("Błąd podczas zmiany hasła:", error);
            setErrorMessage("Nie udało się zmienić hasła. Sprawdź swoje dane.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Profil użytkownika</h2>
            </div>

            <div className="profile-details">
                <div className="profile-field">
                    <strong>Nazwa użytkownika: </strong>
                    {isEditing ? (
                        <input
                            type="text"
                            value={newUsername || userData.username}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    ) : (
                        <span>{userData.username}</span>
                    )}
                </div>

                <div className="profile-field">
                    <strong>E-mail: </strong>
                    {isEditing ? (
                        <input
                            type="email"
                            value={newEmail || userData.email}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    ) : (
                        <span>{userData.email}</span>
                    )}
                </div>
            </div>

            <div className="profile-password-change">
                <button onClick={() => setIsPasswordChanging(!isPasswordChanging)}>
                    {isPasswordChanging ? "Anuluj zmianę hasła" : "Zmień hasło"}
                </button>
                {successMessage && (
                            <div className="success-message">{successMessage}</div>
                        )}
                {isPasswordChanging && (
                    <div className="password-change-form">
                        <div className="profile-field">
                            <strong>Aktualne hasło: </strong>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div className="profile-field">
                            <strong>Nowe hasło: </strong>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="profile-field">
                            <strong>Potwierdź nowe hasło: </strong>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}


                        <button onClick={handleChangePassword}>Zmień Hasło</button>
                    </div>
                )}
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <button onClick={handleSaveChanges}>Zapisz zmiany</button>
                ) : (
                    <button onClick={handleEdit}>Edytuj profil</button>
                )}
                <button onClick={() => navigate("/")} className="cancel-btn">
                    Anuluj
                </button>
                
            </div>
        </div>
    );
};

export default Profile;
