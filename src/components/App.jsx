import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import ModeSelection from "../components/ModeSelection";
import Game from "../components/Game";
import { Route, Routes } from "react-router-dom";
import GameOver from "./GameOver";

function App() {
  const CLIENT_ID = "bc6ae4d28d524aee88b94cdb1af1b1a3";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "streaming",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-recently-played",
  ].join("%20");

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
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
                endpoint={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}
              />
            ) : (
              <ModeSelection />
            )
          }
        />
        {token && <Route path='/play' element={<Game />} />}
        <Route path='/game-over' element={<GameOver />} />
      </Routes>
    </div>
  );
}

export default App;
