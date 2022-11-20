import React from "react";
import Header from "./Header";
import Button from "@mui/material/Button";
import { buttonHighlight } from "../btnStyles";

export default function Login(props) {
  return (
    <div className='login-section'>
      <Header />
      <h1 className='login-emoji'>🎵</h1>
      <p className='login-text'>
        Login in to your Spotify account to start playing
      </p>
      <Button
        href={props.endpoint}
        variant='contained'
        size='large'
        style={buttonHighlight}
      >
        Login
      </Button>
    </div>
  );
}
