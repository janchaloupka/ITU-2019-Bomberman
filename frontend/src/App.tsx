import React from 'react';
import './App.scss';
import './assets/bcg.png';
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import MainPage from './screens/MainPage';
import LobbyList from './screens/LobbyList';
import Lobby from './screens/Lobby';
import Game from './screens/Game';
import { API } from './logic/API';
import { ServerEventType } from './enums/ServerEventType';
import { Lobby as LobbyModel } from "./models/Lobby";
import { GameManager, GameManagerState } from './logic/GameManager';
import { ClientEventType } from './enums/ClientEventType';
import Connecting from './screens/Connecting';
import Joining from './screens/Joining';
import Disconnected from './screens/Disconnected';

interface AppState{
  ServerConnected: boolean;
  WasConnectedBefore: boolean;
}

class App extends React.Component<RouteComponentProps, AppState>{
  state: AppState = {
    ServerConnected: false,
    WasConnectedBefore: false
  }

  componentDidMount(){
    API.Connected(() => {
      this.setState({ServerConnected: true, WasConnectedBefore: true});
      API.SendEvent({Type: ClientEventType.ChangeName, Data: { Nick: GameManager.Nick}});
    });

    API.Disconnected(() => {
      this.setState({ServerConnected: false});
    });

    API.Subscribe(ServerEventType.LobbyJoin, (data) => this.ReactToLobbyJoin(data));
    API.Subscribe(ServerEventType.LobbyLeave, () => this.ReactToLobbyLeave());
    API.Subscribe(ServerEventType.GameStart, () => this.ReactToGameStart());
    API.Subscribe(ServerEventType.GameEnd, () => this.ReactToGameEnd());
  }

  private ReactToGameStart(){
    if(!GameManager.CurrentLobby) return;

    GameManager.State = GameManagerState.Game;
    this.props.history.replace(`/${GameManager.CurrentLobby.ID}/game`)
  }

  private ReactToGameEnd(){
    if(!GameManager.CurrentLobby) return;

    GameManager.State = GameManagerState.Lobby;
    this.props.history.replace(`/${GameManager.CurrentLobby.ID}`)
  }

  private ReactToLobbyJoin(lobby: LobbyModel){
    GameManager.State = GameManagerState.Lobby;
    if(GameManager.CurrentLobby){
      console.error("Nelze se připojit k lobby, když už je součástí lobby.");
      return;
    }

    GameManager.CurrentLobby = lobby;
    this.props.history.replace(`/${lobby.ID}`);
  }

  private ReactToLobbyLeave(){
    GameManager.State = GameManagerState.None;
    this.props.history.replace(`/list`);
    if(!GameManager.CurrentLobby){
      console.info("Nelze se odpojit z lobby, protože nejsme v lobby.");
      return;
    }

    GameManager.CurrentLobby = undefined;
  }

  renderAppContent(){
    if(this.state.ServerConnected) return (
      <Switch>
        <Route exact path="/joining">
          <Joining/>
        </Route>
        <Route exact path="/list">
          <LobbyList/>
        </Route>
        <Route exact path="/:id/game">
          <Game/>
        </Route>
        <Route exact path="/:id">
          <Lobby/>
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    );
    else return this.state.WasConnectedBefore ? <Disconnected/> : <Connecting/>;
  }

  render (){
    return <div className="App">{this.renderAppContent()}</div>
  }
}

export default withRouter(App);
