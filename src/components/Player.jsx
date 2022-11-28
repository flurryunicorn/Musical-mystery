import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player() {
  const hide = {
    display: "none",
  };
  return (
    <div>
      <SpotifyPlayer
        autoPlay={true}
        play={true}
        token={sessionStorage.getItem("token")}
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      />
    </div>
  );
}
