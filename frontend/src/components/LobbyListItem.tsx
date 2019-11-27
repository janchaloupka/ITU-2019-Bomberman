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
    return(
    <Link to={"/game/" + this.props.id} className="LobbyListItem">
      <div className="Host">{this.props.host}</div>
      <div className="Map">{this.props.map}</div>
      <div className="Connected">{this.props.connected}</div>
    </Link>)
  }
}

export default LobbyListItem;
