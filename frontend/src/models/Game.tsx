import { Observable } from "./Observable";

export interface Game extends Observable{
  RemainingTime: number;
}
