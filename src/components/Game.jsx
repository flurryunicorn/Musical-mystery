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
const PLAYING_ICON = "🔊";
const CORRECT_GUESS_ICON = "😎";
const INCORRECT_GUESS_ICON = "😐";
const SCORE_INCREMENT = 10;
const GAME_OVER = "😞";

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
  }, [allTracks, roundsPlayed]); // gets a new list every round and initially when all tracks are loaded

  // Set correct selection
  const [correctTrack, setCorrectTrack] = useState({});

  useEffect(() => {
    if (threeRandomTracks.length === THREE_TRACKS) {
      const index = Math.floor(Math.random() * THREE_TRACKS);
      console.log(index);
      setCorrectTrack(threeRandomTracks[index]);
    }
  }, [threeRandomTracks]);

  // handle button click for guess
  const [lifeCount, setLifeCount] = useState(LIFE_COUNT);
  const [scoreCount, setScoreCount] = useState(START_SCORE);
  const [isOver, setIsOver] = useState(false);

  function checkGuess(checkString) {
    if (checkString === correctTrack.artistName) {
      setContent(CORRECT_GUESS_ICON);
      setScoreCount(scoreCount + SCORE_INCREMENT);
    } else {
      setContent(INCORRECT_GUESS_ICON);
      setLifeCount(lifeCount - 1);
    }

    /* NOTE: Set to 1 because when the button is clicked it will have the previous state althought
    the UI is updated to 0  Need to fix but this will do for now.*/
    if (lifeCount !== 1) {
      console.log(lifeCount);
      setTimeout(() => {
        setContent(PLAYING_ICON);
      }, DELAY);
    }

    setRoundsPlayed(roundsPlayed + 1);
  }

  // check game over
  useEffect(() => {
    if (lifeCount === 0) {
      setIsOver(true);
      setPlay(false);
      setContent(GAME_OVER);
      // run the other component
    }
  }, [lifeCount]);

  // set content for the spinner
  const [play, setPlay] = useState(false);
  const [content, setContent] = useState(<CircularProgress />);

  function playerReady(spinnerContent) {
    setContent(spinnerContent);
  }

  function playTrackOnClick() {
    if (!isOver) {
      setPlay(true);
      setContent(PLAYING_ICON);
    }
  }

  return (
    <div className='game .game-wrapper'>
      <Player
        handleReady={playerReady}
        track={correctTrack.trackURI}
        play={play}
      />
      ;
      <ScoreHeader score={scoreCount} chances={lifeCount} />
      <Spinner playTrack={playTrackOnClick} content={content} />
      <div className='answer-btn-wrapper'>
        <ButtonSelect
          disable={!play}
          checkMove={checkGuess}
          content={
            tracksLoaded && play ? threeRandomTracks[0].artistName : "..."
          }
          resetDelay={DELAY}
        />
        <ButtonSelect
          disable={!play}
          checkMove={checkGuess}
          content={
            tracksLoaded && play ? threeRandomTracks[1].artistName : "..."
          }
          resetDelay={DELAY}
        />
        <ButtonSelect
          disable={!play}
          checkMove={checkGuess}
          content={
            tracksLoaded && play ? threeRandomTracks[2].artistName : "..."
          }
          resetDelay={DELAY}
        />
      </div>
    </div>
  );
}
