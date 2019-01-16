import React from 'react'
import "./HomeScreen.css"

import Button from "../../SharedComponents/Button/Button"
import Top from "../../SharedComponents/Top/Top"
import Title from "../../SharedComponents/Title/Title"
import Card from "../../SharedComponents/Card/Card"
import Screen from "../../SharedComponents/Screen/Screen"
import Bottom from "../../SharedComponents/Bottom/Bottom"

function Or() {
  return (
    <div className="orDiv">
      <span className="orText">
        or
      </span>
    </div>
  );
}

function HomeScreen() {
  return (
    <Screen>
      <Top>
        <Card cardType="Title" text="Cards Against Humanity" />
      </Top>
      <Bottom>
          <Title text="A party game for horrible people"/>
          <Button text="Join Party" className="center"/>
          <Or />
          <Button text="Create Game" className="center"/>
          <div className="footer">
            Like us on <a href="http://www.facebook.com/yusufameri"> Facebook!</a>
          </div>
      </Bottom>
    </Screen>
  );
}

export default HomeScreen;
