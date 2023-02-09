import { Piece, Tile } from "../types";
import { isKingInCheck } from "./isKingInCheck";
import { bishopMovement, kingMovement, pawnAttacks, pawnMovement } from "./PieceMovementUtils";

export const calculateCheckMate = (board: Array<Array<Tile>>, playerTurn: string) => {
  let checkmate = true;

  let kingPiece: Piece;

  board.forEach((row, y) => {
    return row.find((tile, x) => {
      const newPiece: Piece = {
        ...tile.piece!,
        x: x,
        y: y,
      };

      if (tile.piece && tile.piece.color !== playerTurn) {
        switch (tile.piece.name) {
          case "king":
            kingPiece = { ...tile.piece, x: x, y: y };
            break;

          case "pawn":
            pawnMovement(newPiece, board).forEach((test) => {
              let newBoard = board.map((a) => {
                return a.map((b) => {
                  return { ...b };
                });
              });

              newBoard[test.y][test.x].piece = { name: "pawn", color: playerTurn };
              if (!isKingInCheck(newBoard, playerTurn)) {
                checkmate = false;
              }
            });

            break;

          case "bishop": {
            bishopMovement(newPiece, board).forEach((test) => {
              let newBoard = board.map((a) => {
                return a.map((b) => {
                  return { ...b };
                });
              });

              newBoard[test.y][test.x].piece = { name: "bishop", color: playerTurn };
              if (!isKingInCheck(newBoard, playerTurn)) {
                checkmate = false;
              }
            });
            break;
          }
          default:
            break;
        }
      }
    });
  });

  if (isKingInCheck(board, playerTurn)) {
    console.log("CHECK", checkmate);

    if (kingMovement(kingPiece!, board).length === 0) {
      console.log("CHECK MATE", checkmate);
    }
  }
};
