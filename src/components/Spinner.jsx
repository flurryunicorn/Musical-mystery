import React, { useState } from "react";

export default function Spinner(props) {
  return (
    <div className='spinner-wrapper'>
      <div class='circular-progress'>
        <span class='progress-value'>GO!</span>
      </div>
    </div>
  );
}
