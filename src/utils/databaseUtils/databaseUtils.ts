import { Comment, Tile } from "../../types";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../contexts/FirebaseContext";

export const uploadGame = async (
  board: Array<Array<Tile>>,
  gameID: string,
  playerName: string,
  playerTurn: "white" | "black",
  playerOneScore: Array<string>,
  playerTwoScore: Array<string>
) => {
  await setDoc(doc(db, "ChessGames", gameID), {
    board: JSON.stringify(board),
    playerTurn: playerTurn,
    playerName: playerName,
    gameID: gameID,
    playerOneScore: playerOneScore,
    playerTwoScore: playerTwoScore,
  });
};

export const getGame = async (uid: string) => {
  const game = await getDoc(doc(db, "ChessGames", uid));

  return {
    board: JSON.parse(game.data()!.board),
    playerTurn: game.data()!.playerTurn,
    playerName: game.data()!.playerName,
    playerOneScore: game.data()!.playerOneScore,
    playerTwoScore: game.data()!.playerTwoScore,
  };
  // const game: any = {};

  // await onSnapshot(doc(db, "ChessGames", uid), (game: any) => {
  //   game = { board: game.data()!.board, playerTurn: game.data()!.playerTurn };
  // });
  // return game;
};

export const getAllGames = async () => {
  const snapshot = await getDocs(collection(db, "ChessGames"));
  return snapshot.docs.map((game: any) => {
    return game.data();
  });
};

export const isAdmin = async (uid: string): Promise<boolean> => {
  const user = await getDoc(doc(db, "adminList", uid));

  if (user.data()?.isAdmin) {
    return true;
  }
  return false;
};

export const addChatMessage = async (gameID: string, comment: Comment) => {
  const chatlog = await getDoc(doc(db, "ChatLogs", gameID));
  if (chatlog.data()) {
    const comments = chatlog.data()!.comments;
    await setDoc(doc(db, "ChatLogs", gameID), { comments: [...comments, comment] });
  } else {
    await setDoc(doc(db, "ChatLogs", gameID), { comments: [comment] });
  }
};

export const getChatLog = async (gameID: string) => {
  const game = await getDoc(doc(db, "ChatLogs", gameID));

  return game.data()!.comments;
};
