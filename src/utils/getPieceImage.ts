export const getPieceImage = (name: string, color: string) => {
  switch (name) {
    case "rook":
      if (color === "white") {
        return "♖";
      } else {
        return "♜";
      }

    case "knight":
      if (color === "white") {
        return "♘";
      } else {
        return "♞";
      }

    case "bishop":
      if (color === "white") {
        return "♗";
      } else {
        return "♝";
      }

    case "queen":
      if (color === "white") {
        return "♕";
      } else {
        return "♛";
      }

    case "king":
      if (color === "white") {
        return "♔";
      } else {
        return "♚";
      }

    case "pawn":
      if (color === "white") {
        return "♙";
      } else {
        return "♟";
      }

    default:
      break;
  }
};

export const getAllPieces = (color: "black" | "white"): Array<string> => {
  if (color === "white") {
    return ["♕", "♖", "♗", "♘"];
  } else {
    return ["♛", "♜", "♝", "♞"];
  }
};
