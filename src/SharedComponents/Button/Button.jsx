import React from 'react'
import "./Button.css"

function Button(props) {
  return (
    <div className="menuButton">
      {props.text}
    </div>
  );
}

export default Button;
