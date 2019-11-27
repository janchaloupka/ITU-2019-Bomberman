import React from 'react';
import './App.scss';
import MainPage from './screens/MainPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyList from './screens/LobbyList';
import Lobby from './screens/Lobby';

class App extends React.Component {
  render (){
    return (
      <Router>
        <Switch>
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
    );
  }
}

export default App;
