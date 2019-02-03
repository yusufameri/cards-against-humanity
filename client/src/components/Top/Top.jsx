import React from 'react'
import "./Top.css"

function Top(props) {
  return (
    <div className={`${props.className} top`} id="top">
      {props.children}
  </div>
  );
}

export default Top;
