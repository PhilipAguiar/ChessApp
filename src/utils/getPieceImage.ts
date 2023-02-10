export const getPieceImage = (name: string, color: string) => {
  switch (name) {
    case "rook":
      if (color === "white") {
        return "♖";
      } else {
        return "♜";
      }
      break;
    case "knight":
      if (color === "white") {
        return "♘";
      } else {
        return "♞";
      }

      break;
    case "bishop":
      if (color === "white") {
        return "♗";
      } else {
        return "♝";
      }

      break;

    case "queen":
      if (color === "white") {
        return "♕";
      } else {
        return "♛";
      }

      break;

    case "king":
      if (color === "white") {
        return "♔";
      } else {
        return "♚";
      }

      break;

    case "pawn":
      if (color === "white") {
        return "♙";
      } else {
        return "♟";
      }

      break;

    default:
      break;
  }
};
