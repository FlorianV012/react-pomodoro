import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { taskIsDone, taskInProgress } from "../features/tasks";
import { ITask } from "../interfaces";

const timerDuration = 15;

export default function Pomodoro() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [time, setTime] = useState<number>(1500);
  const [timerOn, setTimerOn] = useState<boolean>(false);

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

    return () => clearInterval(interval);
  }, [time, timerOn]);

  function timer() {
    let newTimerOn = true;
    setTimerOn(newTimerOn);
    setTime(timerDuration);
  }

  useEffect(() => {
    let newTaskInProgress: ITask | null = null;

    tasks.forEach((task) => {
      if (task.inProgress) {
        newTaskInProgress = task;
      }
      setCurrentTask(newTaskInProgress);
    });
  }, [tasks]);

  function setDone(currentTask: ITask) {
    dispatch(taskIsDone(currentTask));
    dispatch(taskInProgress(currentTask));

    let newTimerOn = false;
    setTimerOn(newTimerOn);
    setTime(timerDuration);
  }

  return (
    <>
      <h2>Pomodoro</h2>

      <p>
        {currentTask === null
          ? "Not currently doing anything"
          : currentTask.content}
      </p>

      <div>
        <button
          className={currentTask === null ? "secondary" : "info"}
          disabled={currentTask === null ? true : false}
          onClick={() => setDone(currentTask!)}
        >
          I'm done{" "}
          <span role="img" aria-label="emoji rocket">
            🚀
          </span>
        </button>
        <button
          className="alert"
          onClick={timer}
          disabled={timerOn || currentTask === null}
        >
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
