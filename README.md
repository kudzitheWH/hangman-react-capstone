# Hangman Game (React Capstone)

A simple Hangman game built with React. This project was created for the Stage 4 React Capstone.

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

## How to Install and Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/kudzitheWH/hangman-react-capstone.git
