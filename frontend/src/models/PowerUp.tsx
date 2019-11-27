import { MapObject } from "./MapObject";
import { Observable } from "./Observable";

export interface PowerUp extends MapObject, Observable{
  SpeedBonus: number;
  PowerBonus: number;
  BombLimitBonus: number;
}
