import { API } from './API';
import { Lobby } from './../models/Lobby';
import { ClientEventType } from '../enums/ClientEventType';
class GameManagerClass{
  public CurrentLobby?: Lobby = undefined;

  public get Nick() : string {
    let n = localStorage.getItem("nick");

    if(n == null){
      n = "Hráč";
      localStorage.setItem("nick", n);
    }

    return n;
  }

  public set Nick(n : string) {
    localStorage.setItem("nick", n);
    API.SendEvent({Type: ClientEventType.ChangeName, Data: { Nick: n}});
  }


}

export const GameManager = new GameManagerClass();
