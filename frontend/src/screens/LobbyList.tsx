import React from "react";
import './LobbyList.scss';
import LobbyListItem from "../components/LobbyListItem";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { API } from "../logic/API";
import { ServerEventType } from "../enums/ServerEventType";
import { Lobby } from "../models/Lobby";
import { ClientEventType } from "../enums/ClientEventType";

class LobbyList extends React.Component<RouteComponentProps>{
  ListItemChange(lobby: Lobby){
    //console.log("Item change:", lobby);
  }

  ListItemNew(lobby: Lobby){
    //console.log("New item:", lobby);
  }

  ListItemRemove(lobby: Lobby){
    //console.log("Item removed:", lobby);
  }

  componentDidMount(){
    API.Subscribe(ServerEventType.LobbyListItemChange, (data) => this.ListItemChange(data));
    API.Subscribe(ServerEventType.LobbyListItemNew, (data) => this.ListItemNew(data));
    API.Subscribe(ServerEventType.LobbyListItemRemove, (data) => this.ListItemRemove(data));
    API.SendEvent({Type: ClientEventType.SubscribeLobbyList});
  }

  componentWillUnmount(){
    API.SendEvent({Type: ClientEventType.UnsubscribeLobbyList});
  }

  render(){
    return (
      <div className="LobbyList">
        <div className="ScreenContent">
          <header>
            <h2>Dostupné hry</h2>
          </header>
          <section className="list">
            <LobbyListItem id="new" host="+ Založit novou místnost"/>
            <LobbyListItem id="1234" host="Janch" map="Skladiště" connected={1}/>
            <LobbyListItem id="1234" host="Michal" map="Park" connected={2}/>
            <LobbyListItem id="1234" host="Tom" map="Skladiště" connected={4}/>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(LobbyList);
