import { MapObject } from "./MapObject";
import { Observable } from "./Observable";

export interface Bomb extends MapObject, Observable{
  Power: number;
  Countdown: number;
}
