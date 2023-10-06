import React, { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [me, setMe] = useState({
    userName: "",
    userColor: "",
  });

  const handleLogin = (userData) => {
    setMe({
      ...userData,
      clientData: userData,
    });
    setIsLogged(true);
  };

  return (
    <div>
      {isLogged ? (
        <Chat
          me={me}
          setMe={setMe}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
