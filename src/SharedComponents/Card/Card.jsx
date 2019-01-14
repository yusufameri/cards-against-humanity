import React from 'react'
import "./Card.css"

function Card(props) {
  if(props.cardType === "Q") {
    props.text.replace("_", "_____________");
  }

  if(props.cardType === "Title") {
    return (
      <div className={`card Title`}>
        <h3>Cards</h3>
        <h3>Against</h3>
        <h3>Humanity</h3>
      </div>
    );
  }

  else if(props.cardType === "Link") {
    return (
      <div className={`card Title Link`}>
        <h3>Invite</h3>
        <h3>Friends</h3>
        <h3>with Link</h3>
        <h6 className="link">
          <a href={`cardiparty.com/${props.link}`}>
            {`cardiparty.com/${props.link}`}
          </a>
        </h6>
      </div>
    )
  }

  else {
    return (
      <div className={"card A"}>
        <p>{props.text}</p>
      </div>
    );
  }
}

export default Card;
