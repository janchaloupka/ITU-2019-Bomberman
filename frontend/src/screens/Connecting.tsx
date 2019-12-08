import React from "react";
import './Connecting.scss';
import '../assets/bcg.png';

class Connecting extends React.Component{
  render(){
    return (
    <div className="Connecting">
      <div className="ScreenContent">
        <h2>Bomberman online</h2>
        <p>Počkejte prosím, probíhá připojení k hernímu serveru...</p>
      </div>
    </div>
    )
  }
}

export default Connecting;
