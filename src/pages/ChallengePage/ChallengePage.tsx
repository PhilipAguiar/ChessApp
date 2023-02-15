import { useEffect, useState } from "react";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { useAuth } from "../../contexts/FirebaseContext";
import { Tile } from "../../types";
import { getGame, getTurn, uploadGame } from "../../utils/databaseUtils/databaseUtils";
import "./ChallengePage.scss";
function ChallengePage() {
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
  const [flipBoard, setFlipBoard] = useState<boolean>(false);

  useEffect(() => {
    console.log(currentUser.uid);

    if (currentUser && currentUser.uid) {
      const fetchGame = async () => {
        setBoard(await getGame(currentUser.uid));
        setPlayerTurn(await getTurn(currentUser.uid));
      };
      fetchGame();
    }
  }, []);

  if (!currentUser) {
    return <p>You need to sign in to challenge me!</p>;
  }

  return (
    <div className="challenge">
      <ChessBoard
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        setPlayerOneScore={setPlayerOneScore}
        setPlayerTwoScore={setPlayerTwoScore}
        flipBoard={flipBoard}
        setFlipBoard={setFlipBoard}
        board={board}
        setBoard={setBoard}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
      />
      {/* <button
        onClick={() => {
          uploadGame(board, currentUser.uid, currentUser.displayName, playerTurn);
        }}
      >
        Confirm Move
      </button> */}

      {playerTurn === "black" && <h2>Waiting for Philip to make a move</h2>}
    </div>
  );
}
export default ChallengePage;
