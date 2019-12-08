import React from "react";
import './LobbyList.scss';
import LobbyListItem from "../components/LobbyListItem";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { API } from "../logic/API";
import { ServerEventType } from "../enums/ServerEventType";
import { ClientEventType } from "../enums/ClientEventType";
import { LobbyListItem as LobbyListItemModel } from "../models/LobbyListItem";
import { GameManager } from "../logic/GameManager"

interface LobbyListState{
  items: LobbyListItemModel[];
  nick: string;
}

class LobbyList extends React.Component<RouteComponentProps>{
  state: LobbyListState = {
    items: [],
    nick: GameManager.Nick
  }

  ListItemNew(item: LobbyListItemModel | LobbyListItemModel[]){
    if(Array.isArray(item)){
      let newItemsState = [...this.state.items, ...item];
      this.setState({items: newItemsState});
    }else if(item.PlayerCount){
      let newItemsState = [...this.state.items, item];
      this.setState({items: newItemsState});
    }
  }

  ListItemChange(item: LobbyListItemModel){
    if(!item.PlayerCount) return;

    let newItemsState = this.state.items.map((val) => val.ID === item.ID ? item : val);
    console.log(newItemsState);
    this.setState({items: newItemsState});
  }

  ListItemRemove(item: LobbyListItemModel){
    let index = this.state.items.map((v) => v.ID).indexOf(item.ID);
    if(index < 0) return;

    let newItemsState = ([...this.state.items]).splice(index, 1);
    this.setState({items: newItemsState});
  }

  private ChangeEvent: ((data: any) => void) = () => {};
  private NewEvent: ((data: any) => void) = () => {};
  private RemoveEvent: ((data: any) => void) = () => {};

  componentDidMount(){
    this.ChangeEvent = (data) => this.ListItemChange(data);
    this.NewEvent = (data) => this.ListItemNew(data);
    this.RemoveEvent = (data) => this.ListItemRemove(data);
    API.Subscribe(ServerEventType.LobbyListItemChange, this.ChangeEvent);
    API.Subscribe(ServerEventType.LobbyListItemNew, this.NewEvent);
    API.Subscribe(ServerEventType.LobbyListItemRemove, this.RemoveEvent);
    API.SendEvent({Type: ClientEventType.SubscribeLobbyList});
  }

  componentWillUnmount(){
    API.SendEvent({Type: ClientEventType.UnsubscribeLobbyList});
    API.Unsubscribe(ServerEventType.LobbyListItemChange, this.ChangeEvent);
    API.Unsubscribe(ServerEventType.LobbyListItemNew, this.NewEvent);
    API.Unsubscribe(ServerEventType.LobbyListItemRemove, this.RemoveEvent);
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

  setNick(event: any){
    GameManager.Nick = event.target.value;
    this.setState({
        nick: GameManager.Nick
    })
  }

  render(){
    let items = this.renderItems();

    return (
      <div className="LobbyList">
        <div className="ScreenContent">
          <header>
                <div className="Grid">

                    <input value={this.state.nick} onChange={this.setNick.bind(this)}/>

                    <h2>Dostupné hry</h2>
                </div>
          </header>
          <section className="list">
            <LobbyListItem id="new" host="+ Založit novou hru"/>
            {items.length > 0 ? items : (<p>Nejsou k dispozici žádné otevřené hry :(<br/>Můžete vytvořit novou hru kliknutím na tlačítko výše.</p>)}
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(LobbyList);
