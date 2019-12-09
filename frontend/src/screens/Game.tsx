import React from "react";
import './Game.scss';
import '../assets/Overworld.png';
import '../assets/IceMap.png';
import '../assets/FootballPitch.png';
import '../assets/player_regular.png';
import PlayerAvatar from "../components/PlayerAvatar";
import HealthBar from "../components/HealthBar";
import Countdown, { zeroPad } from 'react-countdown-now';
import Bomb from "../components/Bomb";
import { GameManager } from "../logic/GameManager";
import { RouteComponentProps, withRouter, Router } from "react-router-dom";
import { Lobby as LobbyModel } from "../models/Lobby";
import { API } from "../logic/API";
import { ClientEventType } from "../enums/ClientEventType";

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

    private subscribedUpdate = (() => {});

    componentDidMount(){
      if(!GameManager.CurrentLobby){
        this.props.history.replace("/");
      }
      this.subscribedUpdate = () => this.GameUpdate();
      GameManager.SubscribeLobbyChange(this.subscribedUpdate);
      this.GameUpdate();
    }

    componentWillUnmount(){
      GameManager.UnsubscribeLobbyChange(this.subscribedUpdate);
    }

    GameUpdate(){
      if(!GameManager.CurrentLobby) return;
      if(GameManager.CurrentLobby.Players.length === 1) API.SendEvent({Type: ClientEventType.LeaveLobby});
      this.setState(GameManager.CurrentLobby);
    }

    renderOpponents(){
        let players = this.state.Players.filter((p) => p.ID !== this.state.YourID);
        if(players.length === 0){
          return [];
        }

        return players.map((p) => {
          let i = this.state.Players.indexOf(p);
          return (<section className="OtherPlayers"><PlayerAvatar small={true} key={p.ID} name={p.Nick} character={p.Character.ID} color={100*i} /> <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" /></section>)
        });
    }

    renderSelf(){
        let player = this.state.Players.find((p) => p.ID === this.state.YourID);
        if(!player) return;
        let i = this.state.Players.indexOf(player);

        return(
            <section className="CurrentPlayer">
                <PlayerAvatar small={true} key={player.ID} name={player.Nick} character={player.Character.ID} color={100*i}/>
                <section className="Attributes">
                    <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" />
                    <Bomb bombsLeft={3}/>
                </section>
            </section>
        );
    }

    // @ts-ignore
    countdownRenderer({ minutes, seconds }) {
      return <span> {zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    };

    render(){
      return(
      <div className = 'Game'>
        <div className = 'ScreenContent'>
          <div className = {'Map ' + this.state.Map.ID} />
          <div className = 'Bar'>
            { this.renderSelf() }
            <section className="Countdown">
              <Countdown renderer={this.countdownRenderer} date={Date.now() + this.state.TimeLimit * 1000}/>
            </section>
            { this.renderOpponents() }
          </div>
        </div>
      </div>
      );
    }
}

export default withRouter(Game);
