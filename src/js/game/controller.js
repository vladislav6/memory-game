import gameState from "../data/game-state";
import victoyrModal from "./victory";

function controller(cards, card, cardId) {
  const movesCount = document.querySelector('.moves-count');
  const pairsCount = document.querySelector('.pairs-count');
  gameState.flipedcards.push(card);

  if (gameState.checkPairsCards(cardId)) {
    gameState.makePair();
    gameState.makeStep();
    gameState.flipedcards.forEach(card => card.classList.add('fliped'));
    gameState.selectedCards = '';
    gameState.flipedcards.length = 0;
  }
  if (gameState.flipedcards.length >= 2) {
    gameState.makeStep();
    [...cards.children].forEach(card => card.classList.add('disable'));
    setTimeout(() => {
      [...cards.children].forEach(card => card.classList.remove('active'));
      [...cards.children].forEach(card => card.classList.remove('disable'));
      gameState.selectedCards = '';
      gameState.flipedcards.length = 0;
    }, 1000);
  }
  gameState.selectedCards = cardId;
  movesCount.textContent = `${gameState.moves}`;
  pairsCount.textContent = `${gameState.pairs}`;
  if (gameState.pairs === 8) {
    victoyrModal(gameState.moves);
  }
}

export default controller;