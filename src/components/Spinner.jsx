import React, { useState } from "react";

export default function Spinner(props) {
  return (
    <div className='spinner-wrapper'>
      <div className='circular-progress'>
        <span className='progress-value'>GO!</span>
      </div>
    </div>
  );
}
