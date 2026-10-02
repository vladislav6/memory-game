import { createMyElement } from "../common/functions";
import cards, { backOfCards } from '../data/cards';
import flipCard from "../game/flip-card";

function createCardsBlock() {
  const cardsBlock = createMyElement('section', 'cards');
  const fragment = document.createDocumentFragment();

  [...cards, ...cards].forEach(card => {
    const cardElement = createMyElement('div', 'flip-card');
    cardElement.dataset.cardId = card.id;

    const cardInner = createMyElement('div', 'flip-card-inner');
    const cardInnerBack = createMyElement('div', 'flip-card-back');
    const cardInnerFront = createMyElement('div', 'flip-card-front');

    const cardImageBack = createMyElement('img');
    cardImageBack.src = backOfCards.img;
    cardImageBack.alt = '';

    const cardImageFfont = createMyElement('img');
    cardImageFfont.src = card.img;
    cardImageFfont.alt = '';
    
    cardInnerBack.append(cardImageBack);
    cardInnerFront.append(cardImageFfont);
    cardInner.append(cardInnerBack, cardInnerFront);
    cardElement.append(cardInner);
    fragment.append(cardElement);
  });

  cardsBlock?.addEventListener('click', flipCard);

  cardsBlock.append(fragment);

  return cardsBlock;
}

export default createCardsBlock;