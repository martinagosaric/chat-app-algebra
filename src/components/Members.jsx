import React from "react";

export default function Members({ members, me }) {
  return (
    <div>
      <div className="user">
        {members.length} user{members.length === 1 ? " " : "s"} online
      </div>
      <div>
        {members.map((m) => (
          <Member key={m.id} clientData={m.clientData} isMe={m.id === me.id} />
        ))}
      </div>
    </div>
  );
}

function Member({ clientData, isMe }) {
  const { userName, userColor } = clientData;
  const textStyle = isMe ? { color: "#beaaaa", fontStyle: "italic" } : {};

  return (
    <div className="userslist">
      <div>
        {" "}
        <span
          className="user-circle"
          style={{ backgroundColor: userColor }}
        ></span>
      </div>
      <div style={textStyle}>
        {userName} {isMe ? "(you)" : ""}
      </div>
    </div>
  );
}
