import React from "react";
import './Disconnected.scss';
import '../assets/bcg.png';

class Disconnected extends React.Component{
  render(){
    return (
    <div className="Disconnected">
      <div className="ScreenContent">
        <h2>Připojení ztraceno :(</h2>
        <p>Připojení se serverem bylo bohužel ztraceno.</p>
        <a href="/list" className="Button">Zkusit znovu</a>
      </div>
    </div>
    )
  }
}

export default Disconnected;
