import React, { useContext, useState } from "react";
import "./App.scss";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import Settings from "./components/Settings/Settings";
import UserCard from "./components/UserCard/UserCard";
import { DarkModeContext, DarkModeProvider } from "./contexts/DarkModeContext";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const [playerOneScore, setPlayerOneScore] = useState<Array<string>>([]);
  const [playerTwoScore, setPlayerTwoScore] = useState<Array<string>>([]);

  return (
    <div className={`App ${darkMode ? "App--dark" : ""}`}>
      <UserCard name="Player 2" playerTwoScore={playerTwoScore} alternate />
      <ChessBoard
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        setPlayerOneScore={setPlayerOneScore}
        setPlayerTwoScore={setPlayerTwoScore}
      />
      <UserCard name="Player 1" playerOneScore={playerOneScore} />
      <Settings />
    </div>
  );
}

export default App;
