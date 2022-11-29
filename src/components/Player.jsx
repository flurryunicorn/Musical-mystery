import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebPlayer from "react-spotify-web-playback";

export default function Player(props) {
  const hide = {
    display: "none",
  };

  return (
    <div>
      <SpotifyPlayer
        play={props.play}
        token={sessionStorage.getItem("token")}
        uris={props.track}
      />
    </div>
  );
}
