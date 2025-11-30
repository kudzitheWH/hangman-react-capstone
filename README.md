# Hangman Game (React Capstone)

A simple Hangman game built with React. This project was created for the Stage 4 React Capstone.


A browser-based Hangman word game built with React. The goal of the project was to practice component-based frontend development, state management and user interaction in a modern JavaScript framework.

---

## Overview

This app lets users guess letters to reveal a hidden word. With each incorrect guess the hangman progresses closer to “game over”. The project focuses on clean UI, simple game logic and clear separation of concerns between components.

---

## Features

- Single-page app built in React
- Random word selection from a word list
- Visual feedback for correct and incorrect guesses
- Tracking of remaining attempts and game status (win / lose)
- Option to start a new game

---

## Tech Stack

- **Frontend:** React, JavaScript, JSX, CSS
- **Tooling:** npm, Git, GitHub

---

## Getting Started

```bash
git clone https://github.com/kudzitheWH/hangman-react-capstone.git
cd hangman-react-capstone
npm install
npm start


---

## How to Play

1. Choose a game mode:
   - **Single Player (Timed: 2 minutes)**  
     Guess as many words as possible before the timer reaches 0.
   - **Single Player (Untimed)**  
     Play one word at a time with no time limit.

2. A random word is selected.
3. Click letters A–Z to guess the word.
4. Correct guesses reveal letters in the word.
5. Wrong guesses add to the hangman figure.
6. You lose a round after **6 wrong guesses**.
7. You win a round by guessing all letters.

### Timed Mode Rules

- You have **2 minutes** total.
- Every time you guess a word correctly, your **score increases by 1** and a new word loads instantly.
- The game ends when the timer hits **0** and your final score is displayed.

### Help

- Click the **Help / Rules** button at any time to view the rules.

---

## Prerequisites

To run this project locally you need:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes bundled with Node.js)

You can check if they are installed with:

```bash
node -v
npm -v
