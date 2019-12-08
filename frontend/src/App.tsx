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
  }

  private ReactToLobbyJoin(lobby: LobbyModel){
    this.props.history.replace(`/${lobby.ID}`);
    if(GameManager.CurrentLobby){
      console.error("Nelze se připojit k lobby, když už je součástí lobby.");
      return;
    }

    GameManager.CurrentLobby = lobby;
  }

  render (){
    if(this.state.ServerConnected) return (
      <div className="App">
        <Switch>
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
