import React from 'react'
import "./Bottom.css"

function Bottom(props) {
  return (
    <div className="bottom" id="bottom">
      {props.children}
    </div>
  );
}

export default Bottom;
