import defaultPieces from "../piece-sets/defaultPieces";
import defaultPiecesShadow from "../piece-sets/defaultPiecesShadows";
import cartoonPieces from "../piece-sets/cartoonPieces";
import pixelPieces from "../piece-sets/pixelPieces";

export const getPieceImage = (name: string, color: string, pieceSet: string) => {
  let chosenPieceSet;

  switch (pieceSet) {
    case "default-shadows":
      chosenPieceSet = defaultPiecesShadow;
      break;
    case "cartoon":
      chosenPieceSet = cartoonPieces;
      break;
    case "pixel":
      chosenPieceSet = pixelPieces;
      break;
    default:
      chosenPieceSet = defaultPieces;
      break;
  }

  switch (name) {
    case "king":
      if (color === "white") {
        return chosenPieceSet.king.white;
      } else {
        return chosenPieceSet.king.black;
      }

    case "queen":
      if (color === "white") {
        return chosenPieceSet.queen.white;
      } else {
        return chosenPieceSet.queen.black;
      }

    case "rook":
      if (color === "white") {
        return chosenPieceSet.rook.white;
      } else {
        return chosenPieceSet.rook.black;
      }

    case "knight":
      if (color === "white") {
        return chosenPieceSet.knight.white;
      } else {
        return chosenPieceSet.knight.black;
      }

    case "bishop":
      if (color === "white") {
        return chosenPieceSet.bishop.white;
      } else {
        return chosenPieceSet.bishop.black;
      }
    case "pawn":
      if (color === "white") {
        return chosenPieceSet.pawn.white;
      } else {
        return chosenPieceSet.pawn.black;
      }

    default:
      break;
  }
};
