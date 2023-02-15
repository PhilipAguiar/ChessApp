import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Tile } from "../../types";
import { calculateCheckMate } from "../../utils/pieceUtils/calculateCheckMate";
import { getPieceImage } from "../../utils/pieceUtils/getPieceImage";
import "./PromotionModal.scss";

type Props = {
  playerTurn: "black" | "white";
  board: Array<Array<Tile>>;
  setBoard: Function;
  setPlayerTurn: Function;
  setPromotionActive: Function;
};

function PromotionModal({ playerTurn, board, setBoard, setPlayerTurn, setPromotionActive }: Props) {
  const pieces = ["queen", "rook", "bishop", "knight"];
  const { pieceSet } = useContext(ThemeContext);

  const clickHandler = (piece: string) => {
    const rowIndex = playerTurn === "white" ? 0 : 7;

    let newBoard = board.map((a) => {
      return a.map((b) => {
        return { ...b };
      });
    });

    newBoard[rowIndex] = newBoard[rowIndex].map((tile) => {
      if (tile.piece && tile.piece.name === "pawn") {
        return {
          moveable: false,
          piece: {
            name: piece,
            color: playerTurn,
          },
        };
      }
      return tile;
    });

    setBoard([...newBoard]);
    calculateCheckMate(newBoard, playerTurn);
    setPlayerTurn(playerTurn === "white" ? "black" : "white");
    setPromotionActive(false);
  };

  return (
    <div className="promotion">
      <h2>Choose a piece to promote in to</h2>
      <div className="promotion__wrapper">
        {pieces &&
          pieces.map((piece) => {
            return (
              <img
                className="promotion__image"
                style={{ fontSize: "3rem" }}
                onClick={() => {
                  clickHandler(piece);
                }}
                src={getPieceImage(piece, playerTurn, pieceSet)}
              />
            );
          })}
      </div>
    </div>
  );
}
export default PromotionModal;
