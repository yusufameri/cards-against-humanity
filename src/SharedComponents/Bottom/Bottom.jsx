import React from 'react'
import "./Bottom.css"

function Bottom(props) {
  return (
    <div className="bottom">
      <div className="inner">
        {props.children}
      </div>
    </div>
  );
}

export default Bottom;