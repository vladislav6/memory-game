import { createMyElement } from "../common/functions";
import modalWindow from "./modal-window";

function victoryModal(moves) {
  const result = createMyElement('p', 'result', '', `Result: ${moves} moves`);
  const content = {
    title: 'All pairs found!',
    content: result,
    isVictoryModal: true
  };

  modalWindow(content);
}

export default victoryModal;