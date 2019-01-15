import React from 'react'
import "./PlayerSelectionScreen.css"
import Card from "../../SharedComponents/Card/Card"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"

// Black Card
let QCard = {
  type: "Q",
  text: "Some Clever statement/question",
  id: 0
}

function DropCardSpace(props) {
  return (
    <div className="drop-space">
      <Card text= "empty"/>
      <Card cardType= "placeholder"/>
    </div>
  );
}

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
    id: 2
  },
  {
    type: "A",
    text: "milad",
    id: 3
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
        <DropCardSpace qcard = {QCard}/>
      </Top>
      <Bottom>
        <CardCarousel cards ={cards}/>
      </Bottom>
    </Screen>
  );
}

export default PlayerSelectionScreen;
