import React, { useState } from "react";
import { Button, Fab, Zoom } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Header from "./Header";
import { buttonHighlight, buttonDefault, floatingBtn } from "../btnStyles";
import { Link } from "react-router-dom";

export default function ModeSelection() {
  const [artist, song, hard, easy] = ["artist", "song", "hard", "easy"];
  const [easyMode, easyModeSelected] = useState(false);
  const [hardMode, hardModeSelected] = useState(false);
  const [artistMode, artistModeSelected] = useState(false);
  const [songMode, songModeSelected] = useState(false);

  function selectedDifficutlyLevel(event) {
    if (event.target.name === easy) {
      easyModeSelected(true);
      hardModeSelected(false);
    } else if (event.target.name === hard) {
      hardModeSelected(true);
      easyModeSelected(false);
    }
  }

  function selectedGuessMode(event) {
    if (event.target.name === song) {
      songModeSelected(true);
      artistModeSelected(false);
    } else if (event.target.name === artist) {
      artistModeSelected(true);
      songModeSelected(false);
    }
  }

  return (
    <div className='mode-selection'>
      <Header />
      <div className='diff-btn-wrapper'>
        <Button
          onClick={selectedDifficutlyLevel}
          className='easy-btn'
          name={easy}
          variant='contained'
          size='large'
          style={easyMode ? buttonHighlight : buttonDefault}
        >
          Easy
        </Button>
        <Button
          onClick={selectedDifficutlyLevel}
          name={hard}
          variant='contained'
          size='large'
          style={hardMode ? buttonHighlight : buttonDefault}
        >
          Hard
        </Button>
      </div>
      <div className='mode-btn-wrapper'>
        <Button
          onClick={selectedGuessMode}
          name={song}
          className='guess-song-btn'
          variant='contained'
          size='large'
          style={songMode ? buttonHighlight : buttonDefault}
        >
          Guess Song
        </Button>
        <Button
          onClick={selectedGuessMode}
          name={artist}
          variant='contained'
          size='large'
          style={artistMode ? buttonHighlight : buttonDefault}
        >
          Guess Artist
        </Button>
      </div>
      <Link className='link-tag' to='/play'>
        <Button variant='contained' size='large' style={buttonHighlight}>
          Play
        </Button>
      </Link>
      <Zoom in={true}>
        <div className='fab'>
          <Fab style={floatingBtn} aria-label='add'>
            <QuestionMarkIcon style={{ color: "white" }} />
          </Fab>
        </div>
      </Zoom>
    </div>
  );
}
