import { useEffect } from "react";

const Timer = ({ initialTime, setInitialTime, onTimeOut, waldoFound }) => {
  useEffect(() => {
    if (initialTime > 0 && !waldoFound) {
      const timer = setInterval(() => {
        setInitialTime((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else if (initialTime === 0 && !waldoFound) {
      onTimeOut();
    }
  }, [initialTime, setInitialTime, onTimeOut, waldoFound]);

  return <>Time Left: {initialTime} seconds</>;
};

export default Timer;
