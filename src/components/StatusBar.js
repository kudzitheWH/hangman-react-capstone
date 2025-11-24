import React from "react";

function StatusBar({
  wrongGuesses,
  maxWrong,
  gameStatus,
  onReset,
  onHelp,
  mode,
  timeLeft,
  score,
  onChangeMode
}) {
  // Format seconds into m:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="status-bar">
      <p>
        Wrong guesses: {wrongGuesses} / {maxWrong}
      </p>

      {/* ✅ Timer + score only in timed mode */}
      {mode === "timed" && (
        <p className="timer-line">
          Time left: <strong>{formatTime(timeLeft)}</strong> | Score:{" "}
          <strong>{score}</strong>
        </p>
      )}

      <div className="status-actions">
        <button onClick={onReset} disabled={gameStatus === "timeout"}>
          Restart Word
        </button>
        <button onClick={onHelp}>Help</button>
        <button onClick={onChangeMode}>Change Mode</button>
      </div>

      {gameStatus === "playing" && <p>Guess a letter!</p>}
    </div>
  );
}

export default StatusBar;
