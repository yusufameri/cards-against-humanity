import React from 'react'
import "./Card.css"

function Card(props) {
  let cardType = "card "+ props.cardType;
  if(props.cardType === "Q") {
    props.text.replace("_", "_____________");
  }

  if(props.cardType === "Title") {
    return (
      <div className={cardType}>
        <h3>Cards</h3>
        <h3>Against</h3>
        <h3>Humanity</h3>
      </div>
    );
  }

  return (
    <div className={cardType}>
      <p>{props.text}</p>
    </div>
  );
}

export default Card;
