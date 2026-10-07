import { createMyElement } from "../common/functions";
import modalWindow from "./modal-window";
import gameState from "../data/game-state";

function leaderboard() {
  const data = gameState.getResultToTable();
  const table = createMyElement('table', 'leaderboard');
  const fragment = document.createDocumentFragment();

  if (data.length !== 0) {
    const trHead = createMyElement('tr');
    const thPosition = createMyElement('th', '', '', 'Position');
    const thMoves = createMyElement('th', '', '', 'Moves');
    const thDate = createMyElement('th', '', '', 'Date');

    trHead.append(thPosition, thMoves, thDate);
    fragment.append(trHead);

    data.forEach((game, id) => {
      const tr = createMyElement('tr');
      const tdPosition = createMyElement('td', '', '', `${id + 1}`);
      const tdMoves = createMyElement('td', '', '', `${game.moves}`);
      const tdDate = createMyElement('td', '', '', `${game.formattedDate}`);

      tr.append(tdPosition, tdMoves, tdDate);
      fragment.append(tr);
    });

  } else {
    const result = createMyElement('p', 'result', '', 'No data');
    fragment.append(result);
  }

  table.append(fragment);

  const leaderboardContent = {
    title: 'Leaderboard',
    content: table,
    isVictoryModal: false,
  };

  modalWindow(leaderboardContent);
}

export default leaderboard;