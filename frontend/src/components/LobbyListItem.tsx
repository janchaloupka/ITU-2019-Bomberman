import React from "react";
import './LobbyListItem.scss';
import { Link } from "react-router-dom";

interface LobbyListItemProps{
  host: string;
  map?: string;
  connected?: number;
  id: string;
}

class LobbyListItem extends React.Component<LobbyListItemProps>{
  render(){
    if(this.props.connected && this.props.connected >= 4) return (
    <div className="LobbyListItem Disabled">
      <div className="Host">{this.props.host}</div>
      <div className="Map">{this.props.map}</div>
      {this.props.connected != null && (<div className="Connected">{this.props.connected}</div>) }
    </div>);

    return(
    <Link to={"/" + this.props.id} className="LobbyListItem">
      <div className="Host">{this.props.host}</div>
      <div className="Map">{this.props.map}</div>
      {this.props.connected != null && (<div className="Connected">{this.props.connected}</div>) }
    </Link>)
  }
}

export default LobbyListItem;
