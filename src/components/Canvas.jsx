import { useRef, useState, useEffect } from "react";
import Timer from "./Timer";
import { useScore } from "../context/ScoreContext";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [waldoData, setWaldoData] = useState(null);
  const [initialTime, setInitialTime] = useState(30);
  const { updateScore } = useScore();
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [waldoFound, setWaldoFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/getWaldo");
        const data = await response.json();
        setWaldoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    console.log(waldoData);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleCanvasClick = (event) => {
      if (!gameStarted) {
        return;
      }
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (waldoData) {
        const {
          x: waldoX,
          y: waldoY,
          width,
          height,
          char_img: img,
        } = waldoData[currentLevel];
        const numericX = parseFloat(waldoX);
        const numericY = parseFloat(waldoY);

        if (
          x >= numericX &&
          x <= numericX + width &&
          y >= numericY &&
          y <= numericY + height
        ) {
          console.log("found waldo!");
          const blob = new Blob([new Uint8Array(img.data)]);
          const url = URL.createObjectURL(blob);
          setIsGameOver(true);
          setWaldoFound(true);
          const foundWaldo = new Image();
          foundWaldo.src = url;
          foundWaldo.onload = function () {
            context.drawImage(foundWaldo, waldoX, waldoY - 7, 50, 60);
            URL.revokeObjectURL(url);
          };
        }
      }
    };
    if (!canvas || !waldoData) {
      return;
    }

    const context = canvas.getContext("2d");

    const blob = new Blob([
      new Uint8Array(waldoData[currentLevel]?.bg_img.data),
    ]);
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.src = url;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [gameStarted, waldoData, currentLevel]);

  const handleFullScreenButtonClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }

      const context = canvas.getContext("2d");
      const blob = new Blob([
        new Uint8Array(waldoData[currentLevel]?.bg_img.data),
      ]);
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.src = url;

      img.onload = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
      };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handlePlayButtonClick = () => {
    setGameStarted(true);
  };
  const handleNextClick = () => {
    if (currentLevel < waldoData.length - 1) {
      setInitialTime(30);
      updateScore((prev) => prev + initialTime);
      setIsGameOver(!isGameOver);
      setCurrentLevel((prevLevel) => prevLevel + 1);
      setWaldoFound(!waldoFound);
    } else {
      // All levels completed
      updateScore((prev) => prev + initialTime);
      alert("You completed all levels!");
      setWaldoFound(!waldoFound);
      setCurrentLevel(0);
      setInitialTime(30);
      setGameStarted(false);
      setIsGameOver(!isGameOver);
    }
    console.log(currentLevel);
  };
  const handleTimeOut = () => {
    alert("Game Over");
    setCurrentLevel(0);
    setInitialTime(30);
    setGameStarted(false);
  };
  return (
    <div className="relative flex flex-col items-center">
      {gameStarted && (
        <Timer
          initialTime={initialTime}
          setInitialTime={setInitialTime}
          onTimeOut={() => handleTimeOut()}
          waldoFound={waldoFound}
        />
      )}

      <canvas
        className="rounded-2xl mx-auto max-w-full"
        ref={canvasRef}
        style={{ width: "728px", height: "536px" }}
        {...props}
      />
      {!gameStarted && (
        <button
          className="absolute  m-4 py-2 px-3 rounded font-medium select-none border text-gray-900 bg-white transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white"
          onClick={handlePlayButtonClick}
        >
          Play
        </button>
      )}
      {isGameOver ? (
        <button
          className="flex items-center py-2 px-3 rounded font-medium select-none border text-gray-900 bg-white transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white"
          onClick={handleNextClick}
        >
          Next ⪼
        </button>
      ) : null}
      <button
        id="fullscreen-button"
        className="absolute top-15 right-15 my-1 w-40 h-40 bg-opacity-5 rounded-full border-0 transition-transform cursor-pointer transform scale-1.125 "
        style={{ backgroundColor: "rgb(185, 182, 182)" }}
        onClick={handleFullScreenButtonClick}
      >
        <svg viewBox="0 0 24 24">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
        <svg viewBox="0 0 24 24">
          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
        </svg>
      </button>
    </div>
  );
};

export default Canvas;
