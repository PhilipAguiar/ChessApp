import { Piece, Tile } from "../../types";

export const handleCastling = (
  draggedPiece: Piece,
  board: Array<Array<Tile>>,
  canCastle: Array<boolean>,
  setCanCastle: Function,
  x?: number,
  y?: number
) => {
  if (draggedPiece.name === "rook") {
    if (!draggedPiece!.hasMoved) {
      board[draggedPiece!.y!][draggedPiece!.x!].piece!.hasMoved = true;

      if (draggedPiece.color === "white") {
        if (draggedPiece.x === 0 && draggedPiece.y === 7) {
          const newCanWhiteCastle = [...canCastle];
          newCanWhiteCastle[0] = false;
          setCanCastle(newCanWhiteCastle);
        }
        if (draggedPiece.x === 7 && draggedPiece.y === 7) {
          const newCanWhiteCastle = [...canCastle];
          newCanWhiteCastle[1] = false;
          setCanCastle(newCanWhiteCastle);
        }
      }
      if (draggedPiece.color === "black") {
        if (draggedPiece.x === 0 && draggedPiece.y === 0) {
          const newCanBlackCastle = [...canCastle];
          newCanBlackCastle[0] = false;
          setCanCastle(newCanBlackCastle);
        }
        if (draggedPiece.x === 7 && draggedPiece.y === 0) {
          const newCanBlackCastle = [...canCastle];
          newCanBlackCastle[1] = false;
          setCanCastle(newCanBlackCastle);
        }
      }
    }
  }

  if (draggedPiece.name === "king") {
    if (draggedPiece.color === "black") {
      if (x === 2 && y === 0 && canCastle[0]) {
        board[0][3] = board[0][0];
        board[0][0] = { piece: null, moveable: false };
      }

      if (x === 6 && y === 0 && canCastle[1]) {
        board[0][5] = board[0][7];
        board[0][7] = { piece: null, moveable: false };
      }
    }

    if (x === 2 && y === 7 && canCastle[0]) {
      board[7][3] = board[7][0];
      board[7][0] = { piece: null, moveable: false };
    }

    if (x === 6 && y === 7 && canCastle[1]) {
      board[7][5] = board[7][7];
      board[7][7] = { piece: null, moveable: false };
    }

    if (!draggedPiece.hasMoved) {
      board[draggedPiece!.y!][draggedPiece!.x!].piece!.hasMoved = true;

      if (draggedPiece.color === "black") {
        setCanCastle([false, false]);
      }
      if (draggedPiece.color === "white") {
        setCanCastle([false, false]);
      }
    }
  }
};
