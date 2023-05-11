class Pacman {
  constructor({ x, y, width, height, speed, initMovementDirection }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = initMovementDirection;
    this.nextDirection = this.direction;
    this.currentFrame = 1;
    this.frameCount = 7;
    this.test = x

    setInterval(() => {
      this.changeAnimation()
    }, 100)
  }

  movement() {
    this.changeDirectionIfPossible();
    this.moveForward();
    if (this.checkCollision()) {
        this.moveBackward();
    }
  }

  moveForward() {
    if (this.direction === directions.RIGHT) {
      this.x += this.speed
    } else if (this.direction === directions.UP) {
      this.y -= this.speed
    } else if (this.direction === directions.LEFT) {
      this.x -= this.speed
    } else if (this.direction === directions.BOTTOM) {
      this.y += this.speed
    }
  }

  moveBackward() {
    if (this.direction === directions.RIGHT) {
      this.x -= this.speed
    } else if (this.direction === directions.UP) {
      this.y += this.speed
    } else if (this.direction === directions.LEFT) {
      this.x += this.speed
    } else if (this.direction === directions.BOTTOM) {
      this.y -= this.speed
    }
  }

  eat() {
    walkArouondMap(map, ({ map, i, j }) => {
      if (map[i][j] === 2 && this.getX() === j && this.getY() === i) {
        map[i][j] = 3
        score += 1
      }
    })
  }

  checkCollision() {
    return map[this.getY()][this.getX()] === 1
      || map[this.getY()][this.getXEnd()] === 1
      || map[this.getYEnd()][this.getX()] === 1
      || map[this.getYEnd()][this.getXEnd()] === 1
  }

  checkGhostCollision() {

  }

  changeDirectionIfPossible() {
    if(this.direction === this.nextDirection) return
    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForward()
    if (this.checkCollision()) {
      this.moveBackward()
      this.direction = tempDirection
    } else {
      this.moveBackward()
    }
  }

  changeDirection(direction) {
    this.nextDirection = direction
  }

  changeAnimation() {
    this.currentFrame = this.currentFrame === this.frameCount
      ? 1
      : this.currentFrame + 1
  }

  draw() {
    scene.save()
    scene.translate(
      this.x + wallBlockSize / 2,
      this.y + wallBlockSize / 2
    )
    scene.rotate((this.direction * 90 * Math.PI) / 180)
    scene.translate(
      -this.x - wallBlockSize / 2,
      -this.y - wallBlockSize / 2
    )
    scene.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * wallBlockSize,
      0,
      wallBlockSize,
      wallBlockSize,
      this.x,
      this.y,
      this.width,
      this.height
    )
    scene.restore()
  }

  getX() {
    return parseInt(this.x / wallBlockSize)
  }
  getY() {
    return parseInt(this.y / wallBlockSize)
  }
  getXEnd() {
    return parseInt((this.x + 0.999 * wallBlockSize) / wallBlockSize)
  }
  getYEnd() {
    return parseInt((this.y + 0.999 * wallBlockSize) / wallBlockSize)
  }

  getSpeed() {
    return this.speed
  }
}