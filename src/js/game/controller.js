import { addClassAllElements, removeClassAllElements } from "../common/functions";
import gameState from "../data/game-state";
import victoryModal from "./victory";
import setDataToLS from "../data/local-storage";

function controller(cards, card, cardId) {
  const movesCount = document.querySelector('.moves-count');
  const pairsCount = document.querySelector('.pairs-count');
  gameState.flipedcards.push(card);

  if (gameState.checkPairsCards(cardId)) {
    gameState.makePair();
    gameState.makeStep();
    addClassAllElements(gameState.flipedcards, ['fliped']);
    gameState.selectedCards = '';
    gameState.flipedcards.length = 0;
  }
  if (gameState.flipedcards.length >= 2) {
    gameState.makeStep();
    addClassAllElements([...cards.children], ['disable']);
    setTimeout(() => {
      removeClassAllElements([...cards.children], ['active', 'disable']);
      gameState.selectedCards = '';
      gameState.flipedcards.length = 0;
    }, 1000);
  }
  gameState.selectedCards = cardId;
  movesCount.textContent = `${gameState.moves}`;
  pairsCount.textContent = `${gameState.pairs}`;
  if (gameState.pairs === 8) {
    victoryModal(gameState.moves);
    setDataToLS(gameState.moves);
  }
}

export default controller;