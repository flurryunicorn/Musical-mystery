import SpotifyWebApi from "spotify-web-api-js";

/**
 * @returns {object} - Returns an array object with the artist name, track name and the track uri
 **/
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(sessionStorage.getItem("token"));

export default async function getTracksData() {
  const PLAYLIST_ID = "1eQerI0B5iOe6BI7oICP9R";
  const tracksData = [];
  const playlist = await spotifyApi.getPlaylist(PLAYLIST_ID);
  const tracksArr = playlist.tracks.items;
  tracksArr.forEach((trackObj) => {
    tracksData.push({
      artistName: trackObj.track.artists[0].name,
      trackName: trackObj.track.name,
      trackURI: trackObj.track.uri,
    });
  });
  return tracksData;
}
