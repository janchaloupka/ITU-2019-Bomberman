import { Player } from './../models/Player';
import { API } from './API';
import { Lobby } from './../models/Lobby';
import { ClientEventType } from '../enums/ClientEventType';
import { ServerEventType } from '../enums/ServerEventType';

export enum GameManagerState{
  None,
  Joining,
  Lobby,
  Game
}

class GameManagerClass{
  private lobbyObserver: (() => void)[] = [];

  public CurrentLobby?: Lobby = undefined;
  public State: GameManagerState = GameManagerState.None;

  private subscribedUpdate: ((data:Lobby) => void);
  private subscribedJoin: ((data:Player) => void);
  private subscribedLeave: ((data:Player) => void);
  private subscribedName: ((data:Player) => void);
  private subscribedCharacter: ((data:Player) => void);

  constructor(){
    this.subscribedUpdate = (data) => this.LobbyUpdate(data);
    this.subscribedJoin = (data) => this.PlayerJoin(data);
    this.subscribedLeave = (data) => this.PlayerLeave(data);
    this.subscribedName = (data) => this.NameChange(data);
    this.subscribedCharacter = (data) => this.PlayerCharacter(data);

    API.Subscribe(ServerEventType.LobbyUpdate, this.subscribedUpdate);
    API.Subscribe(ServerEventType.PlayerJoin, this.subscribedJoin);
    API.Subscribe(ServerEventType.PlayerLeave, this.subscribedLeave);
    API.Subscribe(ServerEventType.NameChange, this.subscribedName);
    API.Subscribe(ServerEventType.PlayerCharacter, this.subscribedCharacter);
  }

  private LobbyUpdate(data: Lobby){
    if(!this.CurrentLobby) return;

    this.CurrentLobby.NumberOfRounds = data.NumberOfRounds;
    this.CurrentLobby.TimeLimit = data.TimeLimit;

    this.lobbyObserver.forEach(c => c());
  }

  private PlayerJoin(data: Player){
    if(!this.CurrentLobby) return;

    this.CurrentLobby.Players.push(data);

    this.lobbyObserver.forEach(c => c());
  }

  private PlayerLeave(data: Player){
    if(!this.CurrentLobby) return;

    this.CurrentLobby.Players =
      this.CurrentLobby.Players.filter(p => p.ID !== data.ID);

    this.lobbyObserver.forEach(c => c());
  }

  private NameChange(data: Player){
    if(!this.CurrentLobby) return;

    let i = this.CurrentLobby.Players.map((p) => p.ID).indexOf(data.ID);
    this.CurrentLobby.Players[i].Nick = data.Nick;

    this.lobbyObserver.forEach(c => c());
  }

  private PlayerCharacter(data: Player){
    if(!this.CurrentLobby) return;

    let i = this.CurrentLobby.Players.map((p) => p.ID).indexOf(data.ID);
    this.CurrentLobby.Players[i].Character = data.Character;

    this.lobbyObserver.forEach(c => c());
  }

  public SubscribeLobbyChange(callback: ()=>void){
    this.lobbyObserver.push(callback);
  }

  public UnsubscribeLobbyChange(callback: ()=>void){
    this.lobbyObserver = this.lobbyObserver.filter(val => val !== callback);
  }

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
