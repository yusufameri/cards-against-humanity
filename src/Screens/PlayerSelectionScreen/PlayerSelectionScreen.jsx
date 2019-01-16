import React from 'react'
import "./PlayerSelectionScreen.css"

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import HeaderMenu from "../../SharedComponents/HeaderMenu/HeaderMenu"
import DropCardSpace from "../../SharedComponents/DropCardSpace/DropCardSpace"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import CardCarousel from "../../SharedComponents/CardCarousel/CardCarousel"

// Black Card
let QCard = {
  cardType: "Q",
  text: "Some Clever statement or question",
  id: 0
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

function PlayerSelectionScreen() {
  return (
    <Screen>
      <Top>
        <HeaderMenu text="Yusuf is the Judge" timeLeft={49}/>
        <DropCardSpace QCard = {QCard}/>
      </Top>
      <Bottom>
        <CardCarousel cards ={cards}/>
      </Bottom>
    </Screen>
  );
}

export default PlayerSelectionScreen;
