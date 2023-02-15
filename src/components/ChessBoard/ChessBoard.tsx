import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/FirebaseContext";
import { Piece, Tile } from "../../types";
import { uploadGame } from "../../utils/databaseUtils/databaseUtils";
import { calculateCheckMate } from "../../utils/pieceUtils/calculateCheckMate";
import { handleCastling } from "../../utils/pieceUtils/handleCastleing";
import { isKingInCheck } from "../../utils/pieceUtils/isKingInCheck";
import { bishopMovement, isValidMove, kingMovement, knightMovement, pawnMovement, rookMovement } from "../../utils/pieceUtils/PieceMovementUtils";
import BoardTile from "../BoardTile/BoardTile";
import PromotionModal from "../PromotionModal/PromotionModal";
import "./ChessBoard.scss";

type Props = {
  board: Array<Array<Tile>>;
  setBoard: Function;
  playerOneScore: Array<string>;
  playerTwoScore: Array<string>;
  setPlayerOneScore: Function;
  setPlayerTwoScore: Function;
  setFlipBoard: Function;
  flipBoard: boolean;
  playerTurn: "black" | "white";
  setPlayerTurn: Function;
  gameID?: string;
  opponentName?: string;
};

function ChessBoard({
  board,
  setBoard,
  playerTurn,
  setPlayerTurn,
  playerOneScore,
  playerTwoScore,
  setPlayerOneScore,
  setPlayerTwoScore,
  flipBoard,
  setFlipBoard,
  gameID,
  opponentName,
}: Props) {
  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [promotionActive, setPromotionActive] = useState<boolean>(false);
  const [canWhiteCastle, setCanWhiteCastle] = useState<Array<boolean>>([true, true]);
  const [canBlackCastle, setCanBlackCastle] = useState<Array<boolean>>([true, true]);
  const { currentUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const updateDraggedPiece = (updateDraggedPiece: Piece) => {
    setDraggedPiece(updateDraggedPiece);
  };

  const handleDrop = async (x: number, y: number) => {
    if (draggedPiece) {
      let newBoard = board.map((a) => {
        return a.map((b) => {
          return { ...b };
        });
      });

      if (!(draggedPiece.x === x && draggedPiece?.y === y)) {
        if (newBoard[y][x].moveable) {
          if (newBoard[y][x].piece?.name) {
            if (playerTurn === "white") {
              let newPlayerOneScore = [...playerOneScore];
              newPlayerOneScore.push(newBoard[y][x].piece!.name);
              setPlayerOneScore(newPlayerOneScore);
            }
            if (playerTurn === "black") {
              let newPlayerTwoScore = [...playerTwoScore];
              newPlayerTwoScore.push(newBoard[y][x].piece!.name);
              setPlayerTwoScore(newPlayerTwoScore);
            }
          }

          if (draggedPiece.name === "rook") {
            if (playerTurn === "white") {
              handleCastling(draggedPiece, newBoard, canWhiteCastle, setCanWhiteCastle);
            }

            if (playerTurn === "black") {
              handleCastling(draggedPiece, newBoard, canBlackCastle, setCanBlackCastle);
            }
          }

          if (draggedPiece.name === "king") {
            if (playerTurn === "white") {
              handleCastling(draggedPiece, newBoard, canWhiteCastle, setCanWhiteCastle, x, y);
            }

            if (playerTurn === "black") {
              handleCastling(draggedPiece, newBoard, canBlackCastle, setCanBlackCastle, x, y);
            }
          }

          newBoard[y][x] = board[draggedPiece!.y!][draggedPiece!.x!];
          newBoard[draggedPiece!.y!][draggedPiece!.x!] = { piece: null, moveable: false };

          if (newBoard[y][x].piece!.name === "pawn" && (y === 7 || y === 0)) {
            setPromotionActive(true);
            // newBoard[y][x].piece!.name = promotionPiece!;
            // setPromotionPiece(undefined);
          } else {
            calculateCheckMate(newBoard, playerTurn);

            if (location.pathname === "/") {
              setPlayerTurn((prevValue: "black" | "white") => (prevValue === "white" ? "black" : "white"));
            }
          }
        }
      }

      newBoard.forEach((row) => {
        row.forEach((item) => {
          item.moveable = false;
        });
      });

      if (location.pathname === "/challenge") {
        console.log("first");
        let opponentColor: "white" | "black" = playerTurn === "white" ? "black" : "white";

        await uploadGame(newBoard, currentUser.uid, currentUser.displayName, opponentColor);

        navigate(0);
      }

      if (location.pathname === "/admin") {
        console.log("first");
        let opponentColor: "white" | "black" = playerTurn === "white" ? "black" : "white";

        await uploadGame(newBoard, gameID!, opponentName!, opponentColor);

        navigate(0);
      }

      setBoard(newBoard);
    }
    setDraggedPiece(null);
  };

  const handleDrag = () => {
    if (location.pathname === "/challenge" && playerTurn === "black") {
      return;
    }

    if (location.pathname === "/admin" && playerTurn === "white") {
      return;
    }
    let newBoard = board.map((a) => {
      return a.map((b) => {
        return { ...b };
      });
    });

    if (draggedPiece && draggedPiece.color === playerTurn) {
      if (draggedPiece.name === "pawn") {
        pawnMovement(draggedPiece, newBoard).forEach((tile) => {
          if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
            newBoard[tile.y][tile.x].moveable = true;
          }
        });
      }

      if (draggedPiece.name === "rook") {
        rookMovement(draggedPiece, newBoard).forEach((tile) => {
          if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
            newBoard[tile.y][tile.x].moveable = true;
          }
        });
      }

      if (draggedPiece.name === "knight") {
        knightMovement(draggedPiece, newBoard).forEach((tile) => {
          if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
            newBoard[tile.y][tile.x].moveable = true;
          }
        });
      }

      if (draggedPiece.name === "bishop") {
        bishopMovement(draggedPiece, newBoard).forEach((tile) => {
          if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
            newBoard[tile.y][tile.x].moveable = true;
          }
        });
      }
      if (draggedPiece.name === "queen") {
        rookMovement(draggedPiece, newBoard).forEach((tile) => {
          if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
            newBoard[tile.y][tile.x].moveable = true;
          }
        });
        bishopMovement(draggedPiece, newBoard).forEach((tile) => {
          if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
            newBoard[tile.y][tile.x].moveable = true;
          }
        });
      }

      if (draggedPiece.name === "king" && isValidMove(draggedPiece, newBoard, draggedPiece.x!, draggedPiece.y!)) {
        if (playerTurn === "white") {
          kingMovement(draggedPiece, newBoard, canWhiteCastle).forEach((tile) => {
            if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
              newBoard[tile.y][tile.x].moveable = true;
            }
          });
        }
        if (playerTurn === "black") {
          kingMovement(draggedPiece, newBoard, canBlackCastle).forEach((tile) => {
            if (isValidMove(draggedPiece, newBoard, tile.x!, tile.y!)) {
              newBoard[tile.y][tile.x].moveable = true;
            }
          });
        }
      }
    }

    setBoard(newBoard);
  };

  useEffect(() => {
    if (draggedPiece) {
      handleDrag();
    }
  }, [draggedPiece]);

  // useEffect(() => {
  //   if (playerTurn === "white") {
  //     setFlipBoard(false);
  //   }

  //   if (playerTurn === "black") {
  //     setFlipBoard(true);
  //   }
  // }, [playerTurn]);

  return (
    <div className={`board ${flipBoard ? "board--flipped" : ""}`}>
      {promotionActive && (
        <PromotionModal
          playerTurn={playerTurn}
          board={board}
          setBoard={setBoard}
          setPlayerTurn={setPlayerTurn}
          setPromotionActive={setPromotionActive}
        />
      )}

      {board &&
        board.map((row, i) => {
          return row.map((tile, j) => {
            if ((i + j) % 2 === 0) {
              return (
                <BoardTile
                  key={`${i}${j}`}
                  coordinates={{ x: j, y: i }}
                  tile={tile}
                  draggedPiece={draggedPiece}
                  updateDraggedPiece={updateDraggedPiece}
                  handleDrop={handleDrop}
                  board={board}
                  playerTurn={playerTurn}
                  alternate
                />
              );
            }
            return (
              <BoardTile
                key={`${i}${j}`}
                coordinates={{ x: j, y: i }}
                tile={tile}
                updateDraggedPiece={updateDraggedPiece}
                handleDrop={handleDrop}
                board={board}
                playerTurn={playerTurn}
                draggedPiece={draggedPiece}
              />
            );
          });
        })}
    </div>
  );
}
export default ChessBoard;
