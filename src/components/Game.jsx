import React, { useEffect, useState } from "react";
import ScoreHeader from "./ScoreHeader";
import Spinner from "./Spinner";
import Player from "./Player";
import getTracksData from "../api/getTracks";
import ButtonSelect from "./ButtonSelect";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

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
  const progressValue = 100;

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
      // delay here so that the users have to adjust
      setTimeout(() => {
        setThreeRandomTracks(getRandomTracks(allTracks, THREE_TRACKS));
        setTracksLoaded(true);
      }, DELAY);
    }
  }, [allTracks, roundsPlayed]); // gets a new list every round and initially when all tracks are loaded

  // Set correct selection
  const [correctTrack, setCorrectTrack] = useState({});

  useEffect(() => {
    if (threeRandomTracks.length === THREE_TRACKS && allTracks.length > 0) {
      const index = Math.floor(Math.random() * THREE_TRACKS);
      setCorrectTrack(threeRandomTracks[index]);
    }
  }, [threeRandomTracks, allTracks]);

  // handle button click for guess
  const [lifeCount, setLifeCount] = useState(LIFE_COUNT);
  const [scoreCount, setScoreCount] = useState(START_SCORE);
  const [isOver, setIsOver] = useState(false);
  const [trackStarted, setTrackStarted] = useState(false);

  function checkGuess(checkString) {
    setTrackStarted(false);
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

  // set content for the spinner [ callback ]
  const [play, setPlay] = useState(false);
  const [content, setContent] = useState(<CircularProgress />);

  function playerReady(spinnerContent) {
    setContent(spinnerContent);
  }

  // callback func from the spinner component
  function triggerTimer(progressMs) {
    console.log(progressMs);
    if (progressMs === 0) {
      setTrackStarted(true);
    }
  }

  function playTrackOnClick() {
    if (!isOver) {
      setPlay(true);
      setContent(PLAYING_ICON);
    }
  }

  useEffect(() => {
    if (play) {
      let interval = setInterval(() => {
        setTrackStarted(false);
        setLifeCount(lifeCount - 1);
        /* NOTE: Set to 1 because when the button is clicked it will have the previous state althought
        the UI is updated to 0  Need to fix but this will do for now.*/
        if (lifeCount !== 1) {
          setTimeout(() => {
            setContent(PLAYING_ICON);
          }, DELAY);
        }
        setRoundsPlayed(roundsPlayed + 1);
      }, 10000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className='game game-wrapper'>
      <Player
        handleReady={playerReady}
        handleStartTimer={triggerTimer}
        track={correctTrack.trackURI}
        play={play}
      />
      <ScoreHeader score={scoreCount} chances={lifeCount} />
      <Spinner
        playTrack={playTrackOnClick}
        content={content}
        progressValue={progressValue}
        startTimer={trackStarted}
      />
      <div className='answer-btn-wrapper'>
        <Link className='link-deco' to={isOver && "/game-over"}>
          <ButtonSelect
            disable={!play}
            checkMove={checkGuess}
            content={
              tracksLoaded && play ? threeRandomTracks[0]["artistName"] : "..."
            }
            resetDelay={DELAY}
          />
          <ButtonSelect
            disable={!play}
            checkMove={checkGuess}
            content={
              tracksLoaded && play ? threeRandomTracks[1]["artistName"] : "..."
            }
            resetDelay={DELAY}
          />
          <ButtonSelect
            disable={!play}
            checkMove={checkGuess}
            content={
              tracksLoaded && play ? threeRandomTracks[2]["artistName"] : "..."
            }
            resetDelay={DELAY}
          />
        </Link>
      </div>
    </div>
  );
}
