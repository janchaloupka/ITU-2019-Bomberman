import { Character } from "./Character";
import { MapObject } from "./MapObject";
import { Observable } from "./Observable";

export interface Player extends MapObject, Character, Observable{
  Name: string;
  Character: Character;
  RemainingLives: number;
}
