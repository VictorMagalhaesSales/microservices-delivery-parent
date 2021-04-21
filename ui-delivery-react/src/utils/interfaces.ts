export interface Position {
  lat: number;
  lng: number;
}
export interface Route {
  _id: number;
  title: string;
  startPosition: Position;
  endPosition: Position;
}
