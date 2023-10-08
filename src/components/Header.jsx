import React from "react";

function Header() {
  return (
    <div>
      <div className="header-container flex justify-between align-center border-b-2 border-[white]">
        <p className="text-white text-xl font-bold ml-[16rem] my-[3rem]">
          Score:
        </p>
        <button className="btn text-white bg-yellowGreen hover:bg-yellowDark mr-[16rem] my-[3em] ">
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
