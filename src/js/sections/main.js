import { createMyElement } from "../common/functions";
import createCardsBlock from "./cards-block";

function createMain() {
  const main = createMyElement('main');
  const cardsBlock = createCardsBlock();

  main.append(cardsBlock);
  return main;
}

export default createMain;