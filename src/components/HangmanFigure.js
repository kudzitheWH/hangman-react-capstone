import React from "react";

// Simple text/emoji steps.
const steps = [
  "",
  "O",
  "O\n |",
  "O\n/|",
  "O\n/|\\",
  "O\n/|\\\n/",
  "O\n/|\\\n/ \\"
];

function HangmanFigure({ wrongGuesses }) {
  return (
    <div className="figure">
      <pre>{steps[wrongGuesses]}</pre>
    </div>
  );
}

export default HangmanFigure;
