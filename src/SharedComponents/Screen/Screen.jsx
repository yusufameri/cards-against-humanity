import React from 'react'
import "./Screen.css"

function Screen(props) {
  return (
    <div className="screen">
      {props.children}
    </div>
  );
}


export default Screen;
