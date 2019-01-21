import React from 'react'
import "./Card.css"
import {Link} from "react-router-dom";

function Card(props) {
  if (props.cardType === "Q") {
    return (
      <div>
        <div className={`card Q ${props.className}`}>
          <p>{props.text.replace("_", "__________")}</p>
        </div>
        {
          props.status && 
          <div className={`status ${props.className}`}>
            <span>{props.status}</span>
          </div>
        }
      </div>
    );
  }
  else if (props.cardType === "Title") {
    return (
      <div className={`card Title ${props.className}`}>
        <h3>Cards</h3> 
        <h3>Against</h3>
        <h3>Humanity</h3>
      </div>
    );
  }
  else if (props.cardType === "placeholder") {
    return (
      <div className={`card placeholder ${props.className}`}>
        Drop Card Here
      </div>
    );
  }
  else if (props.cardType === "Link") {
    return (
      <div className={`card Title Link ${props.className}`}>
        <h3>Invite</h3>
        <h3>Friends</h3>
        <h3>with party code:</h3>
        <h6 className="link">
          <Link to={props.link}>
            {`${props.link}`}
          </Link>
        </h6>
      </div>
    )
  }
  else {
    return (
      <div className={`card A ${props.className}`} onClick={props.onClick && ((e) => props.onClick(props.id))}>
        <p>{props.text}</p>
      </div>
    );
  }
}

export default Card;
