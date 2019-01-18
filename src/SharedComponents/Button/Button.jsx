import React from 'react'
import "./Button.css"

function Button(props) {
  // let extraClasses = `${props.extraClasses} menuButton`;
  return (
    <div className={`menuButton ${props.className}`}>
      {props.text}
    </div>
  );
}

export default Button;
