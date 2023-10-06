import React, { useState } from "react";

export default function Input({ onSendMessage, handleLogout }) {
  const [text, setText] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!text.trim()) {
      alert("Poruka ne može biti prazna.");
      return;
    }
    onSendMessage({ text });
    setText("");
  }

  return (
    <div className="input-container">
      <form className="input-wrapper" onSubmit={onSubmit}>
        <textarea
          className="input"
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn-send" type="submit">
          Send
        </button>
      </form>
      <div className="logout-container">
        <button className="btn-logout" type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
