const canvas = document.getElementById('canvas')
const scene = canvas.getContext('2d')
const pacmanFrames = document.getElementById('pacman')
const ghostFrames = document.getElementById('ghost')

let pacman
const ghosts = []
const fps = 30
let score = 0

const directions = {
  RIGHT: 4,
  UP: 3,
  LEFT: 2,
  BOTTOM: 1
}

const createRect = (x, y, width, height, color) => {
  scene.fillStyle = color
  scene.fillRect(x, y, width, height)
}

const walkArouondMap = (map, callback) => {
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map.length; j += 1) {
      callback({ map, i, j })
    }
  }
}

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2],
  [2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

const wallBlockSize = 20
const wallBlockColor = '#342DCA'
const foodColor = '#FEB897'
const wallSpaceWidth = wallBlockSize / 1.6;
const wallOffset = (wallBlockSize - wallSpaceWidth) / 2;
const wallInnerColor = "black";

const ghostLocations = [
  {x: 0, y: 0},
  {x: 176, y: 0},
  {x: 0, y: 121},
  {x: 176, y: 121}
]

const drawWals = () => {
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] == 1) {
        createRect(
          j * wallBlockSize,
          i * wallBlockSize,
          wallBlockSize,
          wallBlockSize,
          "#342DCA"
        );
        
        if (j > 0 && map[i][j - 1] == 1) {
            createRect(
                j * wallBlockSize,
                i * wallBlockSize + wallOffset,
                wallSpaceWidth + wallOffset,
                wallSpaceWidth,
                wallInnerColor
            );
        }

        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
            createRect(
                j * wallBlockSize + wallOffset,
                i * wallBlockSize + wallOffset,
                wallSpaceWidth + wallOffset,
                wallSpaceWidth,
                wallInnerColor
            );
        }

        if (i < map.length - 1 && map[i + 1][j] == 1) {
            createRect(
                j * wallBlockSize + wallOffset,
                i * wallBlockSize + wallOffset,
                wallSpaceWidth,
                wallSpaceWidth + wallOffset,
                wallInnerColor
            );
        }

        if (i > 0 && map[i - 1][j] == 1) {
            createRect(
                j * wallBlockSize + wallOffset,
                i * wallBlockSize,
                wallSpaceWidth,
                wallSpaceWidth + wallOffset,
                wallInnerColor
            );
        }
      }
    }
  }
}

const drawFood = () => {
  walkArouondMap(map, ({ map, i, j }) => {
    if (map[i][j] === 2) {
      createRect(
        j * wallBlockSize + wallBlockSize / 3,
        i * wallBlockSize + wallBlockSize / 3,
        wallBlockSize / 3,
        wallBlockSize / 3,
        foodColor
      )
    }
  })
}

const drawScore = () => {
  scene.font = '22px Emulogic bold'
  scene.fillStyle = 'white'
  scene.fillText(`Score: ${score}`, 0, wallBlockSize * map.length + wallBlockSize)
}

const drawGhosts = () => {
  for (let i = 0; i < ghosts.length; i += 1) {
    ghosts[i].draw()
  }
}

const update = () => {
  pacman.movement()
  pacman.eat()
}

const draw = () => {
  createRect(0, 0, canvas.width, canvas.height, 'black')
  drawWals()
  drawFood()
  drawGhosts()
  drawScore()

  pacman.draw()
}

const gameLoop = () => {
  update()
  draw()
}

const createNewPacman = () => {
  pacman = new Pacman({
    x: wallBlockSize,
    y: wallBlockSize,
    width: wallBlockSize,
    height: wallBlockSize,
    speed: wallBlockSize / 5,
    initMovementDirection: directions.RIGHT
  })
}

const createGosts = () => {
  let newGhost = null
  
  for(let i = 0; i < 1; i += 1) {
    newGhost = new Ghost({
      x: 9 * wallBlockSize + i % 2 * wallBlockSize,
      y: 10 * wallBlockSize + i % 2 * wallBlockSize,
      width: wallBlockSize,
      height: wallBlockSize,
      speed: pacman.getSpeed() / 2,
      imageX: ghostLocations[i % 4].x,
      imageY: ghostLocations[i % 4].y,
      imageWidth: 124,
      imageHeight: 116,
      range: 6 + i
    })
  }

  ghosts.push(newGhost)
}

createNewPacman()
createGosts()

window.addEventListener('keydown', e => {
  let keyCode = e.keyCode;

  if (keyCode === 37 || keyCode === 65) {
    pacman.changeDirection(directions.LEFT)
  } else if (keyCode === 38 || keyCode === 87) {
    pacman.changeDirection(directions.UP)
  } else if (keyCode === 39 || keyCode === 68) {
    pacman.changeDirection(directions.RIGHT)
  } else if (keyCode === 40 || keyCode === 83) {
    pacman.changeDirection(directions.BOTTOM)
  }
})
const sceneInterval = setInterval(gameLoop, 1000 / fps)
