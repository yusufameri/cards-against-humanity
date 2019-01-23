import React from 'react'
import "./CardCarousel.css"
import Card from "../Card/Card"

import { Droppable } from "react-beautiful-dnd";

function CardCarousel(props) {
  return (
    <Droppable droppableId={'bottom'} direction="horizontal">
      {
        (provider) => (
          <div
            ref={provider.innerRef}
            {...provider.droppableProps}
            className="scrolling-wrapper"
          >
            {props.cards.map((card, index) => <Card {...card} key={card.id} index={index} />)}
            {provider.placeholder}
          </div >
        )
      }
    </Droppable>
  );
}

export default CardCarousel;
