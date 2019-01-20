import React from 'react'

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import Title from "../../SharedComponents/Title/Title"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Card from "../../SharedComponents/Card/Card"
import Button from "../../SharedComponents/Button/Button"
import Footer from "../../SharedComponents/Footer/Footer"
import "./StartGameScreen.css"

let players = [
  "Yusuf",
  "Salman",
  "Joseph",
  "Sal",
  "Albert"
]

function PlayerList(props) {
  return (
    <div className={`${props.className}`}>
      <ol>
        { props.players.map((player => <li>{player}</li>)) }
        <li><input type="text" className="enterName" placeholder="Enter Name Here"/></li>
      </ol>
    </div>
  );
}

function StartGameScreen() {
    return (
      <Screen>
        <Top>
          <Card cardType="Link" link="abc123" />
        </Top>
        <Bottom>
          <Title text="Players Joined"/>
          <PlayerList players={players} className="center"/>
          <Button text = "Join Party" className="center" />
          <Footer> 
            {players.length < 3 ? "Need at least 3 players to Join" : "Ready to start Game!"}
          </Footer>
        </Bottom>
      </Screen>
    );
}

export default StartGameScreen;
