import Game from "../screens/Game";
import { Player } from "./Player";
import { Map } from "./Map";
import { Observable } from "./Observable";

export interface Lobby extends Observable{
  ID: number;
  NumberOfRounds: number;
  TimeLimit: number;
  Map?: Map;
  Players: Player[];
  Games?: Game[];
}
