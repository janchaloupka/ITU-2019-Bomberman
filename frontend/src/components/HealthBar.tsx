import React from "react";
import "./HealthBar.scss";

interface HealthBarProps{
  heartsLeft: number;
}



class HealthBar extends React.Component<HealthBarProps>{
    renderHearts = () => {
        let hearts = [];
        for (let i = 0; i < this.props.heartsLeft; i++){
            hearts.push(<div className="red_heart"></div>);
        }
        console.log(hearts);
        return hearts;
    }
    render(){
        return (
            <div>
            {this.renderHearts()}
            </div>
        );
    }
}

export default HealthBar;