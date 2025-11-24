import React, { useState, useEffect, useRef } from "react";
import words from "./data/words";

// Components
import HangmanFigure from "./components/HangmanFigure";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import StatusBar from "./components/StatusBar";
import HelpModal from "./components/HelpModal";
import ModeSelect from "./components/ModeSelect";

import "./App.css";

function App() {
  const MAX_WRONG = 6;
  const MAX_TIME = 120; // 2 minutes

  const getRandomWord = () =>
    words[Math.floor(Math.random() * words.length)].toUpperCase();

  // State variables
  const [mode, setMode] = useState(null); // null | "timed" | "untimed"
  const [secretWord, setSecretWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // playing | won | lost | timeout
  const [showHelp, setShowHelp] = useState(false);

  // Timed-mode extras
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [score, setScore] = useState(0);
  const timerRef = useRef(null);

  // Timer effect for timed mode
  useEffect(() => {
    // Only run timer in timed mode
    if (mode !== "timed") return;

    // If time is up, end session
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      setGameStatus("timeout");
      return;
    }

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on re-render
    return () => clearInterval(timerRef.current);
  }, [mode, timeLeft]);

  // helpers 
  const resetWordOnly = () => {
    // Used to continue to another word in timed mode
    setSecretWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
  };

  const resetSession = () => {
    // Back to mode selection
    clearInterval(timerRef.current);
    setMode(null);
    setScore(0);
    setTimeLeft(MAX_TIME);
    resetWordOnly();
  };

  const startMode = (selectedMode) => {
    setMode(selectedMode);
    setScore(0);
    setTimeLeft(MAX_TIME);
    resetWordOnly();
  };

  const checkWin = (letters) => {
    const uniqueLetters = [...new Set(secretWord.split(""))];
    return uniqueLetters.every((l) => letters.includes(l));
  };

  const handleGuess = (letter) => {
    if (gameStatus !== "playing") return;
    if (guessedLetters.includes(letter)) return;

    const updatedGuesses = [...guessedLetters, letter];
    setGuessedLetters(updatedGuesses);

    // Wrong guess
    if (!secretWord.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      if (newWrong >= MAX_WRONG) {
        // Lose this round
        setGameStatus("lost");
      }
      return;
    }

    // Check for win
    if (checkWin(updatedGuesses)) {
      if (mode === "timed" && timeLeft > 0) {
        // In timed mode, auto-continue to next word
        setScore((prev) => prev + 1);
        resetWordOnly();
      } else {
        // Untimed mode ends normally
        setGameStatus("won");
      }
    }
  };

  // Render
  // If no mode chosen yet, show mode screen
  if (!mode) {
  return (
    <div className="app-wrapper">
      <h1>Hangman</h1>
      <ModeSelect
        onSelect={startMode}
        onHelp={() => setShowHelp(true)}
      />
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}

  return (
    <div className="app-wrapper">
      <h1>Hangman</h1>

      {/* Synced state components */}
      <HangmanFigure wrongGuesses={wrongGuesses} />
      <WordDisplay secretWord={secretWord} guessedLetters={guessedLetters} />

      {/* Status info + controls */}
      <StatusBar
        wrongGuesses={wrongGuesses}
        maxWrong={MAX_WRONG}
        gameStatus={gameStatus}
        onReset={resetWordOnly}
        onHelp={() => setShowHelp(true)}
        mode={mode}
        timeLeft={timeLeft}
        score={score}
        onChangeMode={resetSession}
      />

      <Keyboard
        guessedLetters={guessedLetters}
        onGuess={handleGuess}
        disabled={gameStatus !== "playing"}
      />

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* End overlays */}
      {gameStatus === "won" && mode === "untimed" && (
        <div className="overlay">
          <h2>🎉 You Won!</h2>
          <p>The word was: <strong>{secretWord}</strong></p>
          <button onClick={resetWordOnly}>Next Word</button>
          <button onClick={resetSession}>Change Mode</button>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="overlay">
          <h2>💀 You Lost!</h2>
          <p>The word was: <strong>{secretWord}</strong></p>

          {/* In timed mode, allow next word until time ends */}
          {mode === "timed" && timeLeft > 0 ? (
            <button onClick={resetWordOnly}>Next Word</button>
          ) : (
            <button onClick={resetWordOnly}>Play Again</button>
          )}

          <button onClick={resetSession}>Change Mode</button>
        </div>
      )}

      {gameStatus === "timeout" && (
        <div className="overlay">
          <h2>⏳ Time’s Up!</h2>
          <p>You got <strong>{score}</strong> word(s) in 2 minutes.</p>
          <button onClick={() => startMode("timed")}>Play Timed Again</button>
          <button onClick={resetSession}>Choose Another Mode</button>
        </div>
      )}
    </div>
  );
}

export default App;
