"use strict";

window.addEventListener("load", start);

function start() {
  document.querySelector("#ready").addEventListener("click", startGame);
}

let low = 1;
let high = 100;

function startGame() {
  document.querySelector("#wait-for-ready").remove();

  low = 0;
  high = 100;

  makeAGuess();
}

function makeAGuess() {
  // make a guess exactly halfway between low and high
  const guess = low + Math.round((high - low) / 2);
  showGuessAndGetResponse(guess);
}

function guessedTooLow(guess) {
  low = guess;
  makeAGuess();
}

function guessedTooHigh(guess) {
  high = guess;
  makeAGuess();
}

function guessedCorrect(guess) {
  document.querySelector("#guesses").insertAdjacentHTML("afterend", "<p>I finally guessed it!</p>");
}

function showGuessAndGetResponse(guess) {
  const html = `<li>I'm guessing ${guess} - <span id="responses">Is that 
    <button id="too-low">too low</button>
    <button id="too-high">too high</button>
    <button id="correct">Correct!</button>?
    </span></li>`;

  document.querySelector("#guesses").insertAdjacentHTML("beforeend", html);

  document.querySelector("button#too-low").addEventListener("click", tooLow);
  document.querySelector("button#too-high").addEventListener("click", tooHigh);
  document.querySelector("button#correct").addEventListener("click", correct);

  function tooLow() {
    document.querySelector("#responses").replaceWith("that was too low.");
    guessedTooLow(guess);

  }

  function tooHigh() {
    document.querySelector("#responses").replaceWith("that was too high.");
    guessedTooHigh(guess);
  }

  function correct() {
    document.querySelector("#responses").replaceWith("That is correct!");
    guessedCorrect(guess);
  }
}