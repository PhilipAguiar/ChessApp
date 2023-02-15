import { useEffect, useState } from "react";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { Game, Tile } from "../../types";
import { getAllGames } from "../../utils/databaseUtils/databaseUtils";

function AdminPage() {
  const [listOfGames, setListOfGames] = useState<Array<Game>>();
  const [activeGame, setActiveGame] = useState<Game>();
  const [playerOneScore, setPlayerOneScore] = useState<Array<string>>([]);
  const [playerTwoScore, setPlayerTwoScore] = useState<Array<string>>([]);
  const [playerTurn, setPlayerTurn] = useState<"white" | "black">("white");
  const [flipBoard, setFlipBoard] = useState<boolean>(false);
  const [board, setBoard] = useState<Array<Array<Tile>>>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const gameList = await getAllGames();
      const newListOfGames: Array<Game> = [];
      gameList.map((game: any) => {
        newListOfGames.push({
          board: JSON.parse(game.board),
          playerTurn: game.playerTurn,
          playerName: game.playerName,
          gameID: game.gameID,
        });
      });

      setListOfGames(newListOfGames);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (activeGame) {
      setBoard(activeGame.board);
      setPlayerTurn(activeGame.playerTurn);
    }
  }, [activeGame]);

  return (
    <div>
      {listOfGames &&
        listOfGames.map((game: Game) => {
          return (
            <p
              onClick={() => {
                setActiveGame(game);
              }}
            >
              {game.playerName}
            </p>
          );
        })}

      {activeGame && (
        <ChessBoard
          playerOneScore={playerOneScore}
          playerTwoScore={playerTwoScore}
          setPlayerOneScore={setPlayerOneScore}
          setPlayerTwoScore={setPlayerTwoScore}
          flipBoard={flipBoard}
          setFlipBoard={setFlipBoard}
          board={board}
          setBoard={setBoard}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
          gameID={activeGame.gameID}
          opponentName={activeGame.playerName}
        />
      )}
    </div>
  );
}
export default AdminPage;
