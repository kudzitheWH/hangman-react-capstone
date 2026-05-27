// src/components/ModeSelect.js
import React from "react";

function ModeSelect({ onSelect, onHelp, onLeaderboard }) {
  return (
    <div className="mode-select">
      <h2>Choose Game Mode</h2>

      <button onClick={() => onSelect("timed")} className="mode-btn">
        Single Player (Timed: 2 minutes)
      </button>

      <button onClick={() => onSelect("untimed")} className="mode-btn">
        Single Player (Untimed)
      </button>

      <button onClick={onHelp} className="mode-btn help-btn">
        Help / Rules
      </button>

      <button onClick={onLeaderboard} className="mode-btn">
        🏆 Leaderboard
      </button>

      <p className="mode-note">
        Timed mode: keep guessing new words until the timer hits 0.
      </p>
    </div>
  );
}

export default ModeSelect;
