import React from "react";

function WordDisplay({ secretWord, guessedLetters }) {
  const letters = secretWord.split("");

  return (
    <div className="word-display">
      {letters.map((letter, index) => {
        const showLetter = guessedLetters.includes(letter);
        return (
          <span className="letter-box" key={index}>
            {showLetter ? letter : "_"}
          </span>
        );
      })}
    </div>
  );
}

export default WordDisplay;
