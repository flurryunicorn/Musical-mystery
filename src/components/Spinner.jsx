import React, { useEffect, useState } from "react";

export default function Spinner(props) {
  const [progressStartValue, setprogressStartValue] = useState(0);
  const progressEndValue = 100;

  useEffect(() => {
    console.log("activate");
    if (progressStartValue <= progressEndValue && props.reset) {
      const interval = setInterval(() => {
        setprogressStartValue(progressStartValue + 1);
      }, props.progressValue);
      return () => clearInterval(interval);
    }
    // setprogressStartValue(0);
  }, [progressStartValue, props.progressValue, props.reset]);

  return (
    <div className='spinner-wrapper'>
      <div
        className='circular-progress'
        style={{
          background: `conic-gradient(#7d2ae8 ${
            progressStartValue * 3.6
          }deg, #ededed 0deg)`,
        }}
      >
        <span onClick={props.playTrack} className='progress-value'>
          {props.content}
        </span>
      </div>
    </div>
  );
}