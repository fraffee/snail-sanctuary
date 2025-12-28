
export interface SnailData {
  id: number;
  image: string;
  cardImage: string;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface SnailState {
  id: number;
  position: Vector2;
  angle: number;
  speed: number;
  targetAngle: number;
}
