/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger +20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)
       || (rockLeftEdge >= dodgerLeftEdge &&  rockRightEdge <= dodgerRightEdge)
       || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = '${top+=2}px'
  GAME.appendChild (rock);

  function moveRock() {
    if (checkCollision(rock) === true ) {
      return endGame();
    } else if (top < 360) {
      window.requestAnimationFrame (moveRock)
    } else {
      rock.remove();
    }
    }

window.requestAnimationFrame (moveRock)

  ROCKS.push(rock)
  return rock;
}

function endGame() {
  for ( var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  clearInterval (gameInterval);
  window.removeEventListener ('keydown' , moveDodger)
  alert ("YOU LOSE!");
}

function moveDodger(e) {
if (e.which === LEFT_ARROW) {
  e.preventDefault()
  e.stopPropagation()
  moveDodgerLeft();
}
else if (e.which === RIGHT_ARROW) {
  e.preventDefault()
  e.stopPropagation()
  moveDodgerRight();
}
  }

function moveDodgerLeft() {
    window.requestAnimationFrame(moveDodgerLeft);
  const left = positionToInteger(DODGER.style.left);

    if (left > 0) {
        DODGER.style.left = '${left - 4}px';
    }
  }


function moveDodgerRight() {
  const left = positionToInteger(DODGER.style.left);
  if ( left <= 360) {
    DODGER.style.left = '${left + 4}px';
    window.requestAnimationFrame(moveDodgerRight);
  }
}



/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
