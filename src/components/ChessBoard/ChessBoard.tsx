import { useEffect, useState } from "react";
import { Piece, Tile } from "../../types";
import { pawnMovement, rookMovement } from "../../utils/PieceMovementUtils";
import BoardTile from "../BoardTile/BoardTile";
import "./ChessBoard.scss";

function ChessBoard() {
  const [board, setBoard] = useState<Array<Array<Tile>>>([
    [
      { piece: { color: "black", name: "rook" }, moveable: false },
      { piece: { color: "black", name: "knight" }, moveable: false },
      { piece: { color: "black", name: "bishop" }, moveable: false },
      { piece: { color: "black", name: "queen" }, moveable: false },
      { piece: { color: "black", name: "king" }, moveable: false },
      { piece: { color: "black", name: "bishop" }, moveable: false },
      { piece: { color: "black", name: "knight" }, moveable: false },
      { piece: { color: "black", name: "rook" }, moveable: false },
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
      { piece: { color: "white", name: "rook" }, moveable: false },
      { piece: { color: "white", name: "knight" }, moveable: false },
      { piece: { color: "white", name: "bishop" }, moveable: false },
      { piece: { color: "white", name: "queen" }, moveable: false },
      { piece: { color: "white", name: "king" }, moveable: false },
      { piece: { color: "white", name: "bishop" }, moveable: false },
      { piece: { color: "white", name: "knight" }, moveable: false },
      { piece: { color: "white", name: "rook" }, moveable: false },
    ],
  ]);

  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);

  const updateDraggedPiece = (updateDraggedPiece: Piece) => {
    setDraggedPiece(updateDraggedPiece);
  };

  const handleDrop = (x: number, y: number) => {
    if (draggedPiece) {
      const newBoard = [...board];

      if (!(draggedPiece.coordinates?.x === x && draggedPiece?.coordinates.y === y)) {
        if (newBoard[y][x].moveable) {
          newBoard[y][x] = board[draggedPiece.coordinates!.y][draggedPiece.coordinates!.x];
          newBoard[draggedPiece.coordinates!.y][draggedPiece.coordinates!.x] = { piece: null, moveable: false };
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
    const newBoard = [...board];

    if (draggedPiece && draggedPiece.name === "pawn") {
      pawnMovement(draggedPiece, newBoard);
    }

    if (draggedPiece && draggedPiece.name === "rook") {
      rookMovement(draggedPiece, newBoard);
    }

    setBoard(newBoard);
  };

  useEffect(() => {
    if (draggedPiece) {
      handleDrag();
    }
  }, [draggedPiece]);

  return (
    <div className="board">
      {board &&
        board.map((row, i) => {
          return row.map((tile, j) => {
            if ((i + j) % 2 === 0) {
              return (
                <BoardTile
                  key={`${i}${j}`}
                  coordinates={{ x: j, y: i }}
                  tile={tile}
                  updateDraggedPiece={updateDraggedPiece}
                  handleDrop={handleDrop}
                  alternate
                />
              );
            }
            return (
              <BoardTile key={`${i}${j}`} coordinates={{ x: j, y: i }} tile={tile} updateDraggedPiece={updateDraggedPiece} handleDrop={handleDrop} />
            );
          });
        })}
    </div>
  );
}
export default ChessBoard;
