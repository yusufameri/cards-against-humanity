import React from 'react'
import "./Button.css"

function Button(props) {
  let extraClasses = `${props.extraClasses} menuButton`;
  return (
    
    <div className={extraClasses}>
      {props.text}
    </div>
  );
}

export default Button;
