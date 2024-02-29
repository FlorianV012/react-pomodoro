import { useState, useEffect, useMemo } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function Progress() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [completion, setCompletion] = useState<number>(0);

  const nbTasksDone: number = useMemo(() => {
    return tasks.reduce((acc, task) => acc + (task.done ? 1 : 0), 0);
  }, [tasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      setCompletion(0);
      return;
    }

    const newCompletion = (nbTasksDone * 100) / tasks.length;
    setCompletion(newCompletion);
  }, [tasks]);

  return (
    <div className="progress-container">
      <p>Progress:</p>
      <div className="progress-bar">
        <div
          className="progress-level"
          style={{ width: completion + "%" }}
        ></div>
      </div>
    </div>
  );
}
