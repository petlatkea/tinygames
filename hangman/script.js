"use strict";

window.addEventListener("load", start);

function start() {
  createAlphabetButtons();
}

function createAlphabetButtons() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const buttons = document.querySelector("#alphabetbuttons");

  for( const letter of alphabet.split("")) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.dataset.letter = letter.toLowerCase();
    button.addEventListener("click", selectLetter);
    buttons.appendChild(button);
  }
}

function selectLetter(event) {
  const button = event.target;
  const letter = button.dataset.letter;
  console.log("Selected letter: " + letter);

  // mark selected letter as used
  button.classList.add("used");
  button.disabled = true;
  
  // TODO: Check if letter is correct or not
  const correct = Math.random() < 0.5; // FAKE
  
  if(correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }

}