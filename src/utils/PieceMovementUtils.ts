import { Piece, Tile } from "../types";

export const pawnMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>) => {
  //var to handle direction of pawns
  let integer = draggedPiece.color === "white" ? -1 : 1;

  //check if pawn is at starting spot for ability to move two squares

  if (draggedPiece.color === "white" && draggedPiece.coordinates!.y === 6) {
    if (!newBoard[draggedPiece.coordinates!.y + integer * 2][draggedPiece.coordinates!.x].piece) {
      newBoard[draggedPiece.coordinates!.y + integer * 2][draggedPiece.coordinates!.x].moveable = true;
    }
  }

  if (draggedPiece.color === "black" && draggedPiece.coordinates!.y === 1) {
    if (!newBoard[draggedPiece.coordinates!.y + integer * 2][draggedPiece.coordinates!.x].piece) {
      newBoard[draggedPiece.coordinates!.y + integer * 2][draggedPiece.coordinates!.x].moveable = true;
    }
  }

  //Check if a piece is in front of the pawn before being able to move forward
  if (!newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x].piece) {
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x].moveable = true;
  }

  // check if a opposite color piece is diagonally adjacent to attack

  if (
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x + integer] &&
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x + integer].piece &&
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x + integer].piece?.color !== draggedPiece.color
  ) {
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x + integer].moveable = true;
  }

  if (
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x - integer] &&
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x - integer].piece &&
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x - integer].piece?.color !== draggedPiece.color
  ) {
    newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x - integer].moveable = true;
  }
};

export const rookMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>) => {
  let integer = draggedPiece.color === "white" ? -1 : 1;

  let upint = draggedPiece.coordinates!.y + integer;

  while (upint <= 7) {
    newBoard[draggedPiece.coordinates!.y + upint][draggedPiece.coordinates!.x].moveable = true;
    upint++;
  }
};
