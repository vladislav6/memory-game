import gameState from "./game-state";

function setDataToLS(moves) {
  const date = new Date();
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  gameState.setResultToTable({
    moves,
    formattedDate
  });

  const sorted = gameState
    .getResultToTable()
    .sort((a, b) => a.moves - b.moves || a.formattedDate - b.formattedDate);

  if (sorted.length > 10) {
    sorted.length = 10;
  }
  localStorage.setItem("memoryGameLeaderboardData", JSON.stringify(sorted));
}

export default setDataToLS;