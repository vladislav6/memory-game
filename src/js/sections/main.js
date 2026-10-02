import { createMyElement } from "../common/functions";
import cardsBlock from "./cards-block";

const main = createMyElement('main');

main.append(cardsBlock);

export default main;