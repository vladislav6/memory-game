# Memory Game

A browser-based memory card game built with HTML, CSS, and vanilla JavaScript.

**Play online:** https://vladislav6.github.io/memory-game/

## About the Project

Memory Game is a classic card-matching game designed to test and improve your memory and concentration. The goal is to find all matching pairs of cards using as few moves as possible.

The game board contains 16 cards representing 8 unique images. At the beginning of each game, all cards are shuffled and placed face down. Players reveal two cards at a time and try to remember the positions of previously seen images.

### Features

* **Interactive game board** — 16 cards containing 8 matching pairs.
* **Random shuffling** — cards are shuffled at the beginning of each game.
* **Move counter** — tracks the number of moves made.
* **Matched pairs counter** — displays the number of pairs found.
* **New Game** — starts a new game and resets the counters.
* **Victory modal** — displays the final number of moves when all pairs are found.
* **Leaderboard** — displays the top 10 results, sorted by the number of moves.
* **Persistent results** — completed game results are stored in the browser's `localStorage` and remain available after refreshing the page.

## How to Play

1. Open the game in your browser.
2. Click any face-down card to reveal its image.
3. Click a second card to try to find its matching pair.
4. If the images match, both cards remain face up.
5. If the images do not match, both cards are turned face down after a short delay.
6. Continue until all 8 pairs have been found.
7. Try to complete the game in as few moves as possible.
8. Open the leaderboard to view your best results, or start a new game at any time.

A move is counted each time you reveal the second card of a pair.

## Technologies

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* DOM API
* Browser `localStorage`

The application uses native browser technologies without UI frameworks or external game logic libraries.

## Getting Started

### Prerequisites

Make sure the following tools are installed on your computer:

* Node.js (LTS version recommended)
* npm (included with Node.js)
* Git

You can check the installed versions by running:

```bash
node -v
npm -v
git --version
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vladislav6/memory-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd memory-game
   ```

3. Switch to the branch containing the application source code:

   ```bash
   git switch memory-game
   ```

4. Install the project dependencies:

   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

After the server starts, open the local URL displayed in the terminal. For example:

http://localhost:5173

The port may differ depending on the development server configuration.

### Building for Production

If the project supports a production build, run:

```bash
npm run build
```

The generated files will usually be placed in the `dist` directory.
