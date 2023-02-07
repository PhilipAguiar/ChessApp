import { Piece, Tile } from "../types";

const isEnemyColor = (piece1?: Piece, piece2?: Piece): boolean => {
  if (piece1 && piece2) {
    if (piece1.color === piece2.color) {
      return false;
    }
  }

  return true;
};

export const pawnMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>): Array<Tile> => {
  //var to handle direction of pawns
  const availableMoves: Array<Tile> = [];

  let integer = draggedPiece.color === "white" ? -1 : 1;

  //check if pawn is at starting spot for ability to move two squares

  if (draggedPiece.color === "white" && draggedPiece.y! === 6) {
    if (!newBoard[draggedPiece.y! + integer * 2][draggedPiece.x!].piece) {
      availableMoves.push(newBoard[draggedPiece.y! + integer * 2][draggedPiece.x!]);
    }
  }

  if (draggedPiece.color === "black" && draggedPiece.y! === 1) {
    if (!newBoard[draggedPiece.y! + integer * 2][draggedPiece.x!].piece) {
      availableMoves.push(newBoard[draggedPiece.y! + integer * 2][draggedPiece.x!]);
    }
  }

  //Check if a piece is in front of the pawn before being able to move forward
  if (!newBoard[draggedPiece.y! + integer][draggedPiece.x!].piece) {
    availableMoves.push(newBoard[draggedPiece.y! + integer][draggedPiece.x!]);
  }

  // check if a opposite color piece is diagonally adjacent to attack

  if (
    newBoard[draggedPiece.y! + integer][draggedPiece.x! + integer] &&
    newBoard[draggedPiece.y! + integer][draggedPiece.x! + integer].piece &&
    newBoard[draggedPiece.y! + integer][draggedPiece.x! + integer].piece?.color !== draggedPiece.color
  ) {
    availableMoves.push(newBoard[draggedPiece.y! + integer][draggedPiece.x! + integer]);
  }

  if (
    newBoard[draggedPiece.y! + integer][draggedPiece.x! - integer] &&
    newBoard[draggedPiece.y! + integer][draggedPiece.x! - integer].piece &&
    newBoard[draggedPiece.y! + integer][draggedPiece.x! - integer].piece?.color !== draggedPiece.color
  ) {
    availableMoves.push(newBoard[draggedPiece.y! + integer][draggedPiece.x! - integer]);
  }
  return availableMoves;
};

export const rookMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>): Array<Tile> => {
  //check how many spaces the rook can move vertically. breaks when hits a tile with a unit
  const availableMoves: Array<Tile> = [];
  for (let index = draggedPiece.y! + 1; index <= 7; index++) {
    let tile = newBoard[index][draggedPiece.x!];

    if (!tile.piece) {
      availableMoves.push(tile);
    }

    if (tile.piece) {
      if (tile.piece?.color !== draggedPiece.color) {
        availableMoves.push(tile);
      }
      break;
    }
  }

  for (let index = draggedPiece.y! - 1; index >= 0; index--) {
    let tile = newBoard[index][draggedPiece.x!];

    if (!tile.piece) {
      availableMoves.push(tile);
    }

    if (tile.piece) {
      if (tile.piece?.color !== draggedPiece.color) {
        availableMoves.push(tile);
      }
      break;
    }
  }

  for (let index = draggedPiece.x! + 1; index <= 7; index++) {
    let tile = newBoard[draggedPiece.y!][index];

    if (!tile.piece) {
      availableMoves.push(tile);
    }

    if (tile.piece) {
      if (tile.piece?.color !== draggedPiece.color) {
        availableMoves.push(tile);
      }
      break;
    }
  }

  for (let index = draggedPiece.x! - 1; index >= 0; index--) {
    let tile = newBoard[draggedPiece.y!][index];

    if (!tile.piece) {
      availableMoves.push(tile);
    }

    if (tile.piece) {
      if (tile.piece?.color !== draggedPiece.color) {
        availableMoves.push(tile);
      }
      break;
    }
  }
  return availableMoves;
};

export const knightMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>): Array<Tile> => {
  const availableMoves: Array<Tile> = [];

  if (draggedPiece.y! + 2 <= 7) {
    if (draggedPiece.x! + 1 <= 7) {
      if (newBoard[draggedPiece.y! + 2][draggedPiece.x! + 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 2][draggedPiece.x! + 1]);
      }
    }
    if (draggedPiece.x! - 1 >= 0) {
      if (newBoard[draggedPiece.y! + 2][draggedPiece.x! - 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 2][draggedPiece.x! - 1]);
      }
    }
  }

  if (draggedPiece.y! - 2 >= 0) {
    if (draggedPiece.x! + 1 <= 7) {
      if (newBoard[draggedPiece.y! - 2][draggedPiece.x! + 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! - 2][draggedPiece.x! + 1]);
      }
    }
    if (draggedPiece.x! - 1 >= 0) {
      if (newBoard[draggedPiece.y! - 2][draggedPiece.x! - 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! - 2][draggedPiece.x! - 1]);
      }
    }
  }
  if (draggedPiece.y! + 2 <= 7) {
    if (draggedPiece.x! + 1 <= 7) {
      if (newBoard[draggedPiece.y! + 2][draggedPiece.x! + 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 2][draggedPiece.x! + 1]);
      }
    }
    if (draggedPiece.x! - 1 >= 0) {
      if (newBoard[draggedPiece.y! + 2][draggedPiece.x! - 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 2][draggedPiece.x! - 1]);
      }
    }
  }

  if (draggedPiece.y! + 2 <= 7) {
    if (draggedPiece.x! + 1 <= 7) {
      if (newBoard[draggedPiece.y! + 2][draggedPiece.x! + 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 2][draggedPiece.x! + 1]);
      }
    }
    if (draggedPiece.x! - 1 >= 0) {
      if (newBoard[draggedPiece.y! + 2][draggedPiece.x! - 1].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 2][draggedPiece.x! - 1]);
      }
    }
  }

  if (draggedPiece.x! - 2 >= 0) {
    if (draggedPiece.y! + 1 <= 7) {
      if (newBoard[draggedPiece.y! + 1][draggedPiece.x! - 2].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 1][draggedPiece.x! - 2]);
      }
    }
    if (draggedPiece.y! - 1 >= 0) {
      if (newBoard[draggedPiece.y! - 1][draggedPiece.x! - 2].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! - 1][draggedPiece.x! - 2]);
      }
    }
  }

  if (draggedPiece.x! + 2 <= 7) {
    if (draggedPiece.y! + 1 <= 7) {
      if (newBoard[draggedPiece.y! + 1][draggedPiece.x! + 2].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! + 1][draggedPiece.x! + 2]);
      }
    }
    if (draggedPiece.y! - 1 >= 0) {
      if (newBoard[draggedPiece.y! - 1][draggedPiece.x! + 2].piece?.color !== draggedPiece.color) {
        availableMoves.push(newBoard[draggedPiece.y! - 1][draggedPiece.x! + 2]);
      }
    }
  }
  return availableMoves;
};

export const bishopMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>): Array<Tile> => {
  const availableMoves: Array<Tile> = [];

  let SE = true;
  let SW = true;
  let NE = true;
  let NW = true;

  for (let index = 1; index <= 7; index++) {
    //SE
    if (!(draggedPiece.x! + index > 7 || draggedPiece.y! + index > 7)) {
      let newTile = newBoard[draggedPiece.y! + index][draggedPiece.x! + index];
      if (SE && isEnemyColor(draggedPiece, newTile.piece!)) {
        availableMoves.push(newTile);
      }
      if (newTile.piece) {
        SE = false;
      }
    }

    //SW
    if (!(draggedPiece.x! - index < 0 || draggedPiece.y! + index > 7)) {
      let newTile = newBoard[draggedPiece.y! + index][draggedPiece.x! - index];
      if (SW && isEnemyColor(draggedPiece, newTile.piece!)) {
        availableMoves.push(newTile);
      }

      if (newTile.piece) {
        SW = false;
      }
    }

    //NE
    if (!(draggedPiece.x! - index < 0 || draggedPiece.y! - index < 0)) {
      let newTile = newBoard[draggedPiece.y! - index][draggedPiece.x! - index];

      if (NE && isEnemyColor(draggedPiece, newTile.piece!)) {
        availableMoves.push(newTile);
      }

      if (newTile.piece) {
        NE = false;
      }
    }

    //Nw
    if (!(draggedPiece.x! + index > 7 || draggedPiece.y! - index < 0)) {
      let newTile = newBoard[draggedPiece.y! - index][draggedPiece.x! + index];

      if (NW && isEnemyColor(draggedPiece, newTile.piece!)) {
        availableMoves.push(newTile);
      }

      if (newTile.piece) {
        NW = false;
      }
    }
  }

  return availableMoves;
};

export const kingMovement = (draggedPiece: Piece, newBoard: Array<Array<Tile>>): Array<Tile> => {
  const availableMoves: Array<Tile> = [];

  let integer = draggedPiece.color === "white" ? -1 : 1;

  //vertical movement
  if (draggedPiece.y! + integer >= 0 && draggedPiece.y! + integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y! + integer][draggedPiece.x!].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y! + integer][draggedPiece.x!]);
    }
  }
  if (draggedPiece.y! - integer >= 0 && draggedPiece.y! - integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y! - integer][draggedPiece.x!].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y! - integer][draggedPiece.x!]);
    }
  }

  //horizontal
  if (draggedPiece.x! + integer >= 0 && draggedPiece.x! + integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y!][draggedPiece.x! + integer].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y!][draggedPiece.x! + integer]);
    }
  }
  if (draggedPiece.x! - integer >= 0 && draggedPiece.x! - integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y!][draggedPiece.x! - integer].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y!][draggedPiece.x! - integer]);
    }
  }

  //diagonal movement

  if (draggedPiece.x! + integer >= 0 && draggedPiece.x! + integer <= 7 && draggedPiece.y! + integer >= 0 && draggedPiece.y! + integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y! + integer][draggedPiece.x! + integer].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y! + integer][draggedPiece.x! + integer]);
    }
  }

  if (draggedPiece.x! - integer >= 0 && draggedPiece.x! - integer <= 7 && draggedPiece.y! + integer >= 0 && draggedPiece.y! + integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y! + integer][draggedPiece.x! - integer].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y! + integer][draggedPiece.x! - integer]);
    }
  }

  if (draggedPiece.x! - integer >= 0 && draggedPiece.x! - integer <= 7 && draggedPiece.y! - integer >= 0 && draggedPiece.y! - integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y! - integer][draggedPiece.x! - integer].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y! - integer][draggedPiece.x! - integer]);
    }
  }

  if (draggedPiece.x! + integer >= 0 && draggedPiece.x! + integer <= 7 && draggedPiece.y! - integer >= 0 && draggedPiece.y! - integer <= 7) {
    if (isEnemyColor(newBoard[draggedPiece.y! - integer][draggedPiece.x! + integer].piece!, draggedPiece)) {
      availableMoves.push(newBoard[draggedPiece.y! - integer][draggedPiece.x! + integer]);
    }
  }
  return availableMoves;
};
