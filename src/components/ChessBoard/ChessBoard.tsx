import { useEffect, useState } from "react";
import { Piece, Tile } from "../../types";
import { calculateCheckMate } from "../../utils/calculateCheckMate";
import { handleCastling } from "../../utils/handleCastleing";
import { isKingInCheck } from "../../utils/isKingInCheck";
import { bishopMovement, isValidMove, kingMovement, knightMovement, pawnMovement, rookMovement } from "../../utils/PieceMovementUtils";
import BoardTile from "../BoardTile/BoardTile";
import PromotionModal from "../PromotionModal/PromotionModal";
import "./ChessBoard.scss";

type Props = {
  playerOneScore: Array<string>;
  playerTwoScore: Array<string>;
  setPlayerOneScore: Function;
  setPlayerTwoScore: Function;
  setFlipBoard: Function;
  flipBoard: boolean;
};

function ChessBoard({ playerOneScore, playerTwoScore, setPlayerOneScore, setPlayerTwoScore, flipBoard, setFlipBoard }: Props) {
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

  const [playerTurn, setPlayerTurn] = useState<"white" | "black">("white");
  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [promotionActive, setPromotionActive] = useState<boolean>(false);
  const [canWhiteCastle, setCanWhiteCastle] = useState<Array<boolean>>([true, true]);
  const [canBlackCastle, setCanBlackCastle] = useState<Array<boolean>>([true, true]);

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
            setPlayerTurn((prevValue) => (prevValue === "white" ? "black" : "white"));
          }
        }
      }

      newBoard.forEach((row) => {
        row.forEach((item) => {
          item.moveable = false;
        });
      });

      setBoard(newBoard);
    }
    setDraggedPiece(null);
  };

  const handleDrag = () => {
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
