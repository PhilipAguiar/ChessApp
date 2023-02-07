import { Tile } from "../types";
import { pawnMovement } from "./PieceMovementUtils";

export const isKingInCheck = (playersTurn: string, newBoard: Array<Array<Tile>>): boolean => {
  newBoard.forEach((row, y) => {
    row.forEach((tile, x) => {
      const { piece } = tile;
      if (piece && piece.color === playersTurn) {
        switch (piece?.name) {
          case "pawn":
            console.log(pawnMovement(piece, newBoard));

            break;
          case "rook":
            break;
          default:
            break;
        }
      }
    });
  });

  return false;
};

const isPawnCheck = (playersTurn: string, x: number, y: number, newBoard: Array<Array<Tile>>): boolean => {
  let integer = playersTurn === "white" ? -1 : 1;

  if (playersTurn === "black") {
    if (
      x + integer <= 7 &&
      newBoard[y + integer][x + integer].piece?.name === "king" &&
      newBoard[y + integer][x + integer].piece?.color !== playersTurn
    ) {
      alert("CHECK");
    }

    if (
      x - integer >= 0 &&
      newBoard[y + integer][x - integer].piece?.name === "king" &&
      newBoard[y + integer][x + integer].piece?.color === playersTurn
    ) {
      alert("CHECK");
    }
  }

  if (playersTurn === "white") {
    if (
      x + integer >= 0 &&
      newBoard[y + integer][x + integer].piece?.name === "king" &&
      newBoard[y + integer][x + integer].piece?.color !== playersTurn
    ) {
      alert("PAWN CHECK");
    }

    if (
      x - integer <= 7 &&
      newBoard[y + integer][x - integer].piece?.name === "king" &&
      newBoard[y + integer][x + integer].piece?.color === playersTurn
    ) {
      alert("PAWN CHECK");
    }
  }
  return false;
};

const isRookCheck = (playersTurn: string, x: number, y: number, newBoard: Array<Array<Tile>>): boolean => {
  return false;
};
