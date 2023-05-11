class Ghost {
  constructor({ x, y, width, height, speed, imageX, imageY, imageWidth, imageHeight, range }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = speed
    this.imageX = imageX
    this.imageY = imageY
    this.imageWidth = imageWidth
    this.imageHeight = imageHeight
    this.range = range
  }

  draw() {
    scene.save()
    scene.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
    scene.restore()
  }
}