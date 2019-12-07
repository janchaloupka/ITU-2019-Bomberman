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

interface AppState{
  ServerConnected: boolean;
}

class App extends React.Component<RouteComponentProps, AppState>{
  state: AppState = {
    ServerConnected: false
  }

  componentDidMount(){
    API.Connected(() => this.setState({ServerConnected: true}));

    API.Subscribe(ServerEventType.LobbyJoin, (data) => this.ReactToLobbyJoin(data));
  }

  private ReactToLobbyJoin(lobby: LobbyModel){
    this.props.history.replace(`/game/${lobby.ID}`);
  }

  render (){
    if(this.state.ServerConnected) return (
      <div className="App">
        <Switch>
          <Route path="/game/:id/inProgress">
            <Game/>
          </Route>
          <Route path="/game/:id">
            <Lobby/>
          </Route>
          <Route path="/games">
            <LobbyList/>
          </Route>
          <Route path="/">
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
