import { Piece, Tile } from "../types";
import { bishopMovement, knightMovement, pawnAttacks, rookMovement } from "./PieceMovementUtils";

export const isKingInCheck = (newBoard: Array<Array<Tile>>): boolean => {
  let output = false;
  newBoard.forEach((row, y) => {
    row.forEach((tile, x) => {
      const { piece } = tile;

      if (piece) {
        const newPiece: Piece = {
          name: piece.name,
          color: piece.color,
          x: x,
          y: y,
        };

        switch (piece?.name) {
          case "pawn":
            pawnAttacks(newPiece, newBoard).forEach((tile) => {
              if (tile.piece?.name === "king") {
                output = true;
              }
            });

            break;
          case "rook":
            rookMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.piece?.name === "king") {
                output = true;
              }
            });
            break;

          case "bishop":
            bishopMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.piece?.name === "king") {
                output = true;
              }
            });
            break;

          case "knight":
            knightMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.piece?.name === "king") {
                output = true;
              }
            });
            break;

          case "queen":
            bishopMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.piece?.name === "king") {
                output = true;
              }
            });
            rookMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.piece?.name === "king") {
                output = true;
              }
            });

            break;
          default:
            break;
        }
      }
    });
  });

  return output;
};
