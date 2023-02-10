import React, { useContext, useState } from "react";
import "./App.scss";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import UserCard from "./components/UserCard/UserCard";
import { DarkModeContext, DarkModeProvider } from "./contexts/DarkModeContext";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { darkMode, toggleMode } = useContext(DarkModeContext);
  const { themeSwitcher } = useContext(ThemeContext);

  const [playerOneScore, setPlayerOneScore] = useState<Array<string>>([]);
  const [playerTwoScore, setPlayerTwoScore] = useState<Array<string>>([]);

  return (
    <div className={`App ${darkMode ? "App--dark" : ""}`}>
      <button
        onClick={() => {
          toggleMode();
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <select
        name=""
        id=""
        onChange={(e) => {
          themeSwitcher(e.target.value);
        }}
      >
        <option value="default">Default</option>
        <option value="red">Red</option>
      </select>
      <UserCard name="Player 1" playerOneScore={playerOneScore} />
      <ChessBoard
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        setPlayerOneScore={setPlayerOneScore}
        setPlayerTwoScore={setPlayerTwoScore}
      />
      <UserCard name="Player 2" playerTwoScore={playerTwoScore} alternate />
    </div>
  );
}

export default App;
