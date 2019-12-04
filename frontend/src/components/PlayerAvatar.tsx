import React from "react";
import "./PlayerAvatar.scss";
import "../assets/sprites.png";

interface PlayerAvatarProps{
  name: string;
  color: number;
  isHost?: boolean;
  character: string; // TODO jiný typ (asi characteru)
}

class PlayerAvatar extends React.Component<PlayerAvatarProps>{
  render(){
    return (
      <div className="PlayerAvatar">
        <div style={{filter: `grayscale(100%) sepia(100%) saturate(500%) hue-rotate(300deg) hue-rotate(${this.props.color}deg)`}} className={"Avatar " + this.props.character}></div>
        <div className="Name">{this.props.name}</div>
      </div>
    );
  }
}

export default PlayerAvatar;
