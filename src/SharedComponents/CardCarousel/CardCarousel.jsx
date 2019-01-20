import React from 'react'
import "./CardCarousel.css"
import Card from "../Card/Card"

function CardCarousel(props) {
  return (
    <div className="scrolling-wrapper">
      {
        props.cards.map((card) => <Card {...card} key={card.id} onClick={props.onClick}/>)
      }
    </div>
  );
}

export default CardCarousel;
