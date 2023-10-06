import React, { useState } from "react";
import { randomName, randomColor } from "../Names/Username";
import "../App.css";

export default function Login({ onLogin }) {
  const [userName, setUserName] = useState(randomName());
  const [userColor, setUserColor] = useState(randomColor());

  function createName(e) {
    e.preventDefault();
    setUserName(randomName());
    setUserColor(randomColor());
  }

  function handleLogin(e) {
    e.preventDefault();

    const userData = {
      userName: userName,
      userColor: userColor,
    };

    onLogin(userData);
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="data">
          <h3 className="h3">Username:</h3>
          <div className="username">{userName}</div>
          <div>
            <input
              className="user-color"
              type="color"
              value={userColor}
              onChange={(e) => setUserColor(e.target.value)}
            />
          </div>

          <button className="login-btn" type="button" onClick={createName}>
            Randomize
          </button>
          <button className="login-btn" type="submit" onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
