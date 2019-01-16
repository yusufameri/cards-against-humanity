import React from 'react'
import "./JoinPartyScreen.css"

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Button from "../../SharedComponents/Button/Button"
import Card from "../../SharedComponents/Card/Card"

function EnterPartyCode() {
	return (
		<div>
			<div className="title">
				<h1>Join an existing party</h1>
			</div>
			<div className="enterCode pushDown">
				<p className="label">Enter the 5 digit Party Code</p>
				<input className ="input" type="text" name="partyCode" placeholder="cah.co/<enter_party_code>"/>
			</div>
			<Button text = "Join Party" extraClasses="pushDown"/>
		</div>
	);
}

function JoinPartyScreen() {
    return (
      <Screen>
        <Top>
          <Card cardType="Link" link="abc123" />
        </Top>
        <Bottom>
          <EnterPartyCode />
        </Bottom>
      </Screen>
    );
}

export default JoinPartyScreen;
