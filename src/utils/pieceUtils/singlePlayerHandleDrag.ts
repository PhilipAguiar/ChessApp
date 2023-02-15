import { Piece, Tile } from "../../types";
import { bishopMovement, isValidMove, kingMovement, knightMovement, pawnMovement, rookMovement } from "./PieceMovementUtils";

export const singlePlayerHandleDrag = (
  draggedPiece: Piece,
  playerTurn: "white" | "black",
  newBoard: Array<Array<Tile>>,
  canWhiteCastle: Array<boolean>,
  canBlackCastle: Array<boolean>
) => {
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
};
