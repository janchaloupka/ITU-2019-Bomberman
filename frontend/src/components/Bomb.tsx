import React from "react";
import "./Bomb.scss";

interface HealthBarProps{
  bombsLeft: number;
}

class HealthBar extends React.Component<HealthBarProps>{
    renderBombs = () => {
        let bombs = [];
        for (let i = 0; i < this.props.bombsLeft; i++){
            console.log("Bomb pushed\n");
            bombs.push(<img src={"../assets/bomb.png"} alt="bomb" key={i}/>);
        }
        return bombs;
    }

  render(){
    return (
        <div>
            {this.renderBombs()}
        </div>
    );
  }
}

export default HealthBar;