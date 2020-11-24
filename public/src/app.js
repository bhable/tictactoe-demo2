const BOARD = "game-board";
const FIELDS = "game-board--field";
const RESET = "reset";
const MSG = "msg";

let players = ["X", "O"];

const isFieldOccupied = (id) => document.getElementById(id).innerText.length;

const occupyField = (id, players) =>
  (document.getElementById(id).innerText = players[0]);

const swapPlayers = (players) => [players[1], players[0]];

const playFailureAudio = () =>
  new Audio("https://actions.google.com/sounds/v1/impacts/crash.ogg").play();

const playVictoryAudio = () =>
  new Audio(
    "https://actions.google.com/sounds/v1/cartoon/instrument_strum.ogg"
  ).play();

const playTieAudio = () =>
  new Audio(
    "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
  ).play();

function isWinner() {
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const matchPattern = (acc, el) => {
    const mark1 = document.getElementById(el[0]).innerText[0];
    const mark2 = document.getElementById(el[1]).innerText[0];
    const mark3 = document.getElementById(el[2]).innerText[0];

    return acc || (mark1 === mark2 && mark2 === mark3 ? mark1 : undefined);
  };

  return winningPattern.reduce(matchPattern, undefined);
}

const announceWinner = (winner) =>
  (document.getElementById(MSG).innerText = `${winner} won!`);

const announcePlayer = (players) =>
  (document.getElementById(MSG).innerText = `${players[0]}, your turn!`);

const announceTie = (players) =>
  (document.getElementById(MSG).innerText = "Tie!");

const stopBoardClick = () => (document.getElementById(BOARD).onclick = "");

const resumeBoardClick = () =>
  (document.getElementById(BOARD).onclick = handleBoardClick);

const resumeRefreshClick = () =>
  (document.getElementById(RESET).onclick = refreshClick);

const checkForTie = () =>
  Array.prototype.every.call(
    document.getElementsByClassName(FIELDS),
    (el) => el.innerText.length
  );

const clearBoardFields = () =>
  Array.prototype.forEach.call(
    document.getElementsByClassName(FIELDS),
    (el) => (el.innerText = "")
  );

function handleBoardClick({ srcElement: { id: fieldId } }) {
  if (fieldId === BOARD) return;

  if (isFieldOccupied(fieldId)) {
    playFailureAudio();
    return;
  }

  occupyField(fieldId, players);
  players = swapPlayers(players);
  announcePlayer(players);
  const winner = isWinner();

  if (winner) {
    announceWinner(winner);
    playVictoryAudio();
    stopBoardClick();
    return;
  }

  if (checkForTie()) {
    announceTie();
    playTieAudio();
    stopBoardClick();
    return;
  }
}

export function refreshClick() {
  clearBoardFields();
  resumeBoardClick();
  resumeRefreshClick();
  announcePlayer(players);
}
