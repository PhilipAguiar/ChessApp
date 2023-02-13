import { Piece, Tile } from "../types";
import { isKingInCheck } from "./isKingInCheck";
import { bishopMovement, kingMovement, knightMovement, pawnMovement, rookMovement } from "./PieceMovementUtils";

export const calculateCheckMate = (board: Array<Array<Tile>>, playerTurn: string) => {
  let checkmate = true;
  let opponentColor = playerTurn === "white" ? "black" : "white";

  if (isKingInCheck(board, opponentColor)) {
    board.forEach((row, y) => {
      row.forEach((tile, x) => {
        const newPiece: Piece = {
          ...tile.piece!,
          x: x,
          y: y,
        };

        if (tile.piece && tile.piece.color === opponentColor) {
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
                }
              });
              break;
            }

            case "queen": {
              rookMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });

                newBoard[test.y][test.x].piece = { name: "rook", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                }
              });
              bishopMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });
                newBoard[test.y][test.x].piece = { name: "bishop", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                }
              });
              break;
            }
            case "king":
              kingMovement(newPiece, board).forEach((test) => {
                const newBoard = board.map((a) => {
                  return a.map((b) => {
                    return { ...b };
                  });
                });

                newBoard[test.y][test.x].piece = { name: "king", color: opponentColor };
                if (!isKingInCheck(newBoard, opponentColor)) {
                  checkmate = false;
                }
              });

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
