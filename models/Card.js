var cards = require("../data/cards")
var _ = require("lodash")

export function getShuffledACard() {
  let ACards = _.filter(cards, (card) => {
    return card.cardType === "A" &&
    card.expansion === 'Base'
  });
  return _.shuffle(ACards)
}

export function getShuffledQCard() {
  // TODO: return cards with more than 1 answer after we implement that feature
  let QCards = _.filter(cards, (card) => {
    return card.cardType === "Q" &&
    card.expansion === 'Base' &&
    card.numAnswers === 1
  });
  return _.shuffle(QCards)
}
