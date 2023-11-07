import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Leaderboard from "../components/Leaderboard";
const url = import.meta.env.VITE_REACT_URL;
function Home() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetch(`${url}/getLeaderboard`)
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Section className="px-10 mb-6 md:mb-0 md:mr-6" />
        <Leaderboard
          className="max-w-lg w-full md:w-[900px] mx-10 h-[536px] "
          theme="white"
          scoringMetric="score"
          id="username"
          cell1="username"
          cell2="score"
          items={leaderboardData}
        ></Leaderboard>
      </div>
    </div>
  );
}

export default Home;
