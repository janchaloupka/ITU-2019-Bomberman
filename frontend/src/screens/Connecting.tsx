import React from "react";
import './Connecting.scss';
import '../assets/bcg.png';
import { API } from "../logic/API";
import { ClientEventType } from "../enums/ClientEventType";

class Connecting extends React.Component{
  render(){
    return (
    <div className="MainPage">
      <div className="ScreenContent">
        <p>Připojování do hry...</p>
        <button onClick={() => API.SendEvent({Type: ClientEventType.LeaveLobby})} className="Button">Zrušit</button>
      </div>
    </div>
    )
  }
}

export default Connecting;
