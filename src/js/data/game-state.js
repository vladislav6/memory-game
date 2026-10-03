const gameState = {
  moves: 0,
  pairs: 0,
  selectedCards: '',
  flipedcards: [],
  makeStep() {
    this.moves += 1;
  },
  makePair() {
    this.pairs += 1;
  },
  checkPairsCards(card) {
    return this.selectedCards === card;
  }
}

export default gameState;