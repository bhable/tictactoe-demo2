import "./styles.css";
import { refreshClick } from "./app.js";

document.getElementById("app").innerHTML = `
<div class="header">
  <h1>TicTacToe</h1>
  <div class="sub-header">
    <span id="msg"></span>
    <button id="reset">Next game</button>
  </div>
</div>
<div id="game-board" class="game-board">
  <div id="0" class="game-board--field"></div>
  <div id="1" class="game-board--field v-border"></div>
  <div id="2" class="game-board--field"></div>
  <div id="3" class="game-board--field h-border"></div>
  <div id="4" class="game-board--field h-border v-border"></div>
  <div id="5" class="game-board--field h-border"></div>
  <div id="6" class="game-board--field"></div>
  <div id="7" class="game-board--field v-border"></div>
  <div id="8" class="game-board--field"></div>
</div>
`;

refreshClick();
