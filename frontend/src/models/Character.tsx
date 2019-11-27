import { Sprite } from "./Sprite";
import { Observable } from "./Observable";

export interface Character extends Observable{
  Sprite: Sprite;
  Name: string;
  Speed: number;
  Power: number;
  MaxLives: number;
  MaxBombs: number;
}
