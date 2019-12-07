import React from "react";
import "./Bomb.scss";

interface BombProps{
  bombsLeft: number;
}

class Bomb extends React.Component<BombProps>{
    renderBombs = () => {
    let bombs = [];
    for (let i = 0; i < this.props.bombsLeft; i++){
        bombs.push(<div className="Bomb" key = {i}/>);
    }
    console.log(bombs);
        return bombs;
    }

  render(){
    return (
        <div className="Bomb_container">
            {this.renderBombs()}
        </div>
    );
  }
}

export default Bomb;