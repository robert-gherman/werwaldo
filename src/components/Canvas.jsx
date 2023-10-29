import { useRef, useState, useEffect } from "react";
import bgImg from "../assets/waldo3.jpg";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [waldoData, setWaldoData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/getWaldo")
      .then((response) => response.json())
      .then((data) => {
        setWaldoData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = props.width;
    canvas.height = props.height;
    const img = new Image();
    img.src = bgImg;

    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  const handleCanvasClick = async (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (waldoData) {
      console.log(waldoData);
      const {
        x: waldoX,
        y: waldoY,
        width,
        height,
        char_img: img,
      } = waldoData[0];

      const numericX = parseFloat(waldoX);
      const numericY = parseFloat(waldoY);

      if (
        x >= numericX &&
        x <= numericX + width &&
        y >= numericY &&
        y <= numericY + height
      ) {
        const blob = new Blob([new Uint8Array(img.data)]);
        const url = URL.createObjectURL(blob);

        const foundWaldo = new Image();
        foundWaldo.src = url;
        foundWaldo.onload = function () {
          context.drawImage(foundWaldo, waldoX - 5, waldoY - 5, 50, 60);

          URL.revokeObjectURL(url);
        };
      }
    }
  };

  return (
    <canvas
      className="rounded-2xl mx-auto max-w-full"
      ref={canvasRef}
      {...props}
    />
  );
};

export default Canvas;
