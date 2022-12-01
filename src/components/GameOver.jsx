import React from "react";
import { Button } from "@mui/material";
import { buttonHighlight, buttonDefault } from "../btnStyles";
import Confetti from "react-confetti";

const GAME_OVER_TXT = "Game Over";
const HIGH_SCORE_TXT = "High Score:";
const YOUR_SCORE_TXT = "Your Score:";
const NEW_HIGH_SCORE_TXT = "New High Score:";
const CELEBRATION_TXT = "You're a rockstar 😎";
const PLAY_AGAIN_BTN_TXT = "Play Again";
const MENU_BTN_TXT = "Main Menu";

export default function GameOver(props) {
  return (
    <div className='game-over-wrapper'>
      <Confetti recycle={false} width={window.innerWidth} height={window.innerHeight} />
      <h1 className='go-header'>{GAME_OVER_TXT}</h1>
      <div className='go-scores-wrapper'>
        <h2>{YOUR_SCORE_TXT} 0</h2>
        <h2>{HIGH_SCORE_TXT} 0</h2>
      </div>
      <div className='go-btn-wrapper'>
        <Button
          className='go-play-again-btn'
          size='large'
          style={buttonDefault}
        >
          {PLAY_AGAIN_BTN_TXT}
        </Button>
        <Button size='large' style={buttonDefault}>
          {MENU_BTN_TXT}
        </Button>
      </div>
    </div>
  );
}
