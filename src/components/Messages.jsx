import React, { useRef, useEffect } from "react";
import "../App.css";

export default function Messages({ messages, me }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <div>
      <ul>
        {messages.map((m) => (
          <Message key={m.id} message={m} me={me} />
        ))}
        <div ref={bottomRef}></div>
      </ul>
    </div>
  );
}

function Message({ message, me }) {
  const { member, data } = message;
  const { userName, userColor } = member.clientData;
  const messageFromMe = member.id === me.id;
  const className = messageFromMe ? "message-right" : "message-left";
  const border = messageFromMe ? "border-r" : "border-l";

  return (
    <div className={className}>
      <li style={{ maxWidth: "48%" }}>
        <div className="message-username">{userName}: </div>
        <div
          className={`message-text ${border}`}
          style={{ borderColor: userColor }}
        >
          {data}
        </div>
      </li>
    </div>
  );
}
