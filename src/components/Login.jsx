import React from "react";
import Header from "./Header";
import Button from "@mui/material/Button";
import { buttonHighlight } from "../colors";

export default function Login() {
  return (
    <div className='login-section'>
      <Header />
      <h1 className='login-emoji'>🎵</h1>
      <div className='login-text'>
        Login in to your Spotify account to start playing
      </div>
      <Button variant='contained' size='large' style={buttonHighlight}>
        Login
      </Button>
    </div>
  );
}
