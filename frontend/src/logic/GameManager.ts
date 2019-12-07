import { API } from './API';
import { Lobby } from './../models/Lobby';
class GameManagerClass{
  public CurrentLobby?: Lobby = undefined;
}

export const GameManager = new GameManagerClass();
