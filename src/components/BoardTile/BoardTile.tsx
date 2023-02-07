import { Coordinates, Piece, Tile } from "../../types";
import "./BoardTile.scss";

type Props = {
  coordinates: Coordinates;
  alternate?: boolean;
  tile: Tile;
  updateDraggedPiece: Function;
  handleDrop: Function;
};

function BoardTile({ coordinates, alternate, tile, updateDraggedPiece, handleDrop }: Props) {
  // const tileID = String.fromCharCode(96 + coordinates.x + 1) + (coordinates.y + 1);
  const { piece } = tile!;

  return (
    <div
      className={`tile ${alternate ? "tile--alternate" : ""} ${tile.moveable ? "tile--moveable" : ""}`}
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
      <p>{piece?.name}</p>
      {/* <p>{piece?.color}</p> */}
    </div>
  );
}
export default BoardTile;
