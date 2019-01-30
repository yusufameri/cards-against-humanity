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
import { DragDropContext } from "react-beautiful-dnd";

class PlayerSelectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.restoreScreen = this.restoreScreen.bind(this);
    this.animateWinner = this.animateWinner.bind(this);

    // roundRole: player
    // roundState:
    //    player-selecting -> player-waiting -> judge-selecting -> showing-winner -> [player-selecting | judge-selecting]
    // 
    // roundRole: judge
    // roundState
    //    judge-waiting -> judge-selecting -> showing-winner -> [player-selecting]

    this.state = {
      // get these on getRoundState
      roundState: "judge-waiting",  //type=Enum player-selecting | player-viewing | judge-selecting |
      roundRole: "judge", // type=Enum player | judge
      roundJudge: "Yusuf",
      roundNum: null, // type=Number
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
      ],

      // these should be set implicitely based on above state
      directions: "Waiting for other Players", //type=String if(player-viewing) -> 'Yusuf is selecting the Card'
      headerText: "You are the Judge",

      // this is set when user selects a card
      playerChoice: null, // type=Card

      // these are set for everyone as everyone is selecting their own cards
      otherPlayerCards: [
        {
          type: "A",
          text: "(Salmans Card)",
          id: 10,
          cardOwner: "Salman"
        },
        {
          type: "A",
          text: "(Reza's Card)",
          id: 11,
          cardOwner: "Reza"
        },
        {
          type: "A",
          text: "(Mostafas Card)",
          id: 12,
          cardOwner: "Mostafa"
        }
      ],

      // this is set when judge selects a card
      winningCard: null, // type=Card

      // this is set implcitely
      cardsIn: 1, //type=Number
      totalPlayers: 5, //type=Number

      // temporarily turning this feature off
      // timeLeft: 60, //type=Number @meta: time in seconds left, for the round
    }
  }

  componentDidMount() {
    console.log("PlayerSelectionScreen: componentDidMount()")
    let timer = setTimeout(() => {
      this.setState({
        roundState: 'judge-selecting',
        directions: `Select your favorite card` // ${this.state.roundJudge} is viewing the cards
      });
    }, 5000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    console.log("PlayerSelectionScreen: componentWillUnmount()")
    clearTimeout(this.state.timer);
  }

  // called after judge selects their favorite card
  animateWinner() {
    console.log("Showing winner");
    document.getElementById('top').style.height = '100%';
    document.getElementById('continueMsg').style.display = 'block';
  }

  // called after viewing-winner, resets state and gets new state from server. Begins new round
  restoreScreen() {
    console.log("restoring screen");
    document.getElementById('top').style.height = '55%';
    document.getElementById('continueMsg').style.display = 'none';
    // ask server to get the new state for the current player in this.state.roundNum + 1
    // need:
    // roundRole (player | judge)
    // roundState (player-selecting | judge-waiting)
    // roundJudge

    // reset
    // playerChoice = null
    // winningCard = null
    this.setState({
      roundState: "player-selecting",
      roundRole: "player",
      directions: "Choose 1 Card",
      headerText: "Reza is the Judge",
      playerChoice: null,
      winningCard: null,
      roundNum: 2,
      cardsIn: 0,
      QCard: {
        id: 459,
        text: "_?  There's an app for that.",
        cardType: "Q"
      }
    });
  }

  // choosing card logic (drag-and-drop)
  chooseCardHandler = result => {
    const { destination, source } = result;
    // console.log(result);

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // shift/move cards in correct order @ CardCarousel
      console.log("swapping!")
      let newCards = [...this.state.cards]
      newCards.splice(source.index, 1)
      newCards.splice(destination.index, 0, this.state.cards[source.index])
      this.setState({ cards: newCards })
    }
    else if (source.droppableId === "bottom" && destination.droppableId === "top" && this.state.playerChoice == null) {
      if (this.state.roundState === 'judge-selecting' && this.state.roundRole === 'judge') {
        // judge-selecting card
        console.log(`winner card chosen: ${JSON.stringify(this.state.QCard)}`);
        let newCards = [...this.state.otherPlayerCards];
        newCards.splice(source.index, 1);
        let winnerCard = this.state.otherPlayerCards[source.index];
        this.setState({
          playerChoice: winnerCard,
          otherPlayerCards: newCards,
          roundState: 'viewing-winner',
          headerText: `${winnerCard.cardOwner} Won!`
        });

        this.animateWinner();
      }
      else {
        // player-selecting card
        console.log("player chose a card!");
        let newCards = [...this.state.cards];
        newCards.splice(source.index, 1);
        // TODO: tell server you choose a card
        this.setState({
          playerChoice: this.state.cards[source.index],
          cards: newCards,
          roundState: 'player-waiting',
          cardsIn: this.state.cardsIn + 1,
          directions: "Wait for other Players"
        });
      }
    }
  }

  // vibrate when dragging card
  onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    };
  }

  render() {
    return (
      <Screen>
        <DragDropContext onDragEnd={this.chooseCardHandler} onDragStart={this.onDragStart}>
          <Top>
            <HeaderMenu
              text={this.state.headerText}
              timeLeft={this.state.timeLeft}
            />
            <DropCardSpace
              QCard={this.state.QCard}
              playerChoice={this.state.playerChoice}
              cardsIn={this.state.cardsIn}
              roundState={this.state.roundState}
              roundRole={this.state.roundRole}
            />
            <div className="continueMsg" id="continueMsg" onClick={this.restoreScreen}>
              {this.state.roundState === 'viewing-winner' ? "Tap anywhere to Continue" : ""}
            </div>
          </Top>
          <Bottom>
            <Status message={this.state.directions} />
            <CardCarousel
              cards={
                this.state.roundState === 'judge-selecting' ? this.state.otherPlayerCards :
                  this.state.roundState === 'judge-waiting' ? [] : this.state.cards
              } />
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
