import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const updateUser = (name, image) => {
    setUserName(name);
    setProfileImage(image);
  };

  return (
    <ScoreContext.Provider
      value={{ score, updateScore, userName, profileImage, updateUser }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
