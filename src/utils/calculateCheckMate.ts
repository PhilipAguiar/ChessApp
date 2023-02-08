import { Piece, Tile } from "../types";
import { isKingInCheck } from "./isKingInCheck";
import { kingMovement } from "./PieceMovementUtils";

export const calculateCheckMate = (board: Array<Array<Tile>>, playerTurn: string) => {
  const checkMate = false;
  let newBoard = board.map((arr) => {
    return arr.slice();
  });

  let kingPiece: Piece;

  newBoard.forEach((row, y) => {
    return row.find((tile, x) => {
      if (tile.piece && tile.piece.name === "king" && tile.piece.color !== playerTurn) {
        kingPiece = { ...tile.piece, x: x, y: y };
      }
    });
  });

  if (isKingInCheck(newBoard)) {
    console.log("CHECK");

    if (kingMovement(kingPiece!, newBoard).length === 0) {
      console.log("CHECK MATE");
    }
  }
};
