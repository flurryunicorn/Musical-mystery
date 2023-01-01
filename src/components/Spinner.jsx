import React, { useEffect, useState } from "react";

export default function Spinner(props) {
  const [progressStartValue, setprogressStartValue] = useState(0);
  const progressEndValue = 90;
  const speed = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setprogressStartValue(progressStartValue + 1 * 3.6);
      if (progressStartValue === progressEndValue) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [progressStartValue]);

  return (
    <div className='spinner-wrapper'>
      <div
        className='circular-progress'
        style={{
          background: `conic-gradient(#7d2ae8 ${progressStartValue}deg, #ededed 0deg)`,
        }}
      >
        <span onClick={props.playTrack} className='progress-value'>
          {props.content}
        </span>
      </div>
    </div>
  );
}
