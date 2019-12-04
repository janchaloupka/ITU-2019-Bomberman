import React from "react";
import './MainPage.scss';
import '../assets/bcg.png';
import { Link } from "react-router-dom";

class MainPage extends React.Component{
  render(){
    return (
    <div className="MainPage">
      <div className="ScreenContent">
        <h1>Bomberman online</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Sed ac dolor sit amet purus malesuada congue. Praesent id justo in neque elementum ultrices.</p>
        <Link to="/games" className="Button">Vyhledat hry</Link>
        <Link to="/game/new" className="Button Secondary">Založit hru</Link>
      </div>
    </div>
    )
  }
}

export default MainPage;
