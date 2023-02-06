import { Piece, Tile } from "../types";

const isEnemyColor = (piece1?: Piece, piece2?: Piece): boolean => {
  if (piece1 && piece2) {
    if (piece1.color === piece2.color) {
      return false;
    }
  }

  return true;
};

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
  //check how many spaces the rook can move vertically. breaks when hits a tile with a unit

  for (let index = draggedPiece.coordinates!.y + 1; index <= 7; index++) {
    if (!newBoard[index][draggedPiece.coordinates!.x].piece) {
      newBoard[index][draggedPiece.coordinates!.x].moveable = true;
    }

    if (newBoard[index][draggedPiece.coordinates!.x].piece) {
      if (newBoard[index][draggedPiece.coordinates!.x].piece?.color !== draggedPiece.color) {
        newBoard[index][draggedPiece.coordinates!.x].moveable = true;
        debugger;
      }
      break;
    }
  }

  for (let index = draggedPiece.coordinates!.y - 1; index >= 0; index--) {
    if (!newBoard[index][draggedPiece.coordinates!.x].piece) {
      newBoard[index][draggedPiece.coordinates!.x].moveable = true;
    }

    if (newBoard[index][draggedPiece.coordinates!.x].piece) {
      if (newBoard[index][draggedPiece.coordinates!.x].piece?.color !== draggedPiece.color) {
        newBoard[index][draggedPiece.coordinates!.x].moveable = true;
      }
      break;
    }
  }

  for (let index = draggedPiece.coordinates!.x + 1; index <= 7; index++) {
    if (!newBoard[draggedPiece.coordinates!.y][index].piece) {
      newBoard[draggedPiece.coordinates!.y][index].moveable = true;
    }

    if (newBoard[draggedPiece.coordinates!.y][index].piece) {
      if (newBoard[draggedPiece.coordinates!.y][index].piece?.color !== draggedPiece.color) {
        newBoard[draggedPiece.coordinates!.y][index].moveable = true;
      }
      break;
    }
  }

  for (let index = draggedPiece.coordinates!.x - 1; index >= 0; index--) {
    if (!newBoard[draggedPiece.coordinates!.y][index].piece) {
      newBoard[draggedPiece.coordinates!.y][index].moveable = true;
    }

    if (newBoard[draggedPiece.coordinates!.y][index].piece) {
      if (newBoard[draggedPiece.coordinates!.y][index].piece?.color !== draggedPiece.color) {
        newBoard[draggedPiece.coordinates!.y][index].moveable = true;
      }
      break;
    }
  }
};

export const knightMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>) => {
  if (draggedPiece.coordinates!.y + 2 <= 7) {
    if (draggedPiece.coordinates!.x + 1 <= 7) {
      if (newBoard[draggedPiece.coordinates!.y + 2][draggedPiece.coordinates!.x + 1].piece?.color !== draggedPiece.color) {
        newBoard[draggedPiece.coordinates!.y + 2][draggedPiece.coordinates!.x + 1].moveable = true;
      }
    }
    if (draggedPiece.coordinates!.x - 1 >= 0) {
      if (newBoard[draggedPiece.coordinates!.y + 2][draggedPiece.coordinates!.x - 1].piece?.color !== draggedPiece.color) {
        newBoard[draggedPiece.coordinates!.y + 2][draggedPiece.coordinates!.x - 1].moveable = true;
      }
    }
  }

  if (draggedPiece.coordinates!.y - 2 >= 0) {
    if (draggedPiece.coordinates!.x + 1 <= 7) {
      if (newBoard[draggedPiece.coordinates!.y - 2][draggedPiece.coordinates!.x + 1].piece?.color !== draggedPiece.color) {
        newBoard[draggedPiece.coordinates!.y - 2][draggedPiece.coordinates!.x + 1].moveable = true;
      }
    }
    if (draggedPiece.coordinates!.x - 1 >= 0) {
      if (newBoard[draggedPiece.coordinates!.y - 2][draggedPiece.coordinates!.x - 1].piece?.color !== draggedPiece.color) {
        newBoard[draggedPiece.coordinates!.y - 2][draggedPiece.coordinates!.x - 1].moveable = true;
      }
    }
  }
};

export const bishopMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>) => {
  let SE = true;
  let SW = true;
  let NE = true;
  let NW = true;

  for (let index = 1; index <= 7; index++) {
    //SE
    if (!(draggedPiece.coordinates!.x + index > 7 || draggedPiece.coordinates!.y + index > 7)) {
      let newTile = newBoard[draggedPiece.coordinates!.y + index][draggedPiece.coordinates!.x + index];
      if (SE && isEnemyColor(draggedPiece, newTile.piece!)) {
        newTile.moveable = true;
      }
      if (newTile.piece) {
        SE = false;
      }
    }

    //SW
    if (!(draggedPiece.coordinates!.x - index < 0 || draggedPiece.coordinates!.y + index > 7)) {
      let newTile = newBoard[draggedPiece.coordinates!.y + index][draggedPiece.coordinates!.x - index];
      if (SW && isEnemyColor(draggedPiece, newTile.piece!)) {
        newTile.moveable = true;
      }

      if (newTile.piece) {
        SW = false;
      }
    }

    //NE
    if (!(draggedPiece.coordinates!.x - index < 0 || draggedPiece.coordinates!.y - index < 0)) {
      let newTile = newBoard[draggedPiece.coordinates!.y - index][draggedPiece.coordinates!.x - index];

      if (NE && isEnemyColor(draggedPiece, newTile.piece!)) {
        newTile.moveable = true;
      }

      if (newTile.piece) {
        NE = false;
      }
    }

    //Nw
    if (!(draggedPiece.coordinates!.x + index > 7 || draggedPiece.coordinates!.y - index < 0)) {
      let newTile = newBoard[draggedPiece.coordinates!.y - index][draggedPiece.coordinates!.x + index];

      if (NW && isEnemyColor(draggedPiece, newTile.piece!)) {
        newTile.moveable = true;
      }

      if (newTile.piece) {
        NW = false;
      }
    }
  }
};

export const kingMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>) => {
  let integer = draggedPiece.color === "white" ? -1 : 1;

  //vertical movement
  if (draggedPiece.coordinates!.y + integer >= 0 && draggedPiece.coordinates!.y + integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x].moveable = true;
    }
  }
  if (draggedPiece.coordinates!.y - integer >= 0 && draggedPiece.coordinates!.y - integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y - integer][draggedPiece.coordinates!.x].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y - integer][draggedPiece.coordinates!.x].moveable = true;
    }
  }

  //horizontal
  if (draggedPiece.coordinates!.x + integer >= 0 && draggedPiece.coordinates!.x + integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y][draggedPiece.coordinates!.x + integer].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y][draggedPiece.coordinates!.x + integer].moveable = true;
    }
  }
  if (draggedPiece.coordinates!.x - integer >= 0 && draggedPiece.coordinates!.x - integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y][draggedPiece.coordinates!.x - integer].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y][draggedPiece.coordinates!.x - integer].moveable = true;
    }
  }

  //diagonal movement

  if (
    draggedPiece.coordinates!.x + integer >= 0 &&
    draggedPiece.coordinates!.x + integer <= 7 &&
    draggedPiece.coordinates!.y + integer >= 0 &&
    draggedPiece.coordinates!.y + integer <= 7
  ) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x + integer].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x + integer].moveable = true;
    }
  }

  if (
    draggedPiece.coordinates!.x - integer >= 0 &&
    draggedPiece.coordinates!.x - integer <= 7 &&
    draggedPiece.coordinates!.y + integer >= 0 &&
    draggedPiece.coordinates!.y + integer <= 7
  ) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x - integer].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y + integer][draggedPiece.coordinates!.x - integer].moveable = true;
    }
  }

  if (
    draggedPiece.coordinates!.x - integer >= 0 &&
    draggedPiece.coordinates!.x - integer <= 7 &&
    draggedPiece.coordinates!.y - integer >= 0 &&
    draggedPiece.coordinates!.y - integer <= 7
  ) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y - integer][draggedPiece.coordinates!.x - integer].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y - integer][draggedPiece.coordinates!.x - integer].moveable = true;
    }
  }

  if (
    draggedPiece.coordinates!.x + integer >= 0 &&
    draggedPiece.coordinates!.x + integer <= 7 &&
    draggedPiece.coordinates!.y - integer >= 0 &&
    draggedPiece.coordinates!.y - integer <= 7
  ) {
    if (isEnemyColor(newBoard[draggedPiece.coordinates!.y - integer][draggedPiece.coordinates!.x + integer].piece!, draggedPiece)) {
      newBoard[draggedPiece.coordinates!.y - integer][draggedPiece.coordinates!.x + integer].moveable = true;
    }
  }
};
