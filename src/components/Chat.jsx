import Input from "./Input";
import Messages from "./Messages";
import Members from "./Members";
import React, { useEffect, useRef, useState } from "react";

let drone = null;

export default function Chat({ me, setMe, setIsLogged }) {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  const messagesRef = useRef();
  messagesRef.current = messages;
  const membersRef = useRef();
  membersRef.current = members;
  const meRef = useRef();
  meRef.current = me;

  function connectToScaledrone() {
    drone = new window.Scaledrone("Kfqeudqjg251yEFA", {
      data: meRef.current,
    });

    drone.on("open", () => {
      const member = { ...meRef.current, id: drone.clientId };
      setMe(member);
    });

    const room = drone.subscribe("observable-room");

    room.on("message", (newMessage) => {
      setMessages([...messagesRef.current, newMessage]);
    });

    room.on("members", (members) => {
      setMembers(members);
    });

    room.on("member_join", (member) => {
      setMembers([...membersRef.current, member]);
    });

    room.on("member_leave", ({ id }) => {
      setMembers((prevMembers) => prevMembers.filter((m) => m.id !== id));
    });
  }

  useEffect(() => {
    if (!drone) {
      connectToScaledrone();
    }
  }, [drone, setMe]);

  function handleSendMessage(newMessage) {
    if (!newMessage.text.trim()) {
      return;
    }

    const { text } = newMessage;
    const { userName, userColor } = me;

    const messageData = {
      room: "observable-room",
      message: text,
      clientData: {
        username: userName,
        usercolor: userColor,
      },
    };

    drone.publish(messageData);
  }

  function handleLogout() {
    console.log("Logout in progress");
    if (drone) {
      drone.unsubscribe("observable-room");
    }
    drone = null;
    setMe(null);
    setIsLogged(false);
  }

  return (
    <div className="main-wrap">
      <div>
        <h1 className="header">
          Welcome, {me.userName}{" "}
          <span
            style={{
              backgroundColor: me.userColor,
              borderRadius: "50%",
              display: "inline-block",
              width: "10px",
              height: "10px",
            }}
          ></span>
        </h1>
      </div>
      <div className="chat-container">
        <div className="sidebar-left">
          <Messages messages={messages} me={me} />
        </div>

        <div className="sidebar-right">
          <Members members={members} me={me} />
        </div>
      </div>
      <div>
        <Input onSendMessage={handleSendMessage} handleLogout={handleLogout} />
      </div>
    </div>
  );
}
