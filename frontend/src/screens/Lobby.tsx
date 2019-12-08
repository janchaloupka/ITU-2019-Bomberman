import React, { KeyboardEvent, FocusEvent } from "react";
import './Lobby.scss';
import '../assets/player_invert.png';
import PlayerAvatar from "../components/PlayerAvatar";
import { RouteComponentProps, withRouter } from "react-router";
import { API } from "../logic/API";
import { ClientEventType } from "../enums/ClientEventType";
import { GameManager } from "../logic/GameManager";
import { Lobby as LobbyModel } from "../models/Lobby";
import { ServerEventType } from "../enums/ServerEventType";
import { Link } from "react-router-dom";

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
    YourID: 0
  }

  private subscribedUpdate = (() => {});

  componentDidMount(){
    console.log("Hello World");
    let id = (this.props.match.params as {id: string}).id;
    if(id === "new"){
      API.SendEvent({Type: ClientEventType.CreateLobby});
      this.props.history.replace("/");
    }else if(!GameManager.CurrentLobby){
      API.SendEvent({Type: ClientEventType.JoinLobby, Data: {ID: parseInt(id, 10)}});
      this.props.history.replace("/"); // TODO přesměrovat na dialog "připojuje se..."
    }else{
      this.subscribedUpdate = () => this.LobbyUpdate();
      GameManager.SubscribeLobbyChange(this.subscribedUpdate);
      this.LobbyUpdate();
    }
  }

  componentWillUnmount(){
    API.Unsubscribe(ServerEventType.LobbyUpdate, this.subscribedUpdate);
  }

  private LobbyUpdate(){
    if(!GameManager.CurrentLobby) return;
    console.log(GameManager.CurrentLobby);
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

  startGame(){
    console.log("Send new game");
    API.SendEvent({Type: ClientEventType.StartGame, Data: {ID: GameManager.CurrentLobby.ID}});
    console.log("New game sent");
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

  leaveLobby(){
    API.SendEvent({Type: ClientEventType.LeaveLobby});
  }

  renderOpponents(){
    return this.state.Players.map((p, i) => (
      <PlayerAvatar key={p.ID} name={p.Nick} character="" color={50*i} />
    ));
  }

  render(){
    return (
      <div className="Lobby">
        <div className="ScreenContent">
          <section className="GameOptions">
            <h2>Herní místnost</h2>
            <label>
              <input type="range" min="1" max="3" step="1"/>
              <span>Počet kol</span>
            </label>
            <div className="Value">1</div>
            <label>
              <input type="range" min="30" max="240" step="30"/>
              <span>Časový limit kola</span>
            </label>
            <div className="Value">30s</div>
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
            <PlayerAvatar name="Honza" character="" color={0} />
            <button className="Small">&lt;</button>
            <span className="Name">Název postavy</span>
            <button className="Small">&gt;</button>
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
            <Link to={(this.props.match.params as {id: string}).id + "/game"} className="Button">Spustit hru</Link>
          </footer>
        </div>
      </div>
    );
  }
}

export default withRouter(Lobby);
