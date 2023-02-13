export type Coordinates = {
  x: number;
  y: number;
};
export type Tile = {
  piece: Piece | null;
  moveable: boolean;
};

export type Piece = {
  color: string;
  name: string;
  hasMoved?: boolean;
  x?: number;
  y?: number;
};
