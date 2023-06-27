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

function start() {
  createAlphabetButtons();
  startNewGame();
}

function createAlphabetButtons() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const buttons = document.querySelector("#alphabetbuttons");

  for (const letter of alphabet.split("")) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.dataset.letter = letter.toLowerCase();
    button.addEventListener("click", selectLetter);
    buttons.appendChild(button);
  }
}

function startNewGame() {
  resetAlphabetButtons();
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
  setUpLetters(secretWord);
}

function setUpLetters(word) {
  const wordcontainer = document.querySelector("#word");
  wordcontainer.innerHTML = "";

  for (const letter of Array.from(word)) {
    const letterbox = document.createElement("div");
    letterbox.classList.add("letter");
    letterbox.textContent = " "; // TODO: Remove letter
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

function selectLetter(event) {
  const button = event.target;
  const letter = button.dataset.letter;
  console.log("Selected letter: " + letter);

  // mark selected letter as used
  button.classList.add("used");
  button.disabled = true;

  // Check if letter is correct or not
  const correct = checkLetter(letter);

  if (correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }

  // TODO: Check if won or lost!
}

function checkLetter(letter) {
  if (secretWord.includes(letter)) {
    showLetterInWord(letter);
    // TODO: Get point
    return true;
  } else {
    // TODO: Loose limb
    return false;
  }
}
