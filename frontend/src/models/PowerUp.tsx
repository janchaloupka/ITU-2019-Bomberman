import { MapObject } from "./MapObject";

export interface PowerUp extends MapObject{
  SpeedBonus: number;
  PowerBonus: number;
  BombLimitBonus: number;
}
