import { Piece, Tile } from "../types";
import { isKingInCheck } from "./isKingInCheck";
import { bishopMovement, kingMovement, knightMovement, pawnMovement, rookMovement } from "./PieceMovementUtils";

export const calculateCheckMate = (board: Array<Array<Tile>>, playerTurn: string) => {
  let checkmate = true;
  let opponentColor = playerTurn === "white" ? "black" : "white";
  if (isKingInCheck(board, playerTurn === "white" ? "black" : "white")) {
    board.forEach((row, y) => {
      row.forEach((tile, x) => {
        const newPiece: Piece = {
          ...tile.piece!,
          x: x,
          y: y,
        };

        if (tile.piece && tile.piece.color !== playerTurn) {
          switch (tile.piece.name) {
            case "pawn":
              pawnMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });
                newBoard[test.y][test.x].piece = { name: "pawn", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                  debugger;
                }
              });

              break;

            case "knight": {
              knightMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });
                newBoard[test.y][test.x].piece = { name: "knight", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                  debugger;
                }
              });
              break;
            }

            case "bishop": {
              bishopMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });
                newBoard[test.y][test.x].piece = { name: "bishop", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                  debugger;
                }
              });
              break;
            }
            case "rook": {
              rookMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });

                newBoard[test.y][test.x].piece = { name: "rook", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                  debugger;
                }
              });
              break;
            }
            case "king":
              if (kingMovement(tile.piece!, board).length !== 0) {
                debugger;

                checkmate = false;
              }

              break;

            default:
              break;
          }
        }
      });
    });

    if (isKingInCheck(board, opponentColor)) {
      console.log("CHECK", checkmate);

      if (checkmate) {
        alert("CHECK MATE");
      }
    }
  }
};
