import React from 'react'
import "./Footer.css"

function Footer(props) {
  return (
    <div className="footer">
      {props.children}
    </div>
  );
}

export default Footer;
