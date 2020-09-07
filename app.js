//Declaring global variables
let scores = [0, 0];
let activePlayer = 0;
let activeScore = 0;
let gameActive = true;

//Getting elements from the DOM and saving them in constants
const playerOneScore = document.getElementById('score-0');
const playerTwoScore = document.getElementById('score-1');
const playerOneName = document.getElementById('name-0');
const playerTwoName = document.getElementById('name-1');
const finalScore = document.querySelector('.final-score');
const playerOneCurrentScore = document.getElementById('current-0');
const playerTwoCurrentScore = document.getElementById('current-1');
const isActiveOne = document.querySelector('.player-0-panel');
const isActiveTwo = document.querySelector('.player-1-panel');
const mainDice = document.querySelector('.dice')
mainDice.style.display = 'none';

//New game
function newGame(){
  scores = [0, 0];
  activePlayer = 0;
  activeScore = 0;
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  gameActive = true;
  playerOneName.textContent = 'Player-1';
  playerTwoName.textContent = 'Player-2';
  finalScore.textContent = '';
  isActiveOne.classList.remove('active');
  isActiveTwo.classList.remove('active');
  isActiveOne.classList.remove('winner');
  isActiveTwo.classList.remove('winner');
  isActiveOne.classList.add('active');
}
//Function for changing players turn
function newplayer(){
  if(activePlayer === 0){
    activePlayer = 1;
  }else {
    activePlayer = 0;
  }
  activeScore = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  isActiveOne.classList.toggle('active');
  isActiveTwo.classList.toggle('active');
  mainDice.style.display = 'none';
}

//Creating the Dice class
class Dice {
  constructor(){
    this.newGame = document.querySelector('.btn-new');
    this.rollDice = document.querySelector('.btn-roll');
    this.holdGame = document.querySelector('.btn-hold');
    this.finalScore = document.querySelector('.final-score');
  } 

  //Function to load new game 
  loadNewGame(){
    newGame();
  }


  //Function for rolling dice
  startDice(){
      if(gameActive){
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      mainDice.style.display = 'block';
      mainDice.src = `img/dice-${randomNumber}.png`;
      if(randomNumber !== 1){
       activeScore += randomNumber;
       document.querySelector(`#current-${activePlayer}` ).textContent = activeScore;
      }else {
        newplayer();
      }
      }
    }


  //Function for holding and passing turn to the next player
  loseTurn(){
        if(gameActive){
        scores[activePlayer] += activeScore;
        document.querySelector(`#score-${activePlayer}` ).textContent = scores[activePlayer];
        if(scores[activePlayer] >= finalScore.value ){
          document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
          mainDice.style.display = 'none';
          document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
          document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
          gameActive = false;
        }else{
        newplayer();
        }
    }
  }
}

//Instatiating the Dice class
const dice = new Dice;


//Event listeners
dice.newGame.addEventListener('click', dice.loadNewGame);
dice.rollDice.addEventListener('click', dice.startDice);
dice.holdGame.addEventListener('click', dice.loseTurn);
