import React from 'react'
import Card from "../../SharedComponents/Card/Card"
import Button from "../../SharedComponents/Button/Button"
import "./StartGameScreen.css"


function PlayersJoined() {
	return (
			<div className="bottom">
					<div className="inner">
						<div className="title">
							<h1>Players Joined</h1>
						</div>
						<div className="playersList">
							<ol>
								<li>Yusuf</li>
								<li>Salman</li>
								<li>Joseph</li>
								<li>Sal</li>
								<li><input type="text" className="enterName" placeholder="Enter Name Here"/></li>
							</ol>
						</div>
						<Button text = "Join Party" extraClasses="pushDown" />
						<div className="title">
							<h5>Need at least 1 more player to start game</h5>
						</div>
					</div>
		</div>
	);
}

function InviteWithLink() {
	return (
		<div className="top">
			<Card cardType="Link" link="abc123" />
		</div>
	);
}

function StartGameScreen() {
    return (
        <div className="screen">
            <InviteWithLink />
            <PlayersJoined />
        </div>
    );
}

export default StartGameScreen;
