import { Piece, Tile } from "../types";
import { bishopMovement, knightMovement, pawnAttacks, rookMovement } from "./PieceMovementUtils";

export const isKingInCheck = (newBoard: Array<Array<Tile>>, kingsColor: string): boolean => {
  let output = false;
  newBoard.forEach((row, y) => {
    row.forEach((tile, x) => {
      const { piece } = tile;

      if (piece && piece.color !== kingsColor) {
        const newPiece: Piece = {
          name: piece.name,
          color: piece.color,
          x: x,
          y: y,
        };

        switch (piece?.name) {
          case "pawn":
            pawnAttacks(newPiece, newBoard).forEach((tile) => {
              if (newBoard[tile.y][tile.x].piece?.name === "king") {
                output = true;
              }
            });

            break;
          case "rook":
            rookMovement(newPiece, newBoard).forEach((tile) => {
              if (newBoard[tile.y][tile.x].piece?.name === "king") {
                output = true;
              }
            });
            break;

          case "bishop":
            bishopMovement(newPiece, newBoard).forEach((tile) => {
              if (newBoard[tile.y][tile.x].piece?.name === "king") {
                output = true;
              }
            });
            break;

          case "knight":
            knightMovement(newPiece, newBoard).forEach((tile) => {
              if (newBoard[tile.y][tile.x].piece?.name === "king") {
                output = true;
              }
            });

            break;

          case "queen":
            bishopMovement(newPiece, newBoard).forEach((tile) => {
              if (newBoard[tile.y][tile.x].piece?.name === "king") {
                output = true;
              }
            });
            rookMovement(newPiece, newBoard).forEach((tile) => {
              if (newBoard[tile.y][tile.x].piece?.name === "king") {
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

export const isTileUnderAttack = (newBoard: Array<Array<Tile>>, tileX: number, tileY: number, playerTurn: string): boolean => {
  let output = false;
  newBoard.forEach((row, y) => {
    row.forEach((tile, x) => {
      const { piece } = tile;

      if (piece && piece.color !== playerTurn) {
        const newPiece: Piece = {
          name: piece.name,
          color: piece.color,
          x: x,
          y: y,
        };

        switch (piece?.name) {
          case "pawn":
            pawnAttacks(newPiece, newBoard).forEach((tile) => {
              if (tile.x === tileX && tile.y === tileY) {
                output = true;
              }
            });

            break;
          case "rook":
            rookMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.x === tileX && tile.y === tileY) {
                output = true;
              }
            });
            break;

          case "bishop":
            bishopMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.x === tileX && tile.y === tileY) {
                output = true;
              }
            });
            break;

          case "knight":
            knightMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.x === tileX && tile.y === tileY) {
                output = true;
              }
            });
            break;

          case "queen":
            bishopMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.x === tileX && tile.y === tileY) {
                output = true;
              }
            });
            rookMovement(newPiece, newBoard).forEach((tile) => {
              if (tile.x === tileX && tile.y === tileY) {
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
