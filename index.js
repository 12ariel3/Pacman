const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score-span')
const width = 28 //28 x 28 = 784 squares
const squares = []
let score = 0
let point = 0


const layout =[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//legend
// 0 -- pac-dot
// 1 -- wall
// 2 -- ghost lair
// 3 -- power pellet
// 4 -- empty

function createBoard(){
    for(let i = 0; i < layout.length; i++){
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //add layout to the board
        if(layout[i] === 0){
            squares[i].classList.add('pac-dot')
            point ++
        }else if(layout[i] === 1){
            squares[i].classList.add('wall')
        }else if(layout[i] === 2){
            squares[i].classList.add('ghost-lair')
        }else if(layout[i] === 3){
            squares[i].classList.add('power-pellet')
            point++
        }

    }
}

createBoard()

//starting position of pac-man
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pac-man')



//move pac-man

function movePacman(e){
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(e.keyCode){
        case 37:
            if(pacmanCurrentIndex % width !== 0 &&
                 !squares[pacmanCurrentIndex - 1].classList.contains('wall')
                 && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) pacmanCurrentIndex -= 1

            //check if pacman is in the left exit
            if((pacmanCurrentIndex - 1) === 363){
                pacmanCurrentIndex = 391
            }
            break
        case 38:
            if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall')
            && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) pacmanCurrentIndex -= width
            break
        case 39:
            if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall')
            && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) pacmanCurrentIndex += 1

            //check if pacman is in the right exit
            if((pacmanCurrentIndex + 1) === 392){
                pacmanCurrentIndex = 364
            }
            break
        case 40:
            if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall')
            && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) pacmanCurrentIndex += width
            break
    }
    
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    checkGameOver()
    checkForWin()
}

document.addEventListener('keyup', movePacman)


//what happens when pac-man eats a pac-dot
function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        score ++
        scoreDisplay.innerHTML = score
        point--
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}


//what happens when you eat a power-pellet

function powerPelletEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        score += 10
        scoreDisplay.innerHTML = score
        point--
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 15000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}


//make the ghosts stop appearong as aquamarine

function unScareGhosts(){
    ghosts.forEach(ghost => ghost.isScared = false)
}


//create our ghost template

class Ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}


ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400 ),
    new Ghost('inky', 351, 300),
    new Ghost('clyde',379, 500)
]


//draw my ghosts onto the grid


ghosts.forEach(ghost=>{
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
})



//move all the ghosts randomly

ghosts.forEach(ghost => moveGhost(ghost))


//write the function to meve the ghosts

function moveGhost(ghost){
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random()*directions.length)]

    ghost.timerId = setInterval(function(){
        //if the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
            //you can go here
            //remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

            //change the new currentIndex to the new safe square
            ghost.currentIndex += direction

            //redraw the ghost in the new safe place
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            //else find a new direction to try
        }else{
            direction = directions[Math.floor(Math.random()*directions.length)]
        }

        //if the ghost is currently scared
        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if the ghost is scared and pacman runs into it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
            squares[ghost.currentIndex].classList.remove('ghost', ghost.className, 'scared-ghost')
            score+= 100
            scoreDisplay.innerHTML = score
            ghost.currentIndex = ghost.startIndex
        }
        checkGameOver()

    },ghost.speed)
}

//check for game over
function checkGameOver(){
 if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){alert('GAME OVER!')}, 500)
 }   
}

//check for win

function checkForWin(){
    if(point <= 0){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){alert('YOU WIN!')}, 500)
    }
}

