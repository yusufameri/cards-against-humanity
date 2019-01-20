import React from 'react'
import "./PlayerList.css"

PlayerList(props) {
  return (
    <div className={`${props.className}`}>
      <ol>
        { props.players.map((player => <li>{player}</li>)) }
        <li><input type="text" className="enterName" placeholder="Enter Name Here"/></li>
      </ol>
    </div>
  );
}

export default PlayerList;
