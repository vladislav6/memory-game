
const gameState = {
  moves: 0,
  pairs: 0,
  selectedCards: '',
  flipedcards: [],
  leaderboardData: [],
  makeStep() {
    this.moves += 1;
  },
  makePair() {
    this.pairs += 1;
  },
  checkPairsCards(card) {
    return this.selectedCards === card;
  },
  setResultToTable(data) {
    this.leaderboardData.push(data);
  },
  getResultToTable() {
    return this.leaderboardData;
  }
}

export default gameState;