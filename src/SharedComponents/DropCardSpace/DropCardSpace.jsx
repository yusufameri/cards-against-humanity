import React from 'react'
import "./DropCardSpace.css"
import Card from "../Card/Card"

function DropCardSpace(props) {
  return (
    <div className="drop-space">
      <Card cardType= "placeholder"/>
      <Card {...props.QCard}/>
    </div>
  );
}

export default DropCardSpace;