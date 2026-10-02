import { cleanDOM } from "../common/functions";
import createHeader from "./header";
import createMain from "./main";

function renderGame() {
  const body = document.body;
  const main = createMain();
  const header = createHeader();
  cleanDOM(body);
  body.append(header, main);
}

export default renderGame;