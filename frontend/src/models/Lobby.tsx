import Game from "../screens/Game";
import { Player } from "./Player";
import { Map } from "./Map";

export interface Lobby{
  ID: number;
  YourID: number;
  NumberOfRounds: number;
  TimeLimit: number;
  Map: Map;
  Players: Player[];
  //Games?: Game[];
}
