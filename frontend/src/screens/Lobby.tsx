import React, { KeyboardEvent, FocusEvent, ChangeEvent } from "react";
import './Lobby.scss';
import '../assets/player_invert.png';
import PlayerAvatar from "../components/PlayerAvatar";
import { RouteComponentProps, withRouter } from "react-router";
import { API } from "../logic/API";
import { ClientEventType } from "../enums/ClientEventType";
import { GameManager, GameManagerState } from "../logic/GameManager";
import { Lobby as LobbyModel } from "../models/Lobby";
import { ServerEventType } from "../enums/ServerEventType";
import { Link } from "react-router-dom";
import { Characters } from "../models/Character";

interface LobbyState extends LobbyModel{
  InviteCopied: boolean;
}

class Lobby extends React.Component<RouteComponentProps, LobbyState>{
  state: LobbyState = {
    InviteCopied: false,
    ID: 0,
    NumberOfRounds: 0,
    TimeLimit: 30,
    Players: [],
    YourID: 0,
    Map: {ID: "", Objects: [], Name: ""}
  }

  private subscribedUpdate = (() => {});

  componentDidMount(){
    let id = (this.props.match.params as {id: string}).id;
    if(id === "new"){
      API.SendEvent({Type: ClientEventType.CreateLobby});
      GameManager.State = GameManagerState.Joining;
      this.props.history.replace("/joining");
    }else if(!GameManager.CurrentLobby){
      API.SendEvent({Type: ClientEventType.JoinLobby, Data: {ID: parseInt(id, 10)}});
      GameManager.State = GameManagerState.Joining;
      this.props.history.replace("/joining");
    }else{
      this.subscribedUpdate = () => this.LobbyUpdate();
      GameManager.SubscribeLobbyChange(this.subscribedUpdate);
      this.LobbyUpdate();
    }
  }

  componentWillUnmount(){
    GameManager.UnsubscribeLobbyChange(this.subscribedUpdate);
  }

  private LobbyUpdate(){
    if(!GameManager.CurrentLobby) return;
    this.setState({
      ID: GameManager.CurrentLobby.ID,
      NumberOfRounds: GameManager.CurrentLobby.NumberOfRounds,
      TimeLimit: GameManager.CurrentLobby.TimeLimit,
      YourID: GameManager.CurrentLobby.YourID,
      Players: GameManager.CurrentLobby.Players,
      Map: GameManager.CurrentLobby.Map
    });
  }

  private copyTimeout?: number;
  copyInvitation(){
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.setState({InviteCopied: true});
      clearTimeout(this.copyTimeout);
      this.copyTimeout = window.setTimeout(() => this.setState({InviteCopied: false}), 2500);
    }, () => {
      alert("Nepodařilo se zkopírovat odkaz do schránky");
    });
  }

  setNick(event: FocusEvent<HTMLInputElement>){
    let val = (event.target as HTMLInputElement).value;
    GameManager.Nick = val;
  }

  setNickKey(event: KeyboardEvent<HTMLInputElement>){
    const elem = (event.target as HTMLInputElement);

    if(event.key === "Enter"){
      elem.blur();
    }else if(event.key === "Escape"){
      elem.value = GameManager.Nick;
      elem.blur();
    }
  }

  changeCharacter(i: number){
    let player = this.state.Players.find((p) => p.ID === this.state.YourID);
    if(!player) return;

    i = (Characters.length + Characters.indexOf(player.Character.ID) + i) % Characters.length;
    API.SendEvent({Type: ClientEventType.ChangeCharacter, Data: {
      ID: Characters[i]
    }});
  }

  leaveLobby(){
    API.SendEvent({Type: ClientEventType.LeaveLobby});
  }

  renderSelf(){
    let player = this.state.Players.find((p) => p.ID === this.state.YourID);
    if(!player) return;
    let i = this.state.Players.indexOf(player);

    return (
      <>
        <PlayerAvatar key={player.ID} name={player.Nick} character={player.Character.ID} color={100*i}/>
        <span className="Name">{player.Character.Name}</span>
        <div className="Lives">{ 3 + player.Character.MaxLives}</div>
        <div className="Bombs">{ 3 + player.Character.MaxBombs}</div>
        <div className="Power">{ player.Character.Speed > 0 ? "+" + player.Character.Speed : player.Character.Speed}</div>
        <div className="Speed">{ player.Character.Power > 0 ? "+" + player.Character.Power : player.Character.Power}</div>
        <button className="Small" onClick={() => this.changeCharacter(-1)}>&lt;</button>
        <button className="Small" onClick={() => this.changeCharacter(1)}>&gt;</button>
      </>
    );
  }

  renderOpponents(){
    let players = this.state.Players.filter((p) => p.ID !== this.state.YourID);
    if(players.length === 0) return <p>Čeká se na hráče...<br/>Adresa pro připojení: <b>{window.location.host}{window.location.pathname}</b></p>;

    return players.map((p) => {
      let i = this.state.Players.indexOf(p);
      return (<PlayerAvatar key={p.ID} name={p.Nick} character={p.Character.ID} color={100*i} />)
    });
  }

  changeNoOfRounds(event: ChangeEvent<HTMLInputElement>){
    if(event.target.valueAsNumber === this.state.NumberOfRounds) return;
    API.SendEvent({
      Type: ClientEventType.UpdateLobbySettings,
      Data: {
        ID: this.state.ID,
        NumberOfRounds: event.target.valueAsNumber
      }
    });
  }

  changeTimeLimit(event: ChangeEvent<HTMLInputElement>){
    if(event.target.valueAsNumber === this.state.TimeLimit) return;
    API.SendEvent({
      Type: ClientEventType.UpdateLobbySettings,
      Data: {
        ID: this.state.ID,
        TimeLimit: event.target.valueAsNumber
      }
    });
  }

  startGame(){
    if(this.state.Players.length < 2) return;
    API.SendEvent({Type: ClientEventType.StartGame, Data: {ID: this.state.ID}});
  }

  render(){
    return (
      <div className="Lobby">
        <div className="ScreenContent">
          <section className="GameOptions">
            <h2>Herní místnost</h2>
            <label>
              <input value={this.state.NumberOfRounds} onChange={(e) => this.changeNoOfRounds(e)} type="range" min="1" max="3" step="1"/>
              <span>Počet kol</span>
            </label>
            <div className="Value">{this.state.NumberOfRounds}</div>
            <label>
              <input value={this.state.TimeLimit} onChange={(e) => this.changeTimeLimit(e)} type="range" min="30" max="240" step="30"/>
              <span>Časový limit kola</span>
            </label>
            <div className="Value">{this.state.TimeLimit}s</div>
          </section>

          <section className="Map">
            <div className="Preview">
              MAPA TODO
            </div>
            <div className="Selection">
              <button className="Small">&lt;</button>
              <span className="Name">Název mapy</span>
              <button className="Small">&gt;</button>
            </div>
          </section>

          <section className="CurrentPlayer">
            { this.renderSelf() }
          </section>

          <section className="OtherPlayers">
            { this.renderOpponents() }
          </section>
          <footer>
            <label className="Nick">
              <input defaultValue={GameManager.Nick} onKeyPress={this.setNickKey} onBlur={this.setNick}/>
              <span>Změna jména</span>
            </label>
            <button
              className={"Secondary Copy" + (this.state.InviteCopied ? " Copied" : "")}
              onClick={() => this.copyInvitation()}
            >Zkopírovat pozvánku</button>
            <button className="Secondary" onClick={() => this.leaveLobby()}>Odejít</button>
            <button disabled={this.state.Players.length < 2} onClick={() => this.startGame()}>Spustit hru</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default withRouter(Lobby);
