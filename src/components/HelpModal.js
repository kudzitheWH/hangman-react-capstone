// src/components/HelpModal.js
import React from "react";

function HelpModal({ onClose }) {
  return (
    <div className="help-backdrop" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <h2>How to Play Hangman</h2>
        <ul>
          <li>A random word is chosen at the start.</li>
          <li>Click letters A–Z to guess the word.</li>
          <li>Correct guesses reveal letters.</li>
          <li>Wrong guesses add to the hangman.</li>
          <li>You lose after 6 wrong guesses.</li>
          <li>You win by revealing all letters.</li>
          <li>Timed mode: get as many words as you can in 2 minutes.</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default HelpModal;
