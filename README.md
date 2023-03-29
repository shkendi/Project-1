# Project-1 ReadMe link

https://docs.google.com/document/d/15hQJtGEwVHyHnfJ4Z_90uQls0CZAX_PTiue1cmZ5ZJQ/edit?usp=sharing

Project-1
Space Invaders


shkendi.github.io/Project-1/








Space Invaders is my first-ever front-end development project, produced as part of General Assembly's Immersive Software Engineering Bootcamp.
My task was to create a grid-based game rendered in the browser that utilises 'vanilla' JavaScript, HTML and CSS.
Given a selection of classic arcade games to choose from, I opted to build my take on Space Invaders.
The project was mainly to consolidate my beginner's knowledge of JavaScript and interact with the DOM, but I worked hard to make it a fun experience to play.


Timeframe & Working Team:

It was an independent project.
The time to complete it was two weeks.


Technologies Used

HTML5
CSS3
JavaScript (ES6)
Git and GitHub
Google Fonts
Excalidraw

Brief


Render a game in the browser
Design logic for winning & visually display which player won
Include separate HTML / CSS / JavaScript files
Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
Use Javascript for DOM manipulation
Deploy your game online, where the rest of the world can access it
Use semantic markup for HTML and CSS (adhere to best practices)




Necessary Deliverables

A working game, built by you, hosted somewhere on the internet
A link to your hosted working game in the URL section of your GitHub repo
A git repository hosted on GitHub, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.


Planning



I had 48 hours to plan my project and I used Excalidraw for that. I had to work out the deliverables I needed and how to approach them, which was hard at the beginning but after I realised that the logic was leading the flow of the project and one functionality was related to another one and so on. Planning helped me put my ideas together, have precise tasks to complete and manage my time well.  






  






Getting started

I started by creating an HTML, CSS and JS file with the main elements such as the start button and the score section. The CSS I used was only the basic one, to make sure I was identifying all the elements on the grid so I could check the progress. The rest of the time spent was mainly working on the app.js file, and I wish I would have spent more time styling my project.

Access the source code via the 'Clone or download button.
Open the index.html file in your browser of choice to start the game.


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


Build/Code Process



My next goal was to execute my thoughts and start building my project so I created a 15 * 15 grid using JavaScript by building a function createGrid(), adding the invaders in it with grid.appendChild() method, pushing the divElem into cells, and calling it at the end.

function createGrid() {
 for (let i = 0; i < cellCount; i++) {
   const divElem = document.createElement('div')
   grid.appendChild(divElem)
   cells.push(divElem)
 }
}
createGrid()


const gridElem = Array.from(document.querySelectorAll('.grid div'))


const alienInvaders = [
 0, 1, 2, 3, 4, 5, 6, 7,
 15, 16, 17, 18, 19, 20, 21, 22,
 30, 31, 32, 33, 34, 35, 36, 37
]


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


I then needed to create the player and decided that the player’s position on the grid was going to be at index 215.

gridElem[currentPlayerIndex].classList.add('player')

So far everything was working as planned, and I wanted to get to the most technical part which was getting the player to move. Moving the player comes from an event listener that checks for a keydown event on the user’s keyboard. I then defined a switch statement that established whether the player would move left or right. The player would move to the right if currentPlayerPosition % width is smaller than the width.length and to the left if the player’s position was !== 0  

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


Here is how I coded the win and the lose code. I decided that if invaders reach the current player index, then the game is over. Otherwise, if all invaders are killed before reaching the player index so alienInvaders.length = 0, then the user wins.











Challenges

My biggest challenge was getting the aliens to move all in the same direction when trying to move them down each side of the grid. In the beginning, they were moving in a chaotic way when touching the edge. To prevent that, I added some logical operators to the if statement so when leftPosition && !goingRight that made the invaders stop going right when moving down by - 1 and goingRight = true whether on the rightPosition && goingRight and the goingRight = false.

function moveInvaders() {
 const leftPosition = alienInvaders[0] % width === 0
 const rightPosition = alienInvaders[alienInvaders.length - 1] % width === width - 1
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


Another challenge for me was that after killing an alien, I also needed it to be removed from the grid which was a bit tricky for me in the first place. I realised that I wasn’t deleting the invaders. I fixed that by adding the .splice method which removed one element (invader) each time that the currentLaserIndex  === alienInvaderindex.
I had to go through what we’d done in our lessons and read the docs for JavaScript array methods for deleting/removing single elements from an array.




Wins

Gained experience in programmatic thinking, logical problem solving and different planning stages. I was able to put together some important learning methods in JavaScript such as the setInterval method, FlexBox, and animations in JS.

Key Learnings/Takeaways

This project helped me put my JavaScript learning during the course into practice.
After finishing this project I was familiar with using JS loops, EventListener and other JS methods such as .create(), .add(), .remove() .splice() and .push(). It took me quite a long time to develop the logic behind the movements of the elements in a grid but I was really happy that during the development of this project, I was able to define them correctly and even enjoyed practising them. I especially enjoyed the animation effects that we could do with JavaScript. This inspired me to plan to build the Pacman game as a side project later. 



Bugs

The start button is not functional. 

Future Improvements

Make the invaders throw bombs.
Make it mobile responsive. 
Add some sounds to make it nicer to play.
Style it better with CSS animation.


