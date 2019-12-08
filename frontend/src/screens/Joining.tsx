import React from "react";
import './Joining.scss';
import '../assets/bcg.png';
import { API } from "../logic/API";
import { ClientEventType } from "../enums/ClientEventType";
import { GameManager, GameManagerState } from "../logic/GameManager";
import { RouteComponentProps, withRouter } from "react-router-dom";

class Joining extends React.Component<RouteComponentProps>{
  componentDidMount(){
    if(GameManager.State !== GameManagerState.Joining)
      this.props.history.replace("/list");
  }

  render(){
    return (
    <div className="Joining">
      <div className="ScreenContent">
        <p>Připojování do hry...</p>
        <button onClick={() => API.SendEvent({Type: ClientEventType.LeaveLobby})} className="Button">Zrušit</button>
      </div>
    </div>
    )
  }
}

export default withRouter(Joining);
