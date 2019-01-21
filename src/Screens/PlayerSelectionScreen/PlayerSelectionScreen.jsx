import React from 'react'
import "./PlayerSelectionScreen.css"

// Import SharedComponents
import Screen from "../../components/Screen/Screen"
import Top from "../../components/Top/Top"
import HeaderMenu from "../../components/HeaderMenu/HeaderMenu"
import DropCardSpace from "../../components/DropCardSpace/DropCardSpace"
import Bottom from "../../components/Bottom/Bottom"
import CardCarousel from "../../components/CardCarousel/CardCarousel"
import Footer from "../../components/Footer/Footer"
import Status from "../../components/Status/Status"

// Import Helper Libraries
import _ from "lodash"

class PlayerSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    
    // populate the whole state via the socket/backend api

    // if player
    // 1 --> 5 --> 6
    // if judge
    // 3 --> 4 --> 6

    // roundType can be:
    // 1. player-selecting -- done
    //  This means its the players turn and they are selecting a car 
    // 3. judge-waiting
    //  Its the judges turn and they are waiting for the other players to turn in their cards (screen 7 in figma)
    // 4. judge-selecting
    //  This occurs when the round is over, and the judge goes through each card, 1 by 1 to select the funiest. The cards are hidden and
    // become revealed once the judge clicks on the white card (screen 8 on figma)
    // 5. player-viewing
    // This occurs simultaneously with (4), only the player is viewing and cannot do anything. Options are revealed whenever
    // the judge in (4) selects to reveal the cards. (screen 7 on figma)
    // 6. Winner-choosen
    // Everyone sees the same page, a winner is choose. Tapping anywhere to continue takes you to the next screen
    // Once at least half of the players have joined, the timer begins.
    this.state = {
      roundType: "player-selecting", // player-selecting | player-viewing | viewing-winner | 
      roundRole: "player", // player | judge
      roundJudge: "Yusuf",
      playerChoice: null,
      timeLeft: 60,
      QCard: {
        cardType: "Q",
        text: "TSA guidelines now prohibit _ on airplanes.",
        id: 25
      },
      cards: [
        {
          type: "A",
          text: "A disappointing birthday party.",
          id: 0
        },
        {
          type: "A",
          text: "The terrorists.",
          id: 1
        },
        {
          type: "A",
          text: "Steven Hawking talking dirty.",
          id: 2
        },
        {
          type: "A",
          text: "Asians who aren't good at math.",
          id: 3
        },
        {
          type: "A",
          text: "The Chinese gymnastics team.",
          id: 4
        },
        {
          type: "A",
          text: "Police brutality.",
          id: 5
        },
        {
          type: "A",
          text: "Hot people.",
          id: 6
        },
        {
          type: "A",
          text: "Kanye West.",
          id: 7
        },
        {
          type: "A",
          text: "The true meaning of Christmas.",
          id: 8
        },
        {
          type: "A",
          text: "An honest cop with nothing left to lose.",
          id: 9
        }
      ]
    }

    this.chooseCard = this.chooseCard.bind(this);
  }

  componentDidMount() {
    console.log("PlayerSelectionScreen: componentDidMount()")
    let intervalID = setInterval(() => {
      if(this.state.timeLeft < 1) {
        alert("times up!")
        this.setState({timeLeft: 60});
      }
      else {
        this.setState((state, props) => ({
          timeLeft: state.timeLeft - 1
        }));
      }
    }, 1000);

    this.setState({intervalID});
  }

  componentWillUnmount() {
    console.log("PlayerSelectionScreen: componentWillUnmount()")
    clearInterval(this.state.intervalID);
  }

  // Choose the card with given ID to be in the placeholder (DropcCardSpace),
  // if a card is already choosen and we chooseCard again, then the card is swapped.
  chooseCard(id) {
    console.log(`${id} was clicked!`);
    
    let newCards = this.state.cards;
    if(this.state.playerChoice) {
      newCards.unshift(this.state.playerChoice)
    }
    // console.log(`newCards = ${newCards.map(c => c.id)}`)

    // remove the card we just selected
    let newPlayerChoice = _.find(newCards, card => { return card.id === id });
    // console.log(`new playerChoice = ${newPlayerChoice}`)
    
    _.remove(newCards, (card) => {
      return card.id === id
    });
    // console.log(`removing card with id: ${id}`)
    // console.log(`newCards after removal = ${newCards.map(c => c.id)}`)

    this.setState({
      playerChoice: newPlayerChoice,
      cards: newCards
    });
  }

  animateWinner() {
    
  }

  restoreScreen() {
    
  }
  
  render() {
    return (
      <Screen>
        <Top>
          <HeaderMenu text="Yusuf is the Judge" timeLeft={this.state.timeLeft} />
          <DropCardSpace QCard={this.state.QCard} playerChoice={this.state.playerChoice} status="Waiting for 2/5 Players" />
        </Top>
        <Bottom>
          <Status message="Choose 1 Card" />
          <CardCarousel cards={this.state.cards} onClick={this.chooseCard}/>
          <Footer>
            Invite your friends with Party Code: {this.props.match.params.partyCode}
          </Footer>
        </Bottom>
      </Screen>
    );
  }
}

export default PlayerSelectionScreen;
