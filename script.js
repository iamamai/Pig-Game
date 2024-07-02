'use strict';

// element selectors
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// set initial conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // active player toggler
let playing = true;

// switch player function
const switchPlayer = function () {
  // reset current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // change player background to light
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// reset scores display function

const resetScoreDisplays = function () {
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
};

// 'roll dice' button fucntion
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate rancom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // display the score for the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// 'hold' button function
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    // player 1: scores[0], player 2: scores[1]
    // ie: scores[0] = scores[0] + currentScore
    scores[activePlayer] += currentScore;

    // display score held
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >== 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// 'new game' button function
btnNew.addEventListener('click', function () {
  if (!playing) {
    // reset scores
    scores = [0, 0];
    currentScore = 0;
    playing = true;

    // reset score displays
    resetScoreDisplays();

    // reset css styles
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');

    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');

    // hide dice
    diceEl.classList.add('hidden');

    console.log(activePlayer);
  } else if (playing) {
    // reset scores
    scores = [0, 0];
    currentScore = 0;

    // reset score displays
    resetScoreDisplays();

    // remove player--active from active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    // reset css styles

    activePlayer = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');

    // hide dice
    diceEl.classList.add('hidden');
  }
});
