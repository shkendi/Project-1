const grid = document.querySelector('.grid')
const width = 15
const cells = []
const cellCount = width * width
const resultsDisplay = document.querySelector('.results')
let currentPlayerIndex = 215
let direction = 1
let goingRight = true
let invadersId 
let results = 0
let aliensRemoved = []


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



gridElem[currentPlayerIndex].classList.add('player')


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
  }
  addInvaders()
  let playerNumOfPlay = 3
  // let count = Number(playerNumOfPlay.innerText)
  // setInterval(() => {
  //   if (count = 3) {
  //     playerNumOfPlay.innerHTML = 'count --'
  //     return count
  //   }
  // }, 1000)

  // console.log(count)
  let currentBombIndex
  if (currentBombIndex === currentPlayerIndex && playerNumOfPlay > 1) {
    resultsDisplay.innerHTML = "Try Again!"
    clearInterval(invadersId)
  }
	


  if (gridElem[currentPlayerIndex].classList.contains('invader', 'player')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }
  if (alienInvaders.length === 0) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}

invadersId = setInterval(moveInvaders, 400)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentPlayerIndex
  function moveLaser() {
    gridElem[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    gridElem[currentLaserIndex].classList.add('laser')

    if (gridElem[currentLaserIndex].classList.contains('invader')) {
      gridElem[currentLaserIndex].classList.remove('laser')
      gridElem[currentLaserIndex].classList.remove('invader')
      gridElem[currentLaserIndex].classList.add('boom')
      alienInvaders.splice(alienInvaders.indexOf(currentLaserIndex),1)
      console.log(alienInvaders)
      setTimeout(()=> gridElem[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)
      if (alienInvaders.length === 0){
        resultsDisplay.innerHTML = "You Win"
      }
      // eslint-disable-next-line no-inner-declarations
      function removeAliens() {
        const alienRemoved =  alienInvaders.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
        results += 20
        resultsDisplay.innerHTML = results
        return alienRemoved
      }
      removeAliens()
    }
  }
  console.log((aliensRemoved))
  switch (e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
  //function throwBombs(e) {
  //   let currentBombIndex 
  //   setInterval(() => {
  //     gridElem[currentBombIndex].classList.remove('bomb')
  //     currentBombIndex = Math.floor(Math.random() * alienInvaders.length)
  //     gridElem[currentBombIndex].classList.add('bomb')
  //   },10)
  //   gridElem[currentBombIndex].classList.remove('bomb')
  //   currentBombIndex = alienInvaders.length + width
  //   direction = 1
  // }
  // console.log(throwBombs(e))
}

document.addEventListener('keydown', shoot)

