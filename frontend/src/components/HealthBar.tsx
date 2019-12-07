import React from "react";
import "./HealthBar.scss";

interface HealthBarProps{
  heart1: string;
  heart2: string;
  heart3: string;
}

class HealthBar extends React.Component<HealthBarProps>{
  render(){
    return (
        <div>
        <div className={this.props.heart1}></div>
        <div className={this.props.heart2}></div>
        <div className={this.props.heart3}></div>
        </div>
    );
  }
}

export default HealthBar;