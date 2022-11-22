import React, { useState } from "react";
import { Button, Fab, Zoom, Snackbar } from "@mui/material";
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
  const [validOptions, setValidState] = useState(false);

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });

  const { vertical, horizontal, open } = snackbarState;

  const handleClick = (newState) => () => {
    setSnackbarState({ open: true, ...newState });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  function selectedDifficutlyLevel(event) {
    if (event.target.name === easy) {
      easyModeSelected(true);
      hardModeSelected(false);
    } else if (event.target.name === hard) {
      hardModeSelected(true);
      easyModeSelected(false);
    }
    if (artistMode || songMode) {
      setValidState(true);
    } else {
      setValidState(false);
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
    if (easyMode || hardMode) {
      setValidState(true);
    } else {
      setValidState(false);
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
      <Link className='link-tag' to={validOptions && "/play"}>
        <Button
          onClick={handleClick({
            vertical: "top",
            horizontal: "left",
          })}
          variant='contained'
          size='large'
          style={buttonHighlight}
        >
          Play
        </Button>
      </Link>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message='Select the settings first!'
        key={vertical + horizontal}
      />
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
