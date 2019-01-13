import React from 'react'
import "./CardList.css"
import Card from "../Card/Card"

function CardList(props) {
	return (
		<div className="cardList">
		{ props.cards.map((card) => <Card {...card} key={card.text}/>) }
		</div>
	);
}

export default CardList;
