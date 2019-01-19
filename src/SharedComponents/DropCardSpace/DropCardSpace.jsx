import React from 'react'
import "./DropCardSpace.css"
import Card from "../Card/Card"

function DropCardSpace(props) {
  return (
    <div className="drop-space">
      {props.playerChoice && <Card cardType= "placeholder"/>}
      <Card {...props.QCard} status={props.status}/>
    </div>
  );
}

export default DropCardSpace;
