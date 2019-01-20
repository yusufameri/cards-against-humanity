import React from 'react'
import "./Button.css"
// Routing
import {Link} from "react-router-dom";

function Button(props) {
  return (
    <Link to={props.link ? props.link : "/404"} className={`${props.className}`}>
      <button type="button" className={`menuButton`}>
          {props.text}
      </button>
    </Link>
  );
}

export default Button;
