import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [time, setTime] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let newTime = time;
    const interval = setInterval(() => {
      if (timerOn && newTime > 0) {
        newTime = newTime - 1;
        setTime(newTime);
      } else if (time === 0) {
        clearInterval(interval);
        setTimerOn(false);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, [time, timerOn]);

  function timer() {
    let newTimerOn = true;
    setTimerOn(newTimerOn);
    setTime(15);
  }

  return (
    <>
      <h2>Pomodoro</h2>

      <div>
        <button>done</button>
        <button onClick={timer} disabled={timerOn}>
          Start 25' timer
        </button>
      </div>

      <p className="timer">
        {`${Math.trunc(time / 60)}:${
          time % 60 < 10 ? `0${time % 60}` : time % 60
        }`}
      </p>
    </>
  );
}
