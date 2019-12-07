import React from "react";
import './Game.scss';
import PlayerAvatar from "../components/PlayerAvatar";
import HealthBar from "../components/HealthBar";
import Countdown from 'react-countdown-now';
import Bomb from "../components/Bomb";


class Game extends React.Component{
    

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
                <Countdown date={Date.now() + 10000}/>
            </section>

            <section className="OtherPlayers">
                <PlayerAvatar name="Michal" character="" color={120} />
                <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" />
                <PlayerAvatar name="Tom" character="" color={200} />
                <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" />
                <PlayerAvatar name="Ituga" character="" color={40} />
                <HealthBar heart1="red_heart" heart2="red_heart" heart3="gray_heart" />
            </section>
        </div>
    </div>
    );}
}

export default Game;