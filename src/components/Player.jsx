import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Player(props) {
  const hide = {
    // display: "none",
  };

  const size = {
    fontSize: "100px",
    marginTop: "30px",
  };

  const [playerActive, setPlayerActive] = useState(false);

  function handleCallBack(state) {
    if (state.status === "READY" && !playerActive) {
      props.handleReady(<PlayArrowIcon style={size} />);
      setPlayerActive(true);
    }
  }

  return (
    <div style={hide}>
      <SpotifyPlayer
        callback={handleCallBack}
        play={props.play}
        token={sessionStorage.getItem("token")}
        uris={props.track}
      />
    </div>
  );
}
