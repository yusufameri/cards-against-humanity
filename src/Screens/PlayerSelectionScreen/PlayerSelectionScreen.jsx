import React from 'react'
import "./PlayerSelectionScreen.css"
import Card from "../../SharedComponents/Card/Card"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"

// Mocking cards data to demo usage in props...
let cards = [
  {
    type: "A",
    text: "baba jan",
    id: 1
  },
  {
    type: "A",
    text: "nasim nadia with a lot of words yaa",
    id: 1
  },
  {
    type: "A",
    text: "milad",
    id: 1
  }
];

function CardCarousel(props) {
  return (
    <div className="scrolling-wrapper">
      {
        props.cards.map((card) => <Card text={card.text}/>)
      }
    </div>
  );
}

function PlayerSelectionScreen() {
  return (
    <Screen>
      <Top>
        <Card text= "Something really long perhaps"/>
      </Top>
      <Bottom>
        <CardCarousel cards ={cards}/>
      </Bottom>
    </Screen>
  );
}

export default PlayerSelectionScreen;
