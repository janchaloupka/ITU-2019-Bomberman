import React from "react";
import "./PlayerAvatar.scss";
import "../assets/avatar_regular.png";
import "../assets/avatar_bomber.png";
import "../assets/avatar_scout.png";
import "../assets/avatar_destroyer.png";

interface PlayerAvatarProps{
  name: string;
  color: number;
  isHost?: boolean;
  character: string;
}

class PlayerAvatar extends React.Component<PlayerAvatarProps>{
  render(){
    return (
      <div className="PlayerAvatar">
        <div style={{filter: `${(this.props.color > 50 && this.props.color < 250) ? 'brightness(150%) ' : ''}hue-rotate(${this.props.color}deg)`}} className={"Avatar " + this.props.character}></div>
        <div className="Name">{this.props.name}</div>
      </div>
    );
  }
}

export default PlayerAvatar;
