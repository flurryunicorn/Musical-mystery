import React, { useEffect, useState } from "react";
import ScoreHeader from "./ScoreHeader";
import Spinner from "./Spinner";
import Player from "./Player";
import getTracksData from "../api/getTracks";
import ButtonSelect from "./ButtonSelect";

import CircularProgress from "@mui/material/CircularProgress";

const LIFE_COUNT = 3;
const START_SCORE = 0;
const DELAY = 2000;
const THREE_TRACKS = 3;
const PLAYING_ICON = "🎧";
const CORRECT_GUESS_ICON = "😎";
const INCORRECT_GUESS_ICON = "🙄";

// Select thre random track from an array
function getRandomTracks(tracks, totalTracksReq) {
  const randomTracks = [];
  for (let i = 0; i < totalTracksReq; i++) {
    const index = Math.floor(Math.random() * tracks.length);
    randomTracks.push(tracks[index]);
  }
  return randomTracks;
}

export default function Game(props) {
  const [allTracks, setAllTracks] = useState({});

  // fetch all tracks from a playlist
  useEffect(() => {
    getTracksData().then((tracks) => setAllTracks(tracks));
  }, []);

  // get three random tracks
  const [threeRandomTracks, setThreeRandomTracks] = useState([{}]);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  useEffect(() => {
    if (allTracks.length > 0) {
      setTimeout(() => {
        setThreeRandomTracks(getRandomTracks(allTracks, THREE_TRACKS));
        setTracksLoaded(true);
      }, DELAY);
    }
  }, [allTracks, roundsPlayed]); // gets a new list every round

  // handle button click for guess
  function checkGuess(checkString) {
    if (checkString === threeRandomTracks[0].artistName) {
      setContent(CORRECT_GUESS_ICON);
    } else {
      setContent(INCORRECT_GUESS_ICON);
    }
    setTimeout(() => {
      setContent(PLAYING_ICON);
    }, DELAY);
    setRoundsPlayed(roundsPlayed + 1);
  }

  // set content for the spinner
  const [play, setPlay] = useState(false);
  // const [content, setContent] = useState(<PlayArrowIcon style={size} />);
  const [content, setContent] = useState(<CircularProgress />);

  function playerReady(spinnerContent) {
    setContent(spinnerContent);
  }

  function playTrackOnClick() {
    setPlay(true);
    setContent(PLAYING_ICON);
  }

  return (
    <div className='game .game-wrapper'>
      <Player
        handleReady={playerReady}
        track={threeRandomTracks[0].trackURI}
        play={play}
      />
      ;
      <ScoreHeader score={0} chances={3} />
      <Spinner playTrack={playTrackOnClick} content={content} />
      <div className='answer-btn-wrapper'>
        <ButtonSelect
          disable={!play}
          checkMove={checkGuess}
          content={
            tracksLoaded && play ? threeRandomTracks[0].artistName : "Loading"
          }
          resetDelay={DELAY}
        />
        <ButtonSelect
          disable={!play}
          checkMove={checkGuess}
          content={
            tracksLoaded && play ? threeRandomTracks[1].artistName : "Loading"
          }
          resetDelay={DELAY}
        />
        <ButtonSelect
          disable={!play}
          checkMove={checkGuess}
          content={
            tracksLoaded && play ? threeRandomTracks[2].artistName : "Loading"
          }
          resetDelay={DELAY}
        />
      </div>
    </div>
  );
}
