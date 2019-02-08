import React from 'react'
import "./Card.css"

// external imports
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd"

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
        <h3>Cardi</h3>
        <h3>Party</h3>
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
      <Draggable draggableId={`${props.id}`} index={props.index}>
        {
          (provider) => (
            <div
              className={`card A ${props.className}`}
              {...provider.draggableProps}
              {...provider.dragHandleProps}
              ref={provider.innerRef}
            >
              <p>{props.text}</p>
            </div>
          )
        }
      </Draggable>
    );
  }
}

export default Card;
