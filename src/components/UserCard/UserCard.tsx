import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getPieceImage } from "../../utils/getPieceImage";
import "./UserCard.scss";

type Props = {
  name: string;
  alternate?: boolean;
  playerOneScore?: Array<string>;
  playerTwoScore?: Array<string>;
};

function UserCard({ name, alternate, playerOneScore, playerTwoScore }: Props) {
  const { pieceSet } = useContext(ThemeContext);

  return (
    <div className={`user-card ${alternate ? "user-card--alternate" : ""}`}>
      {playerTwoScore && (
        <div className="user-card__scoreboard user-card__scoreboard--alternate">
          {playerTwoScore.map((piece, i) => {
            return (
              <img
                className={`user-card__piece ${pieceSet === "cartoon" ? "user-card__piece--large" : ""}`}
                key={i}
                src={getPieceImage(piece, "white", pieceSet)}
              />
            );
          })}
        </div>
      )}

      <p> {name}</p>

      {playerOneScore && (
        <div className="user-card__scoreboard">
          {playerOneScore.map((piece, i) => {
            return (
              <img
                className={`user-card__piece ${pieceSet === "cartoon" ? "user-card__piece--large" : ""}`}
                key={i}
                src={getPieceImage(piece, "black", pieceSet)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default UserCard;
