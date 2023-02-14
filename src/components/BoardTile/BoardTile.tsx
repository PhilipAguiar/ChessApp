import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Coordinates, Piece, Tile } from "../../types";
import { getPieceImage } from "../../utils/getPieceImage";
import { isKingInCheck } from "../../utils/isKingInCheck";
import "./BoardTile.scss";

type Props = {
  coordinates: Coordinates;
  alternate?: boolean;
  tile: Tile;
  updateDraggedPiece: Function;
  handleDrop: Function;
  draggedPiece?: Piece | null;
  board: Array<Array<Tile>>;
  playerTurn: string;
};

function BoardTile({ coordinates, alternate, tile, updateDraggedPiece, handleDrop, draggedPiece, board, playerTurn }: Props) {
  // const tileID = String.fromCharCode(96 + coordinates.x + 1) + (coordinates.y + 1);

  const { theme, pieceSet } = useContext(ThemeContext);

  const { piece } = tile!;
  const [pieceImg, setPieceImg] = useState<string>();
  const [largePieces, setLargePieces] = useState<boolean>(false);
  const [inCheck, setInCheck] = useState<boolean>(false);

  useEffect(() => {
    if (piece) {
      setPieceImg(getPieceImage(piece.name, piece.color, pieceSet));
    } else {
      setPieceImg("");
    }
  }, [piece, pieceSet]);

  useEffect(() => {
    if (pieceSet === "cartoon" || pieceSet === "pixel") {
      setLargePieces(true);
    } else {
      setLargePieces(false);
    }
  }, [pieceSet]);

  useEffect(() => {
    if (piece && piece.name === "king" && piece.color === playerTurn) {
      if (isKingInCheck(board, playerTurn)) {
        setInCheck(true);
      }
    } else {
      setInCheck(false);
    }
  }, [board]);

  return (
    <div
      id={`${coordinates.x}${coordinates.y}`}
      className={`tile tile--${theme} ${alternate && `tile--${theme}--alternate`} ${tile.moveable && "tile--moveable"} ${inCheck && "tile--check"}`}
      onClick={() => {
        if (draggedPiece) {
          handleDrop(coordinates.x, coordinates.y);
        } else if (piece) {
          let newPiece: Piece = { name: piece.name, color: piece.color, x: coordinates.x, y: coordinates.y };
          updateDraggedPiece(newPiece);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragStart={() => {
        if (piece) {
          let draggedPiece: Piece = { name: piece.name, color: piece.color, x: coordinates.x, y: coordinates.y };
          updateDraggedPiece(draggedPiece);
        }
      }}
      onDrop={() => {
        handleDrop(coordinates.x, coordinates.y);
      }}
      draggable
    >
      {/* <p>{tileID}</p> */}
      {/* <p>{`${tile?.moveable}`}</p> */}
      {/* <p>{`${coordinates.x}, ${coordinates.y}`}</p> */}
      {pieceImg && <img className={`tile__piece ${largePieces ? "tile__piece--large" : ""}`} src={pieceImg} />}
      {/* <p>{piece?.color}</p> */}
    </div>
  );
}
export default BoardTile;
