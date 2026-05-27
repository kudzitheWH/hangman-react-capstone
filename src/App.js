import React, { useState, useEffect, useRef } from "react";
import words from "./data/words";

// Components
import HangmanFigure from "./components/HangmanFigure";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import StatusBar from "./components/StatusBar";
import HelpModal from "./components/HelpModal";
import ModeSelect from "./components/ModeSelect";
import Leaderboard from "./components/Leaderboard";

import "./App.css";

function App() {
  const MAX_WRONG = 6;
  const MAX_TIME = 120; // 2 minutes

  const getRandomWord = () =>
    words[Math.floor(Math.random() * words.length)].toUpperCase();

  // ── Existing state ───────────────────────────────────────────────────
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

  // ── Leaderboard state ────────────────────────────────────────────────
  const [untimedStreak, setUntimedStreak] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // ── Save a score to localStorage ─────────────────────────────────────
  const saveScore = (gameMode, finalScore) => {
    if (finalScore <= 0) return;
    const raw = window.prompt(
      `⚽ Save your score to the leaderboard!\nScore: ${finalScore}\n\nEnter your name:`
    );
    if (raw === null) return; // user cancelled
    const name = raw.trim().slice(0, 15) || "Anonymous";
    const key = gameMode === "timed" ? "lb_timed" : "lb_untimed";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({ name, score: finalScore, date: new Date().toLocaleDateString() });
    existing.sort((a, b) => b.score - a.score);
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 10))); // keep top 10
  };

  // Timer effect for timed mode
  useEffect(() => {
    if (mode !== "timed") return;
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      setGameStatus("timeout");
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [mode, timeLeft]);

  // ── Helpers ──────────────────────────────────────────────────────────
  const resetWordOnly = () => {
    setSecretWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
  };

  const resetSession = () => {
    // Save untimed streak before leaving if one is active
    if (mode === "untimed" && untimedStreak > 0) {
      saveScore("untimed", untimedStreak);
    }
    clearInterval(timerRef.current);
    setUntimedStreak(0);
    setMode(null);
    setScore(0);
    setTimeLeft(MAX_TIME);
    resetWordOnly();
  };

  const startMode = (selectedMode) => {
    setMode(selectedMode);
    setScore(0);
    setUntimedStreak(0);
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
        setGameStatus("lost");
      }
      return;
    }

    // Check for win
    if (checkWin(updatedGuesses)) {
      if (mode === "timed" && timeLeft > 0) {
        // Timed: auto-continue, rack up the score
        setScore((prev) => prev + 1);
        resetWordOnly();
      } else {
        // Untimed: increment streak, show win overlay
        setUntimedStreak((prev) => prev + 1);
        setGameStatus("won");
      }
    }
  };

  // ── Mode select screen ───────────────────────────────────────────────
  if (!mode) {
    return (
      <div className="app-wrapper">
        <h1>Hangman</h1>
        <ModeSelect
          onSelect={startMode}
          onHelp={() => setShowHelp(true)}
          onLeaderboard={() => setShowLeaderboard(true)}
        />
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      </div>
    );
  }

  // ── Game screen ──────────────────────────────────────────────────────
  return (
    <div className="app-wrapper">
      <h1>Hangman</h1>

      <HangmanFigure wrongGuesses={wrongGuesses} />
      <WordDisplay secretWord={secretWord} guessedLetters={guessedLetters} />

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
      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}

      {/* ── Won overlay (untimed) ───────────────────────────────────── */}
      {gameStatus === "won" && mode === "untimed" && (
        <div className="overlay">
          <h2>🎉 You Won!</h2>
          <p>The word was: <strong>{secretWord}</strong></p>
          <p className="streak-display">Win streak: {untimedStreak} 🔥</p>
          <button onClick={resetWordOnly}>Next Word</button>
          <button onClick={resetSession}>Change Mode</button>
        </div>
      )}

      {/* ── Lost overlay ────────────────────────────────────────────── */}
      {gameStatus === "lost" && (
        <div className="overlay">
          <h2>💀 You Lost!</h2>
          <p>The word was: <strong>{secretWord}</strong></p>

          {mode === "timed" && timeLeft > 0 ? (
            <button onClick={resetWordOnly}>Next Word</button>
          ) : (
            <>
              {/* Save untimed streak before resetting */}
              {mode === "untimed" && untimedStreak > 0 && (
                <>
                  <p className="streak-display">Streak ended at {untimedStreak} 🏆</p>
                  <button onClick={() => saveScore("untimed", untimedStreak)}>
                    💾 Save Score ({untimedStreak} wins)
                  </button>
                </>
              )}
              <button onClick={() => { setUntimedStreak(0); resetWordOnly(); }}>
                Play Again
              </button>
            </>
          )}

          <button onClick={resetSession}>Change Mode</button>
        </div>
      )}

      {/* ── Timeout overlay (timed) ─────────────────────────────────── */}
      {gameStatus === "timeout" && (
        <div className="overlay">
          <h2>⏳ Time's Up!</h2>
          <p>You got <strong>{score}</strong> word(s) in 2 minutes.</p>
          {score > 0 && (
            <button onClick={() => saveScore("timed", score)}>
              💾 Save Score
            </button>
          )}
          <button onClick={() => startMode("timed")}>Play Timed Again</button>
          <button onClick={resetSession}>Choose Another Mode</button>
        </div>
      )}
    </div>
  );
}

export default App;
