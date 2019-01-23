import React from 'react'
import Card from "../Card/Card"
import "./DropCardSpace.css"
import { Droppable } from "react-beautiful-dnd";

function DropCardSpace(props) {
  return (
    <div className="drop-space">
      <Card {...props.QCard} status={props.status} />
      <Droppable droppableId='top' direction="horizontal">
        {
          (provider) => (
            <div
              className=""
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

export default DropCardSpace;
