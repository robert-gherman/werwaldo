import React, { useRef, useEffect } from "react";
import waldo from "../assets/waldo2.jpg";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = props.width;
    canvas.height = props.height;
    const img = new Image();
    img.src = waldo;

    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(x, y);
  };
  return <canvas className="rounded-2xl" ref={canvasRef} {...props} />;
};

export default Canvas;
