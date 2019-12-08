import { MapObject } from "./MapObject";

export interface Bomb extends MapObject{
  Power: number;
  Countdown: number;
}
