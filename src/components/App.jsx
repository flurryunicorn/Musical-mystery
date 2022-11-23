import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import ModeSelection from "../components/ModeSelection";
import Game from "../components/Game";
import { Route, Routes } from "react-router-dom";

function App() {
  const CLIENT_ID = "bc6ae4d28d524aee88b94cdb1af1b1a3";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            !token ? (
              <Login
                endpoint={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              />
            ) : (
              <ModeSelection />
            )
          }
        />
        {token && <Route path='/play' element={<Game />} />}
      </Routes>
    </div>
  );
}

export default App;
