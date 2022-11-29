import React, { useEffect, useState } from "react";
import ScoreHeader from "./ScoreHeader";
import Spinner from "./Spinner";
import Player from "./Player";
import getTracksData from "../api/getTracks";
import ButtonSelect from "./ButtonSelect";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const LIFE_COUNT = 3;
const START_SCORE = 0;
const DELAY = 1000;
const THREE_TRACKS = 3;

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
  }, [allTracks, roundsPlayed]);

  // handle button click for guess
  function checkGuess(checkString) {
    setRoundsPlayed(roundsPlayed + 1);
  }

  // set content for the spinner
  const size = {
    fontSize: "150px",
  };

  // let content = <PlayArrowIcon style={size} />;
  const [play, setPlay] = useState(false);
  const [content, setContent] = useState(<PlayArrowIcon style={size} />);

  function playTrackOnClick() {
    setPlay(true);
    setContent("GO!");
  }

  return (
    <div className='game .game-wrapper'>
      <Player track={threeRandomTracks[0].trackURI} play={play} />;
      <ScoreHeader score={0} chances={3} />
      <Spinner playTrack={playTrackOnClick} content={content} />
      <div className='answer-btn-wrapper'>
        <ButtonSelect
          checkMove={checkGuess}
          content={tracksLoaded ? threeRandomTracks[0].artistName : "Loading"}
          resetDelay={DELAY}
        />
        <ButtonSelect
          checkMove={checkGuess}
          content={tracksLoaded ? threeRandomTracks[1].artistName : "Loading"}
          resetDelay={DELAY}
        />
        <ButtonSelect
          checkMove={checkGuess}
          content={tracksLoaded ? threeRandomTracks[2].artistName : "Loading"}
          resetDelay={DELAY}
        />
      </div>
    </div>
  );
}
