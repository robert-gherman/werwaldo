import Header from "../components/Header";
import Section from "../components/Section";
import Leaderboard from "../components/Leaderboard";

function Home() {
  const leaderboardData = [
    {
      name: "User1",
      username: "@user1",
      github_username: "user1",
      score: 100,
      twitter_followers: 500,
      github_stars: 200,
    },
    {
      name: "User2",
      username: "@user2",
      github_username: "user2",
      score: 80,
      twitter_followers: 300,
      github_stars: 150,
    },
    {
      name: "User3",
      username: "@user3",
      github_username: "user3",
      score: 200,
      twitter_followers: 500,
      github_stars: 200,
    },
    {
      name: "User4",
      username: "@user4",
      github_username: "user1",
      score: 100,
      twitter_followers: 500,
      github_stars: 200,
    },
  ];

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Section className="px-10 mb-6 md:mb-0 md:mr-6" />
        <Leaderboard
          className="max-w-lg w-full md:w-[900px] mx-10 h-[536px] "
          theme="white"
          scoringMetric="score"
          id="name"
          cell1="username"
          cell2="score"
          items={leaderboardData}
        ></Leaderboard>
      </div>
    </div>
  );
}

export default Home;
