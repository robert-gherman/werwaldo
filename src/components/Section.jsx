import React from "react";
import Canvas from "./Canvas";
function Section() {
  return (
    <div className="flex justify-center my-8 mx-10">
      <Canvas width={600} height={500} />
    </div>
  );
}

export default Section;
