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

    // roundRole: player
    // roundState:
    //    player-selecting -> player-waiting -> judge-selecting -> showing-winner -> [player-selecting | judge-selecting]
    // 
    // roundRole: judge
    // roundState
    //    judge-waiting -> judge-selecting -> showing-winner -> [player-selecting]

    this.state = {
      roundState: "judge-waiting",  //type=Enum player-selecting | player-viewing | judge-selecting |
      roundRole: "judge", // type=Enum player | judge
      roundJudge: "Yusuf",
      playerChoice: null, // type=Card
      winningCard: null, // type=Card
      roundNum: null, // type=Number
      cardsIn: 2, //type=Number
      totalPlayers: 5, //type=Number
      timeLeft: 60, //type=Number @meta: time in seconds left, for the round
      directions: "Waiting for other Players", //type=String if(player-viewing) -> 'Yusuf is selecting the Card'
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
      otherPlayerCards: [
        {
          type: "A",
          text: "(Salmans Card)",
          id: 0,
          cardOwner: "Salman", // or playerUID,
          hidden: true
        },
        {
          type: "A",
          text: "(Reza's Card)",
          id: 1,
          cardOwner: "Reza", // or playerUID,
          hidden: true
        },
        {
          type: "A",
          text: "(Mostafas Card)",
          id: 2,
          cardOwner: "Mostafa", // or playerUID,
          hidden: true
        }
      ]
    }
  }

  componentDidMount() {
    console.log("PlayerSelectionScreen: componentDidMount()")
    let timer = setTimeout(() => {
      this.setState({
        roundState: 'judge-selecting',
        directions: `Choose your favorite card`
      });
    }, 5000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    console.log("PlayerSelectionScreen: componentWillUnmount()")
    clearTimeout(this.state.timer);
  }

  animateWinner() {
    console.log("Showing winner");
    document.getElementById('top').style.height = '100%';
    document.getElementById('bottom').style.display = 'none;';
    this.setState({ roundState: "viewing-winner" });
  }

  restoreScreen() {
    console.log("restoring screen");
    document.getElementById('top').style.height = '55%';
    this.setState({ roundState: "player-selecting" });
  }

  // choosing card logic (drag-and-drop)
  onDragEnd = result => {
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
      // if judge-selecting, goto animate winner, else goto player-waiting
      if (this.state.roundState === 'judge-selecting') {
        let winnerCard = this.state.otherPlayerCards[source.index];
        console.log(`winner chose card: ${JSON.stringify(winnerCard)}`);
        this.animateWinner();
      }
      else {
        // player-selecting
        console.log("player chose a card!")
        let newCards = [...this.state.cards];
        newCards.splice(source.index, 1);
        this.setState({
          playerChoice: this.state.cards[source.index],
          cards: newCards,
          roundState: 'player-waiting',
          cardsIn: this.state.cardsIn + 1,
          directions: "Wait for other Players"
        })
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
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <Top>
            <HeaderMenu
              text={this.state.roundRole === "judge" ? "You are the Judge" : `${this.state.roundJudge} is the Judge`}
              timeLeft={this.state.timeLeft}
            />
            <DropCardSpace
              QCard={this.state.QCard}
              playerChoice={this.state.playerChoice}
              status={`${this.state.cardsIn}/${this.state.totalPlayers} Cards In`}
              roundState={this.state.roundState}
              roundRole={this.state.roundRole}
            />
          </Top>
          <Bottom>
            <Status message={this.state.directions} />
            <CardCarousel cards={this.state.roundState === 'judge-selecting' ? this.state.otherPlayerCards : this.state.cards} />
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
