import React, { useContext, useState } from "react";
import "./App.scss";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import Settings from "./components/Settings/Settings";
import UserCard from "./components/UserCard/UserCard";
import { DarkModeContext } from "./contexts/DarkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const [playerOneScore, setPlayerOneScore] = useState<Array<string>>([]);
  const [playerTwoScore, setPlayerTwoScore] = useState<Array<string>>([]);

  const [flipBoard, setFlipBoard] = useState<boolean>(false);

  return (
    <div className={`App ${darkMode ? "App--dark" : ""}`}>
      <UserCard name="Player 2" playerTwoScore={playerTwoScore} alternate />
      <ChessBoard
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        setPlayerOneScore={setPlayerOneScore}
        setPlayerTwoScore={setPlayerTwoScore}
        flipBoard={flipBoard}
        setFlipBoard={setFlipBoard}
      />
      <UserCard name="Player 1" playerOneScore={playerOneScore} />
      <Settings setFlipBoard={setFlipBoard} />
    </div>
  );
}

export default App;
