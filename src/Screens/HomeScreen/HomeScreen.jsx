import React from 'react'
import "./HomeScreen.css"

import Button from "../../SharedComponents/Button/Button"
import { TopHome } from './TopHome';

function Or() {
  return (
    <div className="orDiv">
      <span className="orText">
        or
      </span>
    </div>
  );
}

function BottomHome() {
  return (
    <div className="bottom">
      <div className="inner">
        <div className="title">
          <h1>A party game for horrible people</h1>
        </div>
        <Button text="Join Party"/>
        <Or />
        <Button text="Create Game"/>
      <div className="footer">
        Like and share us on <a href="http://www.facebook.com/yusufameri"> Facebook!</a>
      </div>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="screen">
      <TopHome />
      <BottomHome />
    </div>
  );
}

export default HomeScreen;
