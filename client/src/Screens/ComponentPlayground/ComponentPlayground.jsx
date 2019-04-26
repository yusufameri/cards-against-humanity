import React from 'react'
import "./ComponentPlayground.css"
// import Card from "../../components/Card/Card";
import Screen from '../../components/Screen/Screen'
import Top from '../../components/Top/Top'
import Bottom from '../../components/Bottom/Bottom'
import Footer from '../../components/Footer/Footer'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import DropCardSpace from '../../components/DropCardSpace/DropCardSpace'
import Status from '../../components/Status/Status'
import CardCarousel from '../../components/CardCarousel/CardCarousel'

// dnd
import { DragDropContext } from "react-beautiful-dnd";


class ComponentPlayground extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      QCard: {
        "id": 459,
        "cardType": "Q",
        "text": "_?  There's an app for that.",
        "numAnswers": 1,
        "expansion": "Base"
      },
      // roundRole: player
      // roundState:
      //    player-selecting -> player-waiting -> judge-selecting -> viewing-winner -> [player-selecting | judge-selecting]
      // 
      // roundRole: judge
      // roundState
      //    judge-waiting -> judge-selecting -> viewing-winner -> [player-selecting]
      roundState: "player-selecting",
      roundRole: "player",

      playerChoice: null,
      cards: [
        {
          "id": 549,
          "cardType": "A",
          "text": "A big black dick.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 550,
          "cardType": "A",
          "text": "A beached whale.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 551,
          "cardType": "A",
          "text": "A bloody pacifier.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 552,
          "cardType": "A",
          "text": "A crappy little hand.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
      ],
      otherPlayerCards: [
        {
          "id": 553,
          "cardType": "A",
          "text": "A low standard of living.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 554,
          "cardType": "A",
          "text": "A nuanced critique.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 555,
          "cardType": "A",
          "text": "Panty raids.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 556,
          "cardType": "A",
          "text": "A passionate Latino lover.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
        {
          "id": 557,
          "cardType": "A",
          "text": "A rival dojo.",
          "numAnswers": 0,
          "expansion": "CAHe1"
        },
      ]
    }
  }

  restoreScreen = () => console.log('restoring screen');

  // choosing card logic (drag-and-drop)
  chooseCardHandler = result => {
    const { destination, source } = result;
    // console.log(result);

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // shift/move cards in correct order @ CardCarousel
      console.log("swapping!")
      let newCardOrder = [...this.state.cards]
      newCardOrder.splice(source.index, 1)
      newCardOrder.splice(destination.index, 0, this.state.cards[source.index])
      this.setState({cards: newCardOrder});
      console.log(this.state.cards)
      // let partyCode = this.props.match.params.partyCode
      // shuffleCards(partyCode, source.index, destination.index)
    }
    else if (source.droppableId === "bottom" && destination.droppableId === "top" && this.state.playerChoice == null) {
      if (this.state.roundState === 'judge-selecting' && this.state.roundRole === 'judge') {
        // judge-selecting card
        console.log(`winner card chosen: ${JSON.stringify(this.state.otherPlayerCards[source.index])}`);

        let playerChoice = this.state.cards[source.index];
        let newCardOrder = [...this.state.cards];
        newCardOrder.splice(source.index, 1);
        this.setState( {
          playerChoice,
          cards: newCardOrder
        })

        // let partyCode = this.props.match.params.partyCode
        // judgeSelectCard(partyCode, otherPlayerCards[source.index].id);
      }
      else {
        // player-selecting card
        console.log("player chose a card!");
        // let partyCode = this.props.match.params.partyCode
        // playCard(partyCode, cards[source.index].id)
      }
    }
  }

  // vibrate when dragging card
  onDragStart = () => {
    console.log("Drag started!")
    // if (window.navigator.vibrate) {
    //   window.navigator.vibrate(100);
    // };
  }

  render() {
    return (
      <Screen>
        <DragDropContext onDragEnd={this.chooseCardHandler} onDragStart={this.onDragStart}>
          <Top className={''}>
            <HeaderMenu
              text={"Some header text"}
              timeLeft={"24"}
            />
            <DropCardSpace
              QCard={this.state.QCard}
              playerChoice={this.state.playerChoice}
              cardsIn={1}
              roundState={this.state.roundState}
              roundRole={this.state.roundRole}
            />

            <div className={this.state.roundState === 'viewing-winner' ? 'continueMsg' : ''} id="continueMsg" onClick={this.restoreScreen}>
              {this.state.roundState === 'viewing-winner' ? "Tap anywhere to Continue" : ""}
            </div>
          </Top>
          <Bottom>
            <Status message={"Some directions"} />
            <CardCarousel
              cards={
                this.state.indexroundState === 'judge-selecting' ? this.state.otherPlayerCards :
                  this.state.roundState === 'judge-waiting' ? [] : this.state.cards
              } />
            <Footer>
              Share Link or Party Code: playground
          </Footer>
          </Bottom >
        </DragDropContext>
      </Screen >
    )
  }
}

export default ComponentPlayground;
