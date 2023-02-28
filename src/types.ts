export type Coordinates = {
  x: number;
  y: number;
};
export type Tile = {
  piece: Piece | null;
  moveable: boolean;
  justMoved?: boolean;
};

export type Game = {
  board: Array<Array<Tile>>;
  playerTurn: "white" | "black";
  playerName: "string";
  gameID: "string";
};

export type Piece = {
  color: string;
  name: string;
  hasMoved?: boolean;
  inCheck?: boolean;
  x?: number;
  y?: number;
};

export type Comment = {
  user: string;
  comment: string;
};
