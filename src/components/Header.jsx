import { useScore } from "../context/ScoreContext";
import Login from "./Login";
function Header() {
  const { score } = useScore();
  return (
    <div>
      <div className="header-container flex justify-between items-center border-b-2 border-white p-4">
        <p className="text-white text-xl font-bold lg:ml-16 my-3 lg:my-0">
          Score: {score}
        </p>
        <Login />
      </div>
    </div>
  );
}

export default Header;
