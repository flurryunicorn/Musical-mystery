import React, { useState } from "react";
import { Button } from "@mui/material";
import { choiceBtn, buttonHighlight } from "../btnStyles";

export default function ButtonSelect(props) {
  const [isClicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    props.checkMove(props.content);
  }

  return (
    <Button
      onClick={handleClick}
      className='option-btn'
      variant='contained'
      size='large'
      style={isClicked ? buttonHighlight : choiceBtn}
    >
      {props.content}
    </Button>
  );
}
