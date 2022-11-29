import React, { useState } from "react";

export default function Spinner(props) {
  return (
    <div className='spinner-wrapper'>
      <div className='circular-progress'>
        <span onClick={props.playTrack} className='progress-value'>
          {props.content}
        </span>
      </div>
    </div>
  );
}
