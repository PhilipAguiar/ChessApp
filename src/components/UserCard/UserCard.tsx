import { getPieceImage } from "../../utils/getPieceImage";
import "./UserCard.scss";

type Props = {
  name: string;
  alternate?: boolean;
  playerOneScore?: Array<string>;
  playerTwoScore?: Array<string>;
};

function UserCard({ name, alternate, playerOneScore, playerTwoScore }: Props) {
  return (
    <div className={`user-card ${alternate ? "user-card--alternate" : ""}`}>
      {playerTwoScore && (
        <div className="user-card__scoreboard user-card__scoreboard--alternate">
          {playerTwoScore.map((piece, i) => {
            return <p key={i}>{getPieceImage(piece, "black")}</p>;
          })}
        </div>
      )}

      <p> {name}</p>

      {playerOneScore && (
        <div className="user-card__scoreboard">
          {playerOneScore.map((piece, i) => {
            return <p key={i}>{getPieceImage(piece, "black")}</p>;
          })}
        </div>
      )}
    </div>
  );
}
export default UserCard;
