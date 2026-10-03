import renderGame from "../sections/render";
import gameState from "../data/game-state";

function newGame() {
  const data = JSON.parse(localStorage.getItem('memoryGameLeaderboardData'));
  gameState.moves = 0;
  gameState.pairs = 0;
  gameState.selectedCards = '';
  gameState.flipedcards.length = 0;
  gameState.leaderboardData = data ? data : [];
  renderGame();
  document.body.classList.remove('no-scroll');
}

export default newGame;