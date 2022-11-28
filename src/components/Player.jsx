import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(props) {
  const hide = {
    display: "none",
  };
  return (
    <div>
      <SpotifyPlayer
        autoPlay={true}
        play={props.play}
        token={sessionStorage.getItem("token")}
        uris={props.track}
      />
    </div>
  );
}
