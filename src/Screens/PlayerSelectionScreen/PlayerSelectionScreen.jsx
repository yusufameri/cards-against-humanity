import React from 'react'
import "./PlayerSelectionScreen.css"

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import HeaderMenu from "../../SharedComponents/HeaderMenu/HeaderMenu"
import DropCardSpace from "../../SharedComponents/DropCardSpace/DropCardSpace"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Footer from "../../SharedComponents/Footer/Footer"
import CardCarousel from "../../SharedComponents/CardCarousel/CardCarousel"

// Black Card
let QCard = {
  cardType: "Q",
  text: "Some Funny Statement ____________",
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

function Status(props) {
  return (
    <div className={`statusModal ${props.className}`}>
      <p>{props.message}</p>
    </div>
  );
}

function PlayerSelectionScreen() {
  return (
    <Screen>
      <Top>
        <HeaderMenu text="Yusuf is the Judge" timeLeft={49}/>
        <DropCardSpace QCard = {QCard} playerChoice = {cards[0]} status="Waiting for 2/5 Players"/>
      </Top>
      <Bottom>
        <Status message = "Waiting for other Players" className="center"/>
        <CardCarousel cards = {cards}/>
        <Footer>
          Invite your friends with Party Code: abc123
        </Footer>
      </Bottom>
    </Screen>
  );
}

export default PlayerSelectionScreen;
