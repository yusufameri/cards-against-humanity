import React from 'react'
import "./Top.css"

function Top(props) {
  return (
    <div className="top">
      {props.children}
  </div>
  );
}

export default Top;
