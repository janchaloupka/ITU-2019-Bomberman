import React from 'react';
import './App.scss';
import './assets/bcg.png';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from './screens/MainPage';
import LobbyList from './screens/LobbyList';
import Lobby from './screens/Lobby';
import Game from './screens/Game';
import { API, ServerEventObserver } from "./logic/API";
import { ServerEventType } from './enums/ServerEventType';
import { ServerEvent } from './models/ServerEvent';
import { ClientEvent } from "./models/ClientEvent";
import { ClientEventType } from './enums/ClientEventType';


class App extends React.Component implements ServerEventObserver {
  NewMessage(data: ServerEvent){

  }

  render (){
    API.Unsubscribe(ServerEventType.BombPlace, this);
    API.OnOpen(() => {
      API.SendEvent({
        Type: ClientEventType.CreateLobby
      });
    });
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/game/:gameId/inProgress">
              <Game/>
            </Route>
            <Route path="/game/:gameId">
              <Lobby/>
            </Route>
            <Route path="/games">
              <LobbyList/>
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
