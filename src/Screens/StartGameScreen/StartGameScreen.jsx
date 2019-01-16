import React from 'react'
import "./StartGameScreen.css"

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import Title from "../../SharedComponents/Title/Title"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Card from "../../SharedComponents/Card/Card"
import Button from "../../SharedComponents/Button/Button"

let players = [
  "Yusuf",
  "Salman",
  "Joseph",
  "Sal",
  "Albert"
]

function PlayerList(props) {
  return (
    <div className={`playerList ${props.className}`}>
      <ol>
        { props.players.map((player => <li>{player}</li>)) }
        <li><input type="text" className="enterName" placeholder="Enter Name Here"/></li>
      </ol>
    </div>
  );
}

function Footer(props) {
  let message;
  if(props.players.length < 3) {
    message = <h5>Need at least 3 players to Join</h5>
  } 
  else {
    message = <h5>Ready to start Game!</h5>
  }

  return (
    <div className="footer">
      { message }
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
          <Footer players={players}/>
        </Bottom>
      </Screen>
    );
}

export default StartGameScreen;
