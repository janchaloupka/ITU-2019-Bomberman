import { Character } from "./Character";

export interface Player{
  ID: number;
  Nick: string;
  Character: Character;
  RemainingLives?: number;
}
