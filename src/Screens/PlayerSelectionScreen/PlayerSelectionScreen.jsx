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
import { DragDropContext } from "react-beautiful-dnd";

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
      roundPlayerRole: "player", // player | judge
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
    // let timerIntervalID = setInterval(() => {
    //   if (this.state.timeLeft < 1) {
    //     // this.animateWinner()
    //     this.setState({ timeLeft: 60 });
    //   }
    //   // else if(this.state.timeLeft % 3 === 0) {
    //   //   this.animateWinner();
    //   // }
    //   // else if(this.state.timeLeft % 7 === 0) {
    //   //   // this.restoreScreen();
    //   // }
    //   this.setState((state, props) => ({
    //     timeLeft: state.timeLeft - 1
    //   }));
    // }, 1000);

    // this.setState({ timerIntervalID });
  }

  componentWillUnmount() {
    console.log("PlayerSelectionScreen: componentWillUnmount()")
    clearInterval(this.state.timerIntervalID);
  }

  // Choose the card with given ID to be in the placeholder (DropcCardSpace),
  // if a card is already choosen and we chooseCard again, then the card is swapped.
  chooseCard(id) {
    console.log(`${id} was clicked!`);

    let newCards = this.state.cards;
    if (this.state.playerChoice) {
      newCards.unshift(this.state.playerChoice)
    }
    let newPlayerChoice = _.find(newCards, card => { return card.id === id });
    _.remove(newCards, (card) => {
      return card.id === id
    });

    this.setState({
      playerChoice: newPlayerChoice,
      cards: newCards
    });
  }

  animateWinner() {
    console.log("Showing winner");
    document.getElementById('top').style.height = '100%';
    this.setState({ roundType: "viewing-winner" });
  }

  restoreScreen() {
    console.log("restoring screen");
    document.getElementById('top').style.height = '55%';
    this.setState({ roundType: "player-selecting" });
  }


  onDragEnd = result => {
    const { destination, source } = result;
    console.log(result);

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // shift cards in correct order @ CardCarousel
      console.log("swapping!")
      let newCards = Array.from(this.state.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, this.state.cards[source.index])
      this.setState({ cards: newCards })
    }
    else if (source.droppableId === "bottom" && destination.droppableId === "top") {
      // TODO: swapping from current cards, into placeholder
    }
  }

  render() {
    return (
      <Screen>
        <DragDropContext onDragEnd={this.onDragEnd} >
          <Top>
            <HeaderMenu text="Yusuf is the Judge" timeLeft={this.state.timeLeft} />
            <DropCardSpace QCard={this.state.QCard} playerChoice={this.state.playerChoice} status="Waiting for 2/5 Players" />
          </Top>
          <Bottom>
            <Status message="Choose 1 Card" />
            <CardCarousel cards={this.state.cards} />
            <Footer>
              Invite your friends with Party Code: {this.props.match.params.partyCode}
            </Footer>
          </Bottom >
        </DragDropContext >
      </Screen >
    );
  }
}

export default PlayerSelectionScreen;
