import { Character } from "./Character";
import { MapObject } from "./MapObject";
import { Observable } from "./Observable";

export interface Player extends MapObject, Character, Observable{
  ID: number;
  Nick: string;
  Character: string;
  RemainingLives?: number;
}
