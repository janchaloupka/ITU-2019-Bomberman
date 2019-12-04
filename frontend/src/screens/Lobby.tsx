import React from "react";
import './Lobby.scss';
import PlayerAvatar from "../components/PlayerAvatar";

class Lobby extends React.Component{
  render(){
    return (
      <div className="Lobby">
        <div className="ScreenContent">
          <section className="GameOptions">
            <h2>Lobby</h2>
            <label>
              <input type="range"/>
              <span>Počet kol</span>
            </label>
            <label>
              <input type="range"/>
              <span>Časový limit kola</span>
            </label>
          </section>

          <section className="Map">
            <div className="Preview">
              MAPA TODO
            </div>
            <div className="Selection">
              <button className="Small">&lt;</button>
              <span className="Name">Název mapy</span>
              <button className="Small">&gt;</button>
            </div>
          </section>

          <section className="CurrentPlayer">
            <PlayerAvatar name="Honza" character="" color={0} />
            <button className="Small">&lt;</button>
            <span className="Name">Název postavy</span>
            <button className="Small">&gt;</button>
          </section>

          <section className="OtherPlayers">
            <PlayerAvatar name="Michal" character="" color={120} />
            <PlayerAvatar name="Tom" character="" color={200} />
            <PlayerAvatar name="Ituga" character="" color={40} />
          </section>
          <footer>
            <button className="Secondary">Zkopírovat pozvánku</button>
            <button>Spustit hru</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Lobby;
