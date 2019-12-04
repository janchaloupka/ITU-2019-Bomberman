import React from "react";
import './LobbyList.scss';
import LobbyListItem from "../components/LobbyListItem";

class LobbyList extends React.Component{
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

export default LobbyList;
