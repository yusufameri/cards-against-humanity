import React from 'react'
import Card from "../Card/Card"
import "./DropCardSpace.css"

function DropCardSpace(props) {
  return (
    <div className="drop-space">
      <Card {...props.QCard} status={props.status}/>
      {(props.playerChoice && <Card {...props.playerChoice}/>) || <Card cardType= "placeholder"/>}
    </div>
  );
}

export default DropCardSpace;
