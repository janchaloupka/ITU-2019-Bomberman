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
import { GameManager } from './logic/GameManager';
import { ClientEventType } from './enums/ClientEventType';
import Connecting from './screens/Connecting';

interface AppState{
  ServerConnected: boolean;
}

class App extends React.Component<RouteComponentProps, AppState>{
  state: AppState = {
    ServerConnected: false
  }

  componentDidMount(){
    API.Connected(() => {
      this.setState({ServerConnected: true});
      API.SendEvent({Type: ClientEventType.ChangeName, Data: { Nick: GameManager.Nick}});
    });

    API.Disconnected(() => {
      this.setState({ServerConnected: false})
      //this.props.history.push("/");
      //API.Connect();
      // TODO dotaz na znovupřipojení
    });

    API.Subscribe(ServerEventType.LobbyJoin, (data) => this.ReactToLobbyJoin(data));
    API.Subscribe(ServerEventType.LobbyLeave, () => this.ReactToLobbyLeave());
  }

  private ReactToLobbyJoin(lobby: LobbyModel){
    if(GameManager.CurrentLobby){
      console.error("Nelze se připojit k lobby, když už je součástí lobby.");
      return;
    }

    GameManager.CurrentLobby = lobby;
    this.props.history.replace(`/${lobby.ID}`);
  }

  private ReactToLobbyLeave(){
    this.props.history.replace(`/list`);
    if(!GameManager.CurrentLobby){
      console.info("Nelze se odpojit z lobby, protože nejsme v lobby.");
      return;
    }

    GameManager.CurrentLobby = undefined;
  }

  render (){
    if(this.state.ServerConnected) return (
      <div className="App">
        <Switch>
          <Route exact path="/connecting">
            <Connecting/>
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
      </div>
    );
    else return (
      <div className="App">
        Wait, server se připojuje...
      </div>
    );
  }
}

export default withRouter(App);
