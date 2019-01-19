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
  text: "TSA guidelines now prohibit _ on airplanes.",
  id: 0
}

// Mocking cards data to demo usage in props...
let cards = [
  {
    type: "A",
    text: "A disappointing birthday party.",
    id: 1
  },
  {
    type: "A",
    text: "Steven Hawking talking dirty.",
    id: 2
  },
  {
    type: "A",
    text: "Crippling debt.",
    id: 3
  }
];

let playerChoice = cards[2];

function Status(props) {
  return (
    <div className={`statusModal center ${props.className}`}>
      <p>{props.message}</p>
    </div>
  );
}

function PlayerSelectionScreen() {
  return (
    <Screen>
      <Top>
        <HeaderMenu text="Yusuf is the Judge" timeLeft={49}/>
        <DropCardSpace QCard = {QCard} playerChoice = {playerChoice} status="Waiting for 2/5 Players"/>
      </Top>
      <Bottom>
        <Status message = "Choose 1 Card"/>
        <CardCarousel cards = {cards}/>
        <Footer>
          Invite your friends with Party Code: abc123
        </Footer>
      </Bottom>
    </Screen>
  );
}

export default PlayerSelectionScreen;
