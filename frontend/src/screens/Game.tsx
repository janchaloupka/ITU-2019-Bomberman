import React, { Props } from "react";
import './Game.scss';
import PlayerAvatar from "../components/PlayerAvatar";
import HealthBar from "../components/HealthBar";
import Countdown from 'react-countdown-now';
import Bomb from "../components/Bomb";
import { GameManager } from "../logic/GameManager";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Lobby as LobbyModel } from "../models/Lobby";

interface GameState extends LobbyModel{

}

class Game extends React.Component<RouteComponentProps, GameState>{

    state: GameState = {
        TimeLimit:0,
        Players: [],
        YourID: 0,
        ID: 0,
        NumberOfRounds: 0,
        Map: {ID: "", Objects: [], Name: ""}
    }

    componentDidMount(){
      if(!GameManager.CurrentLobby) return;
      this.setState(GameManager.CurrentLobby);
    }

    renderOpponents(){
        let players = this.state.Players.filter((p) => p.ID !== this.state.YourID);
        if(players.length === 0) return <p>Čeká se na hráče...<br/>Adresa pro připojení: <b>{window.location.host}{window.location.pathname}</b></p>;

        return players.map((p) => {
          let i = this.state.Players.indexOf(p);
          return (<section className="OtherPlayers"><PlayerAvatar key={p.ID} name={p.Nick} character={p.Character.ID} color={100*i} /> <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" /></section>)
        });
    }

    renderSelf(){
        let player = this.state.Players.find((p) => p.ID === this.state.YourID);
        if(!player) return;
        let i = this.state.Players.indexOf(player);

        return(
            <section className="CurrentPlayer">
                <PlayerAvatar key={player.ID} name={player.Nick} character={player.Character.ID} color={100*i}/>
                <section className="Attributes">
                    <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" />
                    <Bomb bombsLeft={3}/>
                </section>
            </section>
        );
    }

    render(){
        return(
        <div className = 'Game'>
            <div className = 'ScreenContent' />

            <div className = 'Bar'>

            { this.renderSelf() }

                <section className="Countdown">
                    <Countdown date={Date.now() + this.state.TimeLimit * 1000}/>
                </section>


                { this.renderOpponents() }

            </div>
        </div>
        );}
}

export default withRouter(Game);
