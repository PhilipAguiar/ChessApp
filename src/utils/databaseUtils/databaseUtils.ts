import { Tile } from "../../types";
import { collection, doc, getDocs, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../contexts/FirebaseContext";

export const uploadGame = async (board: Array<Array<Tile>>, gameID: string, playerName: string, playerTurn: "white" | "black") => {
  await setDoc(doc(db, "ChessGames", gameID), { board: JSON.stringify(board), playerTurn: playerTurn, playerName: playerName, gameID: gameID });
};

export const getGame = async (uid: string) => {
  const game = await getDoc(doc(db, "ChessGames", uid));
  const parsedGame = game.data()!.board;

  return JSON.parse(parsedGame);
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

export const getTurn = async (uid: string) => {
  const game = await getDoc(doc(db, "ChessGames", uid));

  return game.data()!.playerTurn;
};

export const isAdmin = (uid: string): boolean => {
  if (uid === process.env.REACT_APP_ADMIN_UID) {
    return true;
  }
  return false;
};
