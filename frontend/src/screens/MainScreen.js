import React from 'react';
import '../styles/MainScreen.css';

function MainScreen() {
  return (
    <div className = "App">
      <div className = "Headline">
        <div className = "HeadlineContainer">
          <p className = "HeadlineText"> BOMBERMAN? </p>
        </div>
      </div>

      <div className = "ButtonContainer">
        <button className = "Button">YES!</button>
      </div>
    </div>
  );
}

export default MainScreen;

/*
<div className = "App">
      <div className = "Headline">
        <div className = "HeadlineContainer">
          <p className = "HeadlineText"> BOMBERMAN? </p>
        </div>
      </div>

      <div className = "ButtonContainer">
        <button className = "Button">YES!</button>
      </div>
    </div>

    z tohoto souboru
    <div className = "App">
      <div className = "Headline">
        <p > BOMBERMAN? </p>
      </div>

      <div >
        <button className = "Button">YES!</button>
      </div>
    </div>
*/