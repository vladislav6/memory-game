import { createMyElement } from "../common/functions";
import newGame from "./new-game";

const body = document.body;
const closeModal = (e) => {
  if (e.target.closest('.close-btn') || !e.target.closest('.modal')) {
    body.removeChild(e.currentTarget);
    body.classList.remove('no-scroll');
  }
};

document.addEventListener('keydown', (e) => {
  const overlay = document.querySelector('.overlay');
  if (e.key === 'Escape' && overlay) {
    body.removeChild(overlay);
    body.classList.remove('no-scroll');
  }
});

function modalWindow(content) {
  const overlay = createMyElement('div', 'overlay');
  const modal = createMyElement('div', 'modal');
  const title = createMyElement('p', 'title-modal', '', content.title);

  const result = content.content;
  
  const btnBlock = createMyElement('div', 'btn-block');
  const closeBtn = createMyElement('button', 'btn close-btn', '', 'Close');

  if (content.isVictoryModal) {
    const newGameBtn = createMyElement('button', 'btn new-game-btn', '', 'New game');
    btnBlock.append(newGameBtn);
    newGameBtn.addEventListener('click', newGame);
  }

  btnBlock.append(closeBtn);
  modal.append(title, result, btnBlock);
  overlay.append(modal);

  body.append(overlay);
  body.classList.add('no-scroll');

  overlay.addEventListener('click', closeModal);
}

export default modalWindow;