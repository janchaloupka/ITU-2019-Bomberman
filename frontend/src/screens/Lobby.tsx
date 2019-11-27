import React from "react";
import './Lobby.scss';
import PlayerAvatar from "../components/PlayerAvatar";

class Lobby extends React.Component{
  render(){
    return (
      <div className="Lobby">
        <section className="GameOptions">
          <h2>Herní místnost</h2>
          <label>Počet kol</label>
          <input type="range"/>
          <label>Časový limit kola</label>
          <input type="range"/>
        </section>

        <section className="Map">
          <div className="Preview">
            MAPA TODO
          </div>
          <div className="Selection">
            <button>&lt;</button>
            <span className="Name">Název mapy</span>
            <button>&gt;</button>
          </div>
        </section>

        <section className="CurrentPlayer">
          <PlayerAvatar/>
          TODO stats
          <button>&lt;</button>
          <span className="Name">Název postavy</span>
          <button>&gt;</button>
        </section>

        <section className="OtherPlayers">
          <PlayerAvatar/>
          <PlayerAvatar/>
          <PlayerAvatar/>
        </section>
        <footer>
          <span className="GameCode">https://bomberman.cz/5648</span>
          <button className="Secondary">Zkopírovat pozvánku</button>
          <button>Spustit hru</button>
        </footer>
      </div>
    );
  }
}

export default Lobby;
