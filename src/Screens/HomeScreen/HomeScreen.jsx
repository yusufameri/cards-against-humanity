import React from 'react'

import Button from "../../components/Button/Button"
import Top from "../../components/Top/Top"
import Title from "../../components/Title/Title"
import Card from "../../components/Card/Card"
import Screen from "../../components/Screen/Screen"
import Bottom from "../../components/Bottom/Bottom"
import Footer from "../../components/Footer/Footer"
import "./HomeScreen.css"

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
        <Button text="Join Party" className="center" link="/join-party"/>
        <Or />
        <Button text="Create Game" className="center" link="/gameplay"/>
        <Footer>
          Like us on <a href="http://www.facebook.com/yusufameri"> Facebook!</a>
        </Footer>
      </Bottom>
    </Screen>
  );
}

export default HomeScreen;
