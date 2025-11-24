import React from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Keyboard({ guessedLetters, onGuess, disabled }) {
  return (
    <div className="keyboard">
      {alphabet.map((letter) => {
        const alreadyGuessed = guessedLetters.includes(letter);

        return (
          <button
            key={letter}
            className="key-btn"
            onClick={() => onGuess(letter)}
            disabled={alreadyGuessed || disabled}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
