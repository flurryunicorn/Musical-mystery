import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(sessionStorage.getItem("token"));

export function playTrack() {
  const options = {
    context_uri: "spotify:album:3I80KvkjvXefH2xC5mLIpp",
    offset: {
      position: 5,
    },
    position_ms: 30,
  };
  spotifyApi.play(options, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}
