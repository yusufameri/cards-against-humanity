import React from 'react'
import "./PlayerList.css"

function PlayerList(props) {
  return (
    <div className={`${props.className}`}>
      <ol>
        { props.players.map(((player,index) => <li key={index}>{player}</li>)) }
        { !props.joined && <li><input type="text" className="enterName" placeholder="Enter Name Here" id="playerName" onChange={props.onChange}/></li>}
      </ol>
    </div>
  )
}

export default PlayerList;
