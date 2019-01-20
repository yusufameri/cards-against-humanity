import React from 'react'
import "./Status.css"

function Status(props) {
  return (
    <div className={`statusModal center ${props.className}`}>
      {props.message}
    </div>
  );
}

export default Status;
