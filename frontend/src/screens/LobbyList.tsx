import React from "react";
import './LobbyList.scss';
import LobbyListItem from "../components/LobbyListItem";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { API } from "../logic/API";
import { ServerEventType } from "../enums/ServerEventType";
import { Lobby } from "../models/Lobby";
import { ClientEventType } from "../enums/ClientEventType";
import { LobbyListItem as LobbyListItemModel } from "../models/LobbyListItem";

interface LobbyListState{
  items: LobbyListItemModel[];
}

class LobbyList extends React.Component<RouteComponentProps>{
  state: LobbyListState = {
    items: []
  }

  ListItemNew(item: LobbyListItemModel){
    let newItemsState = [...this.state.items, item];
    this.setState({items: newItemsState});
  }

  ListItemChange(item: LobbyListItemModel){
    // TODO
  }

  ListItemRemove(item: LobbyListItemModel){
    let index = this.state.items.map((v) => v.ID).indexOf(item.ID);
    if(index < 0) return;

    let newItemsState = ([...this.state.items]).splice(index, 1);
    this.setState({items: newItemsState});
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

  private renderItems(){

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
