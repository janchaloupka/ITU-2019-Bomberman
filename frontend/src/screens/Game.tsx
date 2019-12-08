import React from "react";
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
        console.log(GameManager.CurrentLobby.Players);
        this.setState({
            ID: GameManager.CurrentLobby.ID,
            NumberOfRounds: GameManager.CurrentLobby.NumberOfRounds,
            TimeLimit: GameManager.CurrentLobby.TimeLimit,
            YourID: GameManager.CurrentLobby.YourID,
            Players: GameManager.CurrentLobby.Players,
            Map: GameManager.CurrentLobby.Map
          }, () => {
            console.log("Game mount begun");
            
            console.log(this.state.Players);
          });

          

        let updatedPlayers = this.state.Players;
        for (let i = 0; i < this.state.Players.length; i++){
            updatedPlayers[i].RemainingLives = this.state.Players[i].Character.MaxLives + 3;
            updatedPlayers[i].RemainingBombs = this.state.Players[i].Character.MaxBombs + 3;
        }
        this.setState({
            Players: updatedPlayers
        });
        console.log("Game mounted");
        console.log(this.state.Players);
    }

    renderOpponents(){
        let players = this.state.Players.filter((p) => p.ID !== this.state.YourID);
        if(players.length === 0) return <p>Čeká se na hráče...<br/>Adresa pro připojení: <b>{window.location.host}{window.location.pathname}</b></p>;

        return players.map((p) => {
            let i = this.state.Players.indexOf(p);
            if (!p.RemainingLives){
                console.log("Lives not set");
                return <></>;
            }
            return (
                <section className="OtherPlayers">
                    <PlayerAvatar key={p.ID} name={p.Nick} character={p.Character.ID} color={100*i} />
                    <HealthBar heartsLeft={p.RemainingLives}/>
                </section>)
        });
    }

    renderSelf(){
        let player = this.state.Players.find((p) => p.ID === this.state.YourID);
        if(!player) return;
        let i = this.state.Players.indexOf(player);
        if(!player.RemainingLives)
            player.RemainingLives = 3;//TODO fix
        return(
            <section className="CurrentPlayer">
                <PlayerAvatar key={player.ID} name={player.Nick} character={player.Character.ID} color={100*i}/>
                <section className="Attributes">
                    <HealthBar heartsLeft={3}/>
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
