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

import { joinParty } from "../../api"
import { getPartyPlayers, } from "../../api"


class StartGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      joined: false,
      currentPlayerName: ""
    }

    this.joinParty = this.joinParty.bind(this)
    this.updatePlayerName = this.updatePlayerName.bind(this)
  }

  componentDidMount() {
    getPartyPlayers({ partyCode: this.props.match.params.partyCode }, players => {
      console.log(`got new players! ${players}`)
      this.setState({ players })
    });
  }

  joinParty() {
    // TODO: mock calling backend api to join the party...
    // adds player to the <PlayerList/>
    if (!this.state.joined) {
      joinParty({ name: this.state.currentPlayerName, partyCode: this.props.match.params.partyCode }, (err, data) => {
        this.setState((state) => ({
          joined: true
        }));
      });
      }
    }

    // REFACTOR: need to pass this to the PlayerList Component 
    // to retrieve the user input (nested)
    updatePlayerName(e) {
      this.setState({
        currentPlayerName: e.target.value
      });
    }

    Button() {
      if (!this.state.joined) {
        return <Button text="Join Party" className="center" disabled={this.state.currentPlayerName.length === 0} onClick={this.joinParty} />;
      }
      else {
        return <Button text="Start Game" className="center" disabled={this.state.players.length < 3} link={`/gameplay/${this.props.match.params.partyCode}`} />;
      }
    }

    render() {
      return (
        <Screen>
          <Top>
            <Card cardType="Link" link={this.props.match.params.partyCode} />
          </Top>
          <Bottom>
            <Title text="Players Joined" />
            <PlayerList players={this.state.players} joined={this.state.joined} className="center" onChange={this.updatePlayerName} />
            {this.Button()}
            <Footer>
              {this.state.players.length < 3 ? "Need at least 3 players to start game" : "Ready to start Game!"}
            </Footer>
          </Bottom>
        </Screen>
      );
    }
  }

  export default StartGameScreen;
