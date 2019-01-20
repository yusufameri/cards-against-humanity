import React from 'react'

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import Title from "../../SharedComponents/Title/Title"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Button from "../../SharedComponents/Button/Button"
import Card from "../../SharedComponents/Card/Card"
import Footer from "../../SharedComponents/Footer/Footer"
import "./JoinPartyScreen.css"

function JoinPartyScreen() {
    return (
      <Screen>
        <Top>
          <Card cardType="Title" />
        </Top>
        <Bottom>
          <Title text="Join an existing party"/>
					<div className="enterCode center">
						<p className="label">Enter the 5 digit Party Code</p>
						<input className ="input" type="text" name="partyCode" placeholder="cah.co/<enter_party_code>"/>
					</div>
					<Button text = "Join Party" className="center"/>
          <Footer>
            Like us on Facebook
          </Footer>
        </Bottom>
      </Screen>
    );
}

export default JoinPartyScreen;
