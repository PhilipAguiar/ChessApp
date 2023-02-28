import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import { db } from "../../contexts/FirebaseContext";
import { Comment, Game, Tile } from "../../types";
import { getAllGames, getChatLog, getGame } from "../../utils/databaseUtils/databaseUtils";
import "./AdminPage.scss";

function AdminPage({ flipBoard }: { flipBoard: boolean }) {
  const [listOfGames, setListOfGames] = useState<Array<Game>>();
  const [activeGame, setActiveGame] = useState<Game>();
  const [playerOneScore, setPlayerOneScore] = useState<Array<string>>([]);
  const [playerTwoScore, setPlayerTwoScore] = useState<Array<string>>([]);
  const [playerTurn, setPlayerTurn] = useState<"white" | "black">("white");
  const [chatLog, setChatLog] = useState<Array<Comment>>([]);

  const [board, setBoard] = useState<Array<Array<Tile>>>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const gameList = await getAllGames();
      const newListOfGames: Array<Game> = [];
      gameList.forEach((game: any) => {
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
      onSnapshot(doc(db, "ChessGames", activeGame.gameID), async () => {
        const game = await getGame(activeGame.gameID);

        setBoard([...game.board]);
        setPlayerTurn(game.playerTurn);
        setPlayerOneScore(game.playerOneScore);
        setPlayerTwoScore(game.playerTwoScore);
      });

      onSnapshot(doc(db, "ChatLogs", activeGame.gameID), async () => {
        const chatLog = await getChatLog(activeGame.gameID);

        setChatLog(chatLog);
      });
      // setBoard(activeGame.board);
      // setPlayerTurn(activeGame.playerTurn);
    }
  }, [activeGame]);

  return (
    <div className="admin">
      <div>
        {listOfGames &&
          listOfGames.map((game: Game, i) => {
            return (
              <p
                key={i}
                onClick={() => {
                  setActiveGame(game);
                }}
              >
                {game.playerName}
              </p>
            );
          })}
      </div>
      <div className="admin__wrapper">
        {activeGame && (
          <>
            <ChessBoard
              playerOneScore={playerOneScore}
              playerTwoScore={playerTwoScore}
              setPlayerOneScore={setPlayerOneScore}
              setPlayerTwoScore={setPlayerTwoScore}
              flipBoard={true}
              board={board}
              setBoard={setBoard}
              playerTurn={playerTurn}
              setPlayerTurn={setPlayerTurn}
              gameID={activeGame.gameID}
              opponentName={activeGame.playerName}
            />
            {chatLog && <ChatBox userID={activeGame.gameID} chatLog={chatLog} />}
          </>
        )}
      </div>
    </div>
  );
}
export default AdminPage;
