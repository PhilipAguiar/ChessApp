import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import UserCard from "../../components/UserCard/UserCard";
import { db, useAuth } from "../../contexts/FirebaseContext";
import { Comment, Tile } from "../../types";
import { getChatLog, getGame } from "../../utils/databaseUtils/databaseUtils";
import "./ChallengePage.scss";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import ChatBox from "../../components/ChatBox/ChatBox";

function ChallengePage({ flipBoard }: { flipBoard: boolean }) {
  const { currentUser } = useAuth();
  const [board, setBoard] = useState<Array<Array<Tile>>>([
    [
      { piece: { color: "black", name: "rook", hasMoved: false }, moveable: false },
      { piece: { color: "black", name: "knight" }, moveable: false },
      { piece: { color: "black", name: "bishop" }, moveable: false },
      { piece: { color: "black", name: "queen" }, moveable: false },
      { piece: { color: "black", name: "king", inCheck: false, hasMoved: false }, moveable: false },
      { piece: { color: "black", name: "bishop" }, moveable: false },
      { piece: { color: "black", name: "knight" }, moveable: false },
      { piece: { color: "black", name: "rook", hasMoved: false }, moveable: false },
    ],
    [
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
      { piece: { color: "black", name: "pawn" }, moveable: false },
    ],
    [
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
    ],
    [
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
    ],
    [
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
    ],
    [
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
      { piece: null, moveable: false },
    ],
    [
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
      { piece: { color: "white", name: "pawn" }, moveable: false },
    ],
    [
      { piece: { color: "white", name: "rook", hasMoved: false }, moveable: false },
      { piece: { color: "white", name: "knight" }, moveable: false },
      { piece: { color: "white", name: "bishop" }, moveable: false },
      { piece: { color: "white", name: "queen" }, moveable: false },
      { piece: { color: "white", name: "king", inCheck: false, hasMoved: false }, moveable: false },
      { piece: { color: "white", name: "bishop" }, moveable: false },
      { piece: { color: "white", name: "knight" }, moveable: false },
      { piece: { color: "white", name: "rook", hasMoved: false }, moveable: false },
    ],
  ]);
  const [playerOneScore, setPlayerOneScore] = useState<Array<string>>([]);
  const [playerTwoScore, setPlayerTwoScore] = useState<Array<string>>([]);
  const [playerTurn, setPlayerTurn] = useState<"white" | "black">("white");
  const [chatLog, setChatLog] = useState<Array<Comment>>([]);

  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      onSnapshot(doc(db, "ChessGames", currentUser.uid), async () => {
        const game = await getGame(currentUser.uid);

        setBoard([...game.board]);
        setPlayerTurn(game.playerTurn);
        setPlayerOneScore(game.playerOneScore);
        setPlayerTwoScore(game.playerTwoScore);
      });

      onSnapshot(doc(db, "ChatLogs", currentUser.uid), async () => {
        const chatLog = await getChatLog(currentUser.uid);

        setChatLog(chatLog);
      });
    } else {
      navigate("/signup");
    }
  }, []);

  if (!currentUser) {
    return <p>You need to sign in to challenge me!</p>;
  }

  return (
    <div className={`challenge ${darkMode ? "challenge--dark" : ""}`}>
      <div className="challenge__board-wrapper">
        <UserCard name="PHILIP AGUIAR" playerTwoScore={playerTwoScore} alternate />

        <ChessBoard
          playerOneScore={playerOneScore}
          playerTwoScore={playerTwoScore}
          setPlayerOneScore={setPlayerOneScore}
          setPlayerTwoScore={setPlayerTwoScore}
          flipBoard={flipBoard}
          board={board}
          setBoard={setBoard}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
        />
        <UserCard name={currentUser.displayName} playerOneScore={playerOneScore} />

        {playerTurn === "black" && (
          <>
            <h2 className="challenge__text">Waiting for Philip to make a move... </h2>
            <p style={{ textAlign: "center" }}>(I'll make a move when as soon as possible)</p>
          </>
        )}
      </div>
      <ChatBox userID={currentUser.uid} chatLog={chatLog} />
    </div>
  );
}
export default ChallengePage;
