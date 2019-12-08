import React, { Props } from "react";
import './Game.scss';
import PlayerAvatar from "../components/PlayerAvatar";
import HealthBar from "../components/HealthBar";
import Countdown from 'react-countdown-now';
import Bomb from "../components/Bomb";
import { GameManager } from "../logic/GameManager";

class Game extends React.Component{

    state={
        timeLimit:0,
        Players: [],
        YourID: 0
    }

    componentDidMount(){
        if(!GameManager.CurrentLobby) return;
        this.setState({
            timeLimit: GameManager.CurrentLobby.TimeLimit,
            players: GameManager.CurrentLobby.Players
        })
    }

    renderOpponents(){
        let players = this.state.Players.filter((p) => p.ID !== this.state.YourID);
        if(players.length === 0) return <p>Čeká se na hráče...<br/>Adresa pro připojení: <b>{window.location.host}{window.location.pathname}</b></p>;
    
        return players.map((p) => {
          let i = this.state.Players.indexOf(p);
          return (<PlayerAvatar key={p.ID} name={p.Nick} character={p.Character.ID} color={100*i} />)
        });
      }

    render(){
        return(
        <div className = 'Game'>
            <div className = 'ScreenContent' />

            <div className = 'Bar'>
                <section className="CurrentPlayer">
                    <PlayerAvatar name="Honza" character="" color={0} />
                    <section className="Attributes">
                        <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" />
                        <Bomb bombsLeft={3}/>
                    </section>
                </section>

                <section className="Countdown">
                    <Countdown date={Date.now() + this.state.timeLimit * 1000}/>
                </section>

                <section className="OtherPlayers">
                { this.renderOpponents() }
                </section>
            </div>
        </div>
        );}
}

export default Game;
