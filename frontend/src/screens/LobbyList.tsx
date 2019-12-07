import React from "react";
import './LobbyList.scss';
import LobbyListItem from "../components/LobbyListItem";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { API } from "../logic/API";
import { ServerEventType } from "../enums/ServerEventType";
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
    if(!item.PlayerCount) return;

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
    let items: JSX.Element[] = [];
    this.state.items.forEach(item => {
      items.push(<LobbyListItem
        key={item.ID.toString()}
        id={item.ID.toString()}
        host={item.HostName}
        map={item.MapName}
        connected={item.PlayerCount}
      />);
    });

    return items;
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
            {this.renderItems()}
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(LobbyList);
