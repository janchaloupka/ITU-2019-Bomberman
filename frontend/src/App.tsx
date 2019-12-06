import React from 'react';
import './App.scss';
import './assets/bcg.png';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from './screens/MainPage';
import LobbyList from './screens/LobbyList';
import Lobby from './screens/Lobby';
import Game from './screens/Game';


class App extends React.Component {
  render (){
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
