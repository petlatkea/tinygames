"use strict";
window.addEventListener("DOMContentLoaded", main);

let currentPlayer = 1;
let model = 0;

function main() {
  console.log(`JavaScript kører`);
  document.querySelector("#board").addEventListener("click", clickBoard);
}

function clickBoard(event) {
  const shift = event.target.dataset.shift;
  // if model already has this cell marked - ignore it
  if (!(model & (3 << shift))) {
    model = model | (currentPlayer << shift);
    currentPlayer = !(currentPlayer - 1) + 1;
    displayModel();
    checkWinners();
  }
}

function displayModel() {
  document.querySelectorAll("#board .cell").forEach((cell, i) => {
    cell.textContent = [" ", "O", "X"][(model >> (i << 1)) & 3];
  });
}

function isWinner(player) {
  return [21, 1344, 4161, 4368, 16644, 66576, 65793, 86016].some(win => (model & (win << player)) == win << player);
}

function checkWinners() {
  ["O", "X"].forEach((symbol, index) => {
    if (isWinner(index)) {
      document.querySelector("#status").textContent = `Game Over - ${symbol} wins`;
      document.querySelector("#board").removeEventListener("click", clickBoard);
    }
  });
}
