import React from 'react'
import "./Button.css"
import { Link } from "react-router-dom";

function Button(props) {
  // disabled btn
  if (props.disabled) {
    return (
      <button type="button" className={`menuButton disabled ${props.className}`}>
        {props.text}
      </button>
    );
  }
  // link btn
  if (props.link) {
    console.log(`btn link`);
    return (
      <Link to={props.link ? props.link : "/404"} className={`${props.className}`}>
        <button type="button" className={`menuButton ${props.className}`}>
          {props.text}
        </button>
      </Link>
    );
  }
  // onClick btn
  else if (props.onClick) {
    console.log(`btn click`);
    return (
      <button type="button" className={`menuButton ${props.className}`} onClick={props.onClick}>
        {props.text}
      </button>
    );
  }
}

export default Button;
