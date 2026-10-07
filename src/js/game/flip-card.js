import controller from "./controller";
import gameState from "../data/game-state";

function flipCard(e) {
  if (e.target.closest('.flip-card')) {
    const cards = e.currentTarget;
    const card = e.target.closest('.flip-card');
    const cardId = card.dataset.cardId;
    card.classList.toggle('active');

    if (card.classList.contains('active')) {
      controller(cards, card, cardId);
    } else {
      gameState.selectedCards = '';
    }
  }
}

export default flipCard;