import { createMyElement } from "../common/functions"
import newGame from "../game/new-game";

function createHeader() {
  const header = createMyElement('header');
  const moves = createMyElement('div', 'moves', '', ' moves');
  const movesCount = createMyElement('span', 'moves-count', '', '0');
  const pairs = createMyElement('div', 'pairs', '', ' out of 8 pairs');
  const pairsCount = createMyElement('span', 'pairs-count', '', '0');
  const newGameBtn = createMyElement('button', 'btn new-game-btn', '', 'New Game');
  const leaderboardBtn = createMyElement('button', 'btn leaderboard-btn', '', 'Leaderboard');

  newGameBtn?.addEventListener('click', newGame);

  moves.prepend(movesCount);
  pairs.prepend(pairsCount);
  header.append(newGameBtn, moves, pairs, leaderboardBtn);

  return header;
}

export default createHeader;