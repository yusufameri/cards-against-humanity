import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card"
import "./DropCardSpace.css"

// Draggable player IFF
// player-selecting & player  (show status)
// judge-selecting % judge    (don't show status)

// --> Draggable
// Not Draggable IFF
// player-waiting & player    (show status)
// judge-selecting & player   (don't show status)
// judge-waiting & judge    (show status)
function DropCardSpace(props) {
  let status = (props.cardsIn > 0 && props.roundState !== 'viewing-winner') ? `${props.cardsIn} Cards In` : ""
  // draggable
  if ((props.roundRole === 'player' && props.roundState === 'player-selecting') ||
    (props.roundRole === 'judge' && props.roundState === 'judge-selecting') ||
    (props.roundState === 'viewing-winner')) {
    return (
      <div className="drop-space">
        <Card {...props.QCard} status={props.roundState !== 'judge-selecting' && status} />
        <Droppable droppableId='top' direction="horizontal">
          {
            (provider) => (
              <div
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {(props.playerChoice && <Card {...props.playerChoice} index={0} />) || <Card cardType="placeholder" />}
                {provider.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
    );
  }
  // not draggable
  else if ((props.roundRole === 'player' && props.roundState === 'judge-selecting') ||
    (props.roundRole === 'player' && props.roundState === 'player-waiting') ||
    (props.roundRole === 'judge' && props.roundState === 'judge-waiting')) {
    return (
      <div className="drop-space">
        <Card {...props.QCard} status={props.roundState !== 'judge-selecting' && status} />
      </div>
    );
  }
  // unknown combo of roundStand and roundRole
  else {
    return (`invalid combination of roundState(${props.roundState}) and roundRole(${props.roundRole})`)
  }
}

export default DropCardSpace;
