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
import { getPlayerRoundState, newGameState, playCard, judgeSelectCard, endRound } from "../../api"

class PlayerSelectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.restoreScreen = this.restoreScreen.bind(this);

    // roundRole: player
    // roundState:
    //    player-selecting -> player-waiting -> judge-selecting -> [player-selecting | judge-selecting]
    // 
    // roundRole: judge
    // roundState
    //    judge-waiting -> judge-selecting -> [player-selecting]

    this.state = {
      // get these on getRoundState
      roundState: "judge-selecting",  //type=Enum player-selecting | player-viewing | judge-selecting |
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
    }
  }

  componentDidMount() {
    console.log("PlayerSelectionScreen: componentDidMount()")
    let partyCode = this.props.match.params.partyCode
    let newState = (roundState) => {
      console.log(`${new Date().getMinutes()}:${new Date().getSeconds()}`)
      console.log('RoundState:', roundState)
      let headerText = ''
      let directions = ''
      if (roundState.roundState === 'viewing-winner') {
        headerText = `${roundState.winner} Won!`
        directions = '';
      }
      else if (roundState.roundRole === 'judge') {
        headerText = `You are the Judge`
        if (roundState.roundState === 'judge-waiting') directions = 'Waiting for players to choose Cards';
        else if (roundState.roundState === 'judge-selecting') directions = 'Choose your favorite card';
      }
      else {
        headerText = `${roundState.roundJudge} is the Judge`
        if (roundState.roundState === 'player-selecting') directions = 'Choose one Card';
        else if (roundState.roundState === 'player-waiting') directions = 'Waiting for other players';
        else if (roundState.roundState === 'judge-selecting') directions = `${roundState.roundJudge} is choosing their favorite`
      }

      this.setState({
        QCard: roundState.QCard[0],
        cards: roundState.cards,
        otherPlayerCards: roundState.otherPlayerCards,
        roundNum: roundState.roundNum,
        roundRole: roundState.roundRole,
        roundJudge: roundState.roundJudge,
        headerText,
        roundState: roundState.roundState,
        winner: roundState.winner,
        winningCard: roundState.winningCard,
        timeLeft: roundState.timeLeft,
        directions
      });
    };

    // clearInterval(this.state.ticker);
    // TODO: fix/figure out where to place this count-down interval...
    // var ticker = setInterval(() => {
    //   if (this.state.timeLeft <= 0) {
    //     console.log('clearing interval timeout!', ticker)
    //     clearInterval(ticker)
    //     fetchNewGameState(partyCode)
    //   }
    //   else {
    //     this.setState({
    //       timeLeft: this.state.timeLeft - 1,
    //       ticker
    //     });
    //   }
    // }, 1000);

    getPlayerRoundState(partyCode, newState);
    newGameState(partyCode); // subscribe to newGameState
  }

  componentWillUnmount() {
    console.log("PlayerSelectionScreen: componentWillUnmount()")
    clearInterval(this.state.ticker);
  }

  // called after viewing-winner, resets state and gets new state from server. Begins new round
  restoreScreen() {
    let partyCode = this.props.match.params.partyCode
    endRound(partyCode);
    console.log("restoring screen");
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
      // TODO: call api to shuffle cards
    }
    else if (source.droppableId === "bottom" && destination.droppableId === "top" && this.state.playerChoice == null) {
      if (this.state.roundState === 'judge-selecting' && this.state.roundRole === 'judge') {
        // judge-selecting card
        console.log(`winner card chosen: ${JSON.stringify(this.state.otherPlayerCards[source.index])}`);
        let partyCode = this.props.match.params.partyCode
        judgeSelectCard(partyCode, this.state.otherPlayerCards[source.index].id);
      }
      else {
        // player-selecting card
        console.log("player chose a card!");
        let partyCode = this.props.match.params.partyCode
        playCard(partyCode, this.state.cards[source.index].id)
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
          <Top className={this.state.roundState === 'viewing-winner' ? 'winner' : ''}>
            <HeaderMenu
              text={this.state.headerText}
              timeLeft={this.state.timeLeft}
            />
            <DropCardSpace
              QCard={this.state.QCard}
              playerChoice={this.state.roundState === 'viewing-winner' ? this.state.winningCard : this.state.playerChoice}
              cardsIn={this.state.otherPlayerCards.length}
              roundState={this.state.roundState}
              roundRole={this.state.roundRole}
            />
            <div className={this.state.roundState === 'viewing-winner' ? 'continueMsg' : ''} id="continueMsg" onClick={this.restoreScreen}>
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
