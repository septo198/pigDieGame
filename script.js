'use strict';

function newGame(){
    score0.textContent = 0;
    score1.textContent = 0;
    diceImg.classList.add('hidden');
}

function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
}

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnRoll.addEventListener('click', () => {
    if (playing){
        const dice = Math.floor(Math.random()*6)+1;;
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${dice}.png`;
        if (dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', () => {
    if (playing){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceImg.classList.add('hidden');
        }
        else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', () => {
    newGame();
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    playing = true;
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
})

newGame();
