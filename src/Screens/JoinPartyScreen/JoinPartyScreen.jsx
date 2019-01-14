import React from 'react'
import { TopHome } from "../HomeScreen/TopHome"
import Button from "../../SharedComponents/Button/Button"
import "./JoinPartyScreen.css"


function EnterPartyCode() {
	return (
			<div className="bottom">
					<div className="inner">
						<div className="title">
							<h1>Join an existing party</h1>
						</div>
						<div>
							<p className="label">Enter the 5 digit Party Code</p>
							<input className ="input" type="text" name="partyCode" placeholder="cah.co/<enter_party_code>"/>
						</div>
						<Button text = "Join Party" extraClasses="pushDown"/>
					</div>
		</div>
	);
}

function JoinPartyScreen() {
    return (
        <div className="screen">
            <TopHome />
            <EnterPartyCode />
        </div>
    );
}

export default JoinPartyScreen;
