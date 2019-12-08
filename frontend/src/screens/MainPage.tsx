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
        <p>
          Bomberman klon v prohlížeči <b>pro 2-4 hráče</b>.
          Zahrajte si legendární hru Bomberman <b>se svými kamarády</b> nebo <b>s náhodnými lidmi</b> po síti.
        </p>
        <p>
          Každý hráč si může vybrat postavu, která nejvíce vyhovuje jeho stylu hraní.
          Nemáte čas na nastavování hry? Nevadí! Každá vytvořená hra je náhodně nastavena, takže stačí hru pouze spustit.
        </p>
        <Link to="/list" className="Button">Vyhledat hry ostatních</Link>
        <Link to="/new" className="Button Secondary">Založit vlastní hru</Link>
      </div>
    </div>
    )
  }
}

export default MainPage;
