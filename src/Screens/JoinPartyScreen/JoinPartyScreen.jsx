import React from 'react'
import "./JoinPartyScreen.css"

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import Title from "../../SharedComponents/Title/Title"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Button from "../../SharedComponents/Button/Button"
import Card from "../../SharedComponents/Card/Card"

function JoinPartyScreen() {
    return (
      <Screen>
        <Top>
          <Card cardType="Link" link="abc123" />
        </Top>
        <Bottom>
          <Title text="Join an existing party"/>
					<div className="enterCode center">
						<p className="label">Enter the 5 digit Party Code</p>
						<input className ="input" type="text" name="partyCode" placeholder="cah.co/<enter_party_code>"/>
					</div>
					<Button text = "Join Party" className="center"/>
        </Bottom>
      </Screen>
    );
}

export default JoinPartyScreen;
