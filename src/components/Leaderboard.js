import React, { useState } from "react";

function Leaderboard({ onClose }) {
  const [tab, setTab] = useState("timed");

  const getScores = (mode) =>
    JSON.parse(localStorage.getItem(mode === "timed" ? "lb_timed" : "lb_untimed") || "[]");

  const scores = getScores(tab);
  const colLabel = tab === "timed" ? "Words in 2 mins" : "Win streak";

  return (
    <div className="help-backdrop" onClick={onClose}>
      <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>

        <h2>🏆 Leaderboard</h2>

        {/* Mode tabs */}
        <div className="lb-tabs">
          <button
            className={`lb-tab${tab === "timed" ? " active" : ""}`}
            onClick={() => setTab("timed")}
          >
            ⏱ Timed
          </button>
          <button
            className={`lb-tab${tab === "untimed" ? " active" : ""}`}
            onClick={() => setTab("untimed")}
          >
            🔤 Untimed
          </button>
        </div>

        {/* Scores table */}
        <table className="lb-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>{colLabel}</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.length === 0 ? (
              <tr>
                <td colSpan="4" className="lb-empty">
                  No scores yet — play a game!
                </td>
              </tr>
            ) : (
              scores.map((entry, i) => (
                <tr key={i} className={i === 0 ? "lb-top" : ""}>
                  <td>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                  <td>{entry.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="lb-close" onClick={onClose}>✕ Close</button>
      </div>
    </div>
  );
}

export default Leaderboard;
