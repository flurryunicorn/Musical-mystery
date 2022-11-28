import React, { useEffect, useState } from "react";
import ScoreHeader from "./ScoreHeader";
import Spinner from "./Spinner";
import Player from "./Player";
import getTracksData from "../api/getTracks";
import ButtonSelect from "./ButtonSelect";

// Select thre random track from an array
function selectThreeTracks(tracks, totalTracks) {
  const randomTracks = [];
  for (let i = 0; i < totalTracks; i++) {
    const index = Math.floor(Math.random() * tracks.length);
    randomTracks.push(tracks[index]);
  }
  return randomTracks;
}

export default function Game() {
  const [allTracks, setAllTracks] = useState({});
  const [threeRandomTracks, setThreeRandomTracks] = useState([]);
  const [isRandomTracksLoaded, setIsRandomTracksLoaded] = useState(false);
  const [correctTrack, setCorrectTrack] = useState({});
  const [correctGuess, setCorrectGuess] = useState(false);
  const [spinnerContent, setSpinnerContent] = useState("GO!");
  const [play, setPlay] = useState('');

  // get the tracks
  useEffect(() => {
    getTracksData().then((tracks) => setAllTracks(tracks));
  }, []);

  // get three random tracks from all the tracks
  useEffect(() => {
    if (allTracks.length > 0) {
      const totalTracks = 3;
      const threeTracks = selectThreeTracks(allTracks, totalTracks);
      console.log(threeTracks);
      setThreeRandomTracks(threeTracks);
      setIsRandomTracksLoaded(true);
    }
  }, [allTracks]);

  // select correct track
  useEffect(() => {
    if (threeRandomTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * threeRandomTracks.length);
      setCorrectTrack(threeRandomTracks[randomIndex]);
      setPlay(true);
    }
  }, [isRandomTracksLoaded]);

  // play the music

  //check win
  function checkGuess(btnContent) {
    if (btnContent === correctTrack.artistName) {
      setCorrectGuess(true);
      setSpinnerContent("😎");
    } else {
      setCorrectGuess(false);
      setSpinnerContent("🤨");
    }
    setPlay(false);
  }

  return (
    <div className='game .game-wrapper'>
      <Player track={correctTrack.trackURI} play={play} />
      <ScoreHeader />
      <Spinner content={spinnerContent} />
      <div className='answer-btn-wrapper'>
        <ButtonSelect
          checkMove={checkGuess}
          content={
            isRandomTracksLoaded ? threeRandomTracks[0].artistName : "Loading"
          }
        />
        <ButtonSelect
          checkMove={checkGuess}
          content={
            isRandomTracksLoaded ? threeRandomTracks[1].artistName : "Loading"
          }
        />
        <ButtonSelect
          checkMove={checkGuess}
          content={
            isRandomTracksLoaded ? threeRandomTracks[2].artistName : "Loading"
          }
        />
      </div>
    </div>
  );
}
