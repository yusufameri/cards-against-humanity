import React from 'react'
import "./PlayerSelectionScreen.css"
import Card from "../../SharedComponents/Card/Card"



function GameBoard() {
  return (
    <div className="top">
      <Card text= "Something really long perhaps"/>
    </div>
  );
}

function ChooseCardCarousel() {
  return (
      <div className="bottom">
          <div className="inner">
            <div className="scrolling-wrapper">
              <Card text="baba jan"/>
              <Card text="nasim nadia"/>
              <Card text="milad"/>
            </div>
          </div>
    </div>
  );
}

function PlayerSelectionScreen() {
  return (
    <div className="screen">
      <GameBoard />
      <ChooseCardCarousel/>
    </div>
  );
}

export default PlayerSelectionScreen;
