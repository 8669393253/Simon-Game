const simonBoard = document.getElementById('simon-board');
const tiles = document.querySelectorAll('.tile');
const sequence = [];
let playerSequence = [];
let round = 0;

function playRound() {
  const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
  sequence.push(randomTile.id);
  animateSequence();
}

function animateSequence() {
  let i = 0;
  const interval = setInterval(() => {
    lightUpTile(sequence[i]);
    playSound(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      enablePlayerInput();
    }
  }, 1000);
}

function lightUpTile(tileId) {
  const tile = document.getElementById(tileId);
  tile.style.backgroundColor = 'lightgray';
  setTimeout(() => {
    tile.style.backgroundColor = tileId;
  }, 500);
}

function playSound(tileId) {
  const audio = document.getElementById(`${tileId}-sound`);
  audio.play();
}

function enablePlayerInput() {
  playerSequence = [];
  tiles.forEach(tile => {
    tile.style.pointerEvents = 'auto';
  });
}

function disablePlayerInput() {
  tiles.forEach(tile => {
    tile.style.pointerEvents = 'none';
  });
}

function handleTileClick(tileId) {
  lightUpTile(tileId);
  playSound(tileId);
  playerSequence.push(tileId);

  if (!checkPlayerSequence()) {
    gameOver();
  } else if (playerSequence.length === sequence.length) {
    setTimeout(() => {
      nextRound();
    }, 1000);
  }
}

function checkPlayerSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      return false;
    }
  }
  return true;
}

function nextRound() {
  round++;
  disablePlayerInput();
  playRound();
}

function gameOver() {
  alert(`Game Over! Your score: ${round}`);
  resetGame();
}

function resetGame() {
  sequence.length = 0;
  playerSequence.length = 0;
  round = 0;
  playRound();
}

playRound();