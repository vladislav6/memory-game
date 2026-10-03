import renderGame from "../sections/render";
import gameState from "../data/game-state";

function newGame() {
  gameState.moves = 0;
  gameState.pairs = 0;
  gameState.selectedCards = '';
  gameState.flipedcards.length = 0;
  renderGame();
}

export default newGame;