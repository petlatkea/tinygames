"use strict";

window.addEventListener("load", start);

const wordlist = [
  "await",
  "boolean",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "eval",
  "export",
  "extends",
  "false",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "while",
  "yield",
];

let secretWord = "";
let wrongLetters = 0;
let gameStopped = true;

function start() {
  createAlphabetButtons();
  document.querySelectorAll(".tryagain").forEach(button => button.addEventListener("click", startNewGame));
  startNewGame();
}

function createAlphabetButtons() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const buttons = document.querySelector("#alphabetbuttons");

  for (const letter of alphabet.split("")) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.dataset.letter = letter.toLowerCase();
    button.addEventListener("click", clickOnLetter);
    buttons.appendChild(button);
  }
}

function startNewGame() {
  gameStopped = false;
  hideEndings();
  resetAlphabetButtons();
  resetLimbs();
  setSecretWord();
}

function resetAlphabetButtons() {
  document.querySelectorAll("#alphabetbuttons button").forEach(button => {
    button.disabled = false;
    button.classList.remove("used", "correct", "incorrect");
  });
}

function setSecretWord() {
  secretWord = wordlist[Math.floor(Math.random() * wordlist.length)];
  setupLetterBoxes(secretWord);
}

function setupLetterBoxes(secretword) {
  const wordcontainer = document.querySelector("#word");
  wordcontainer.innerHTML = "";

  for (const letter of Array.from(secretword)) {
    const letterbox = document.createElement("div");
    letterbox.classList.add("letter");
    letterbox.textContent = " ";
    wordcontainer.append(letterbox);
  }
}

function showLetterInWord(letter) {
  const letterboxes = document.querySelectorAll("#word .letter");

  for (let i = 0; i < letterboxes.length; i++) {
    if (letter === secretWord.toLowerCase().charAt(i)) {
      letterboxes[i].textContent = secretWord.charAt(i);
    }
  }
}

function allLettersGuessed() {
  return !Array.from(document.querySelectorAll("#word .letter")).some(letterbox => letterbox.textContent === " ");
}

function clickOnLetter(event) {
  if (!gameStopped) {
    const button = event.target;
    const letter = button.dataset.letter;
    console.log("Selected letter: " + letter);

    // mark selected letter as used
    button.classList.add("used");
    button.disabled = true;

    // Check if letter is correct or not
    const correct = selectLetter(letter);

    if (correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  }
}

function selectLetter(letter) {
  if (secretWord.includes(letter)) {
    showLetterInWord(letter);
    if (allLettersGuessed()) {
      gameWon();
    }
    return true;
  } else {
    // letter is not correct - loose a limb
    looseLimb();
    if (allLimbsLost()) {
      gameLost();
    }
    return false;
  }
}

function looseLimb() {
  const limbs = ["head", "body", "armL", "armR", "legL", "legR"];
  const limb = document.querySelector(`svg #${limbs[wrongLetters++]}`);

  limb.classList.remove("hide");
}

function allLimbsLost() {
  return wrongLetters === 6;
}

function resetLimbs() {
  const limbs = ["head", "body", "armL", "armR", "legL", "legR"];
  limbs.forEach(limbid => document.querySelector(`svg #${limbid}`).classList.add("hide"));
  wrongLetters = 0;
}

function gameWon() {
  document.querySelector("#won").classList.remove("hide");
  document.querySelector("#wrong").textContent = wrongLetters;
  gameStopped = true;
}

function gameLost() {
  document.querySelector("#lost").classList.remove("hide");
  document.querySelector("#secretword").textContent = secretWord;
  gameStopped = true;
}

function hideEndings() {
  document.querySelector("#won").classList.add("hide");
  document.querySelector("#lost").classList.add("hide");
}
