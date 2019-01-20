import React from 'react'

import Screen from "../../components/Screen/Screen"
import Top from "../../components/Top/Top"
import Title from "../../components/Title/Title"
import Bottom from "../../components/Bottom/Bottom"
import Card from "../../components/Card/Card"
import Button from "../../components/Button/Button"
import Footer from "../../components/Footer/Footer"
import PlayerList from "../../components/PlayerList/PlayerList"
import "./StartGameScreen.css"


class StartGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: ["Yusuf"]
    }
  }
  
  render() {
    return (
      <Screen>
        <Top>
          <Card cardType="Link" link={this.props.match.params.partyCode} />
        </Top>
        <Bottom>
          <Title text="Players Joined"/>
          <PlayerList players={this.state.players} className="center"/>
          <Button text = "Join Party" className="center" />
          <Footer> 
            {this.state.players.length < 3 ? "Need at least 3 players to Join" : "Ready to start Game!"}
          </Footer>
        </Bottom>
      </Screen>
    );
  }
}

export default StartGameScreen;
