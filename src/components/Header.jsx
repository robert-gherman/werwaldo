import { useScore } from "../context/ScoreContext";
function Header() {
  const { score } = useScore();
  return (
    <div>
      <div className="header-container flex justify-between items-center border-b-2 border-white p-4">
        <p className="text-white text-xl font-bold lg:ml-16 my-3 lg:my-0">
          Score: {score}
        </p>
        <button className="btn text-white bg-yellowGreen hover:bg-yellowDark lg:mr-16 my-3 lg:my-0">
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
