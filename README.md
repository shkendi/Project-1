# Project-1

https://docs.google.com/document/d/15hQJtGEwVHyHnfJ4Z_90uQls0CZAX_PTiue1cmZ5ZJQ/edit?usp=sharing



Space Invaders is my first ever front-end development project, produced as part of General Assembly's Immersive Software Engineering Bootcamp.

My task was to create a grid-based game rendered in the browser that utilised 'vanilla' JavaScript, HTML and CSS.

Given a selection of classic arcade games to choose from, I opted to build my take on Space Invaders.

The project was mainly to consolidate my beginners' knowledge of JavaScript and interacting with the DOM, but I worked hard to make it a fun experience to play.

The Brief

Render a game in the browser
Design logic for winning & visually display which player won
Include separate HTML / CSS / JavaScript files
Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
Use Javascript for DOM manipulation
Deploy your game online, where the rest of the world can access it
Use semantic markup for HTML and CSS (adhere to best practices)

The Technologies used
HTML5
CSS3
JavaScript (ES6)
Git and GitHub
Google Fonts
Pixel Art
GarageBand

The Approach
The Grid

The game is built using a grid. A 15 x 15 square is created using JavaScript. HTML divs are created using a for loop and appended as children of the grid.

const grid = document.querySelector('.grid')
const width = 15
const cells = []
const cellCount = width * width
const score = document.querySelector('#score')
const resultsDisplay = document.querySelector('.results')
let currentPlayerIndex = 215
let direction = 1
let goingRight = true
let invadersId 
let results = 0
let aliensRemoved = []
const startBtn = document.querySelector('.btn')

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const divElem = document.createElement('div') 
    grid.appendChild(divElem)
    cells.push(divElem)
  }
}


Opponent Movement
Alien Invaders are defined as an array of numbers which corresponds to their position on the grid:

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7,
  15, 16, 17, 18, 19, 20, 21, 22,
  30, 31, 32, 33, 34, 35, 36, 37,
]

They are then added and removed to the grid using a function with a for loop method

function addInvaders() {
  for (let i = 0; i < alienInvaders.length; i++) {
    gridElem[alienInvaders[i]].classList.add('invader')
  }
}
addInvaders()

function removeInvaders() {
  for (let i = 0; i < alienInvaders.length; i++) {
    gridElem[alienInvaders[i]].classList.remove('invader')	
  }
}
Using the defined goingRight and the direction as below.

let direction = 1
let goingRight = true

 I  then reassigned the alienInvaders array movement based on movement in relation to the width 

function moveInvaders() {
  const leftPosition = alienInvaders[0] % width === 0
  const rightPosition = alienInvaders[alienInvaders.length - 1] % width
	  === width - 1
  removeInvaders()
  
  if (leftPosition && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1
      direction = 1
      goingRight = true
    }
  }
  if (rightPosition && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1
      direction = -1
      goingRight = false
    }
  }
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }
 Alien invaders are set to move every 300 miliseconds using a setInterval as shown below:

invadersId = setInterval(moveInvaders, 300)


The Player
The player is added to the grid and it's position in the grid is defined by a variable:
let currentPlayerIndex = 215

gridElem[currentPlayerIndex].classList.add('player')

Moving the player comes from an event listener that checks for a keydown event on the user's keyboard. I then defined a switch statement that established whether the player would move left or right.

function movePlayer(e) {
  gridElem[currentPlayerIndex].classList.remove('player')
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPlayerIndex % width !== 0) currentPlayerIndex -= 1
      break
    case 'ArrowRight' :
      if (currentPlayerIndex % width < width - 1) currentPlayerIndex += 1
      break
  }
  gridElem[currentPlayerIndex].classList.add('player')
}
document.addEventListener('keydown', movePlayer)

To shoot the invaders I set assigned the laser index to the player index:
let currentLaserIndex = currentPlayerIndex

I then added the laser to the grid and every time the laser shoots an invader then the invader index is removed from the alienInvaders array every 100 miliseconds. The shooting comes from an eventListener every time the keydown event is called.
function shoot(e) {
  let laserId
  let currentLaserIndex = currentPlayerIndex
  function moveLaser() {
    gridElem[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    gridElem[currentLaserIndex].classList.add('laser')
    if (currentLaserIndex < width) {
      clearInterval(laserId)
    }
    if (gridElem[currentLaserIndex].classList.contains('invader')) {
      gridElem[currentLaserIndex].classList.remove('laser')
      gridElem[currentLaserIndex].classList.remove('invader')
      gridElem[currentLaserIndex].classList.add('boom')
      alienInvaders.splice(alienInvaders.indexOf(currentLaserIndex),1)
      console.log(alienInvaders)
      setTimeout(()=> gridElem[currentLaserIndex].classList.remove('boom'), 100)
      clearInterval(laserId)

			Challenges
This was my first front-end JavaScript project and assembling all of my knowledge on arrays, control flow, functions, timeouts and intervals.
Moving the alienInvaders was the biggest technical challenge. It took me a little while to understand how to correctly define my left and right movements - and tackling the problem of alienInvaders moving into each other was a particularly engaging challenge!
Future Improvements

My next challenge would be to make the invaders throw bombs, and add some sounds to make nicer to play.
