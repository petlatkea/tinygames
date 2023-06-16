"use strict";

window.addEventListener("load", init);

let secretNumber = 0;
let firstGuess = true;

function init() {
  secretNumber = thinkOfRandomNumber();
  firstGuess = true;
  document.querySelector("form").addEventListener("submit", receiveGuess);
}

function thinkOfRandomNumber() {
  const number = Math.ceil(Math.random() * 100);
  return number;
}

function receiveGuess(event) {
  event.preventDefault();
  const guess = event.target.guess.valueAsNumber;
  evaluateGuess(guess);
  event.target.guess.value = "";
}

function evaluateGuess(guess) {
  if (guess > secretNumber) {
    guessIsTooLarge(guess);
  } else if (guess < secretNumber) {
    guessIsTooSmall(guess);
  } else if (guess === secretNumber) {
    guessIsCorrect(guess);
  }

  if (firstGuess) {
    document.querySelector("label").textContent = "Guess again";
    firstGuess = false;
  }
}

function guessIsTooLarge(guess) {
  document.querySelector("#guesses").insertAdjacentHTML("beforeend", 
  `<li>You guessed ${guess} - I'm sorry, but that is too high.</li>`);
}

function guessIsTooSmall(guess) {
  document.querySelector("#guesses").insertAdjacentHTML("beforeend",
  `<li>You guessed ${guess} - Unfortunately, that is too low.</li>`);
}

function guessIsCorrect(guess) {
  document.querySelector("#guesses").insertAdjacentHTML("beforeend", 
  `<li>You guessed it! The secret number is ${guess}!</li>`);
  document.querySelector("form").remove();
}
