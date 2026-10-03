import { createMyElement } from "../common/functions";
import newGame from "./new-game";

const closeModal = (e) => {
  if (e.target.closest('.close-btn')) {
    document.body.removeChild(e.currentTarget);
  }
};

function victoyrModal(moves) {
  const overlay = createMyElement('div', 'overlay');
  const modal = createMyElement('div', 'modal');
  const title = createMyElement('p', 'title-modal', '', 'All pairs found!');
  const result = createMyElement('p', 'result', '', `Result: ${moves} moves`);
  const btnBlock = createMyElement('div', 'btn-block');
  const newGameBtn = createMyElement('button', 'btn new-game-btn', '', 'New game');
  const closeBtn = createMyElement('button', 'btn close-btn', '', 'Close');

  btnBlock.append(newGameBtn, closeBtn);
  modal.append(title, result, btnBlock);
  overlay.append(modal);

  newGameBtn.addEventListener('click', newGame);
  overlay.addEventListener('click', closeModal);

  document.body.append(overlay);
}

export default victoyrModal;