import React from "react";
import ScoreHeader from "./ScoreHeader";
import Spinner from "./Spinner";
import { choiceBtn } from "../btnStyles";
import { Button } from "@mui/material";
import Player from "./Player";
import getTracksData from "../api/getTracks";

export default function Game() {
  const tracksData = getTracksData();
  return (
    <div className='game .game-wrapper'>
      {/* <Player /> */}
      <ScoreHeader />
      <Spinner />
      <div className='answer-btn-wrapper'>
        <Button
          className='option-1'
          variant='contained'
          size='large'
          style={choiceBtn}
        >
          Selection
        </Button>
        <Button
          className='option-2'
          variant='contained'
          size='large'
          style={choiceBtn}
        >
          Selection
        </Button>
        <Button
          className='option-3'
          variant='contained'
          size='large'
          style={choiceBtn}
        >
          Selection
        </Button>
      </div>
    </div>
  );
}
