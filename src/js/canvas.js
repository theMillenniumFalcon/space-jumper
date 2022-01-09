/* eslint-disable indent */
import platform from '../assets/platform.png'
import hills from '../assets/hills.png'
import background from '../assets/background.png'
import platformSmallTall from '../assets/platformSmallTall.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = .5

class Player {
  constructor() {
    this.speed = 10
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y
    }

    this.image = image
    this.width = image.width
    this.height = image.height

  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y
    }

    this.image = image
    this.width = image.width
    this.height = image.height

  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}

let platformImg = createImage(platform)
let platformSmallTallImg = createImage(platformSmallTall)

let player = new Player()
let platforms = []
let genericObjects = []

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function init() {
  platformImg = createImage(platform)

  player = new Player()
  platforms = [
    new Platform({ x: platformImg.width * 4 + 300 - 2 + platformImg.width - platformSmallTallImg.width, y: 270, image: createImage(platformSmallTall) }),
    new Platform({ x: -1, y: 470, image: platformImg }),
    new Platform({ x: platformImg.width - 3, y: 470, image: platformImg }),
    new Platform({ x: platformImg.width * 2 + 100, y: 470, image: platformImg }),
    new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg }),
    new Platform({ x: platformImg.width * 4 + 300 - 2, y: 470, image: platformImg }),
    new Platform({ x: platformImg.width * 5 + 700 - 2, y: 470, image: platformImg }),
  ]
  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: createImage(background) }),
    new GenericObject({ x: -1, y: 0, image: createImage(hills) })
  ]

  scrollOffset = 0
}


function animate() {
  requestAnimationFrame(animate)
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
  genericObjects.forEach((genericObject) => {
    genericObject.draw()
  })
  platforms.forEach((platform) => {
    platform.draw()
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach((platform) => {
        platform.position.x -= player.speed
      })
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66
      })
    } else if (keys.left.pressed) {
      scrollOffset -= player.speed
      platforms.forEach((platform) => {
        platform.position.x += player.speed
      })
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66
      })
    }
  }

  // platform collision detection
  platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y
      && player.position.y + player.height + player.velocity.y >= platform.position.y
      && player.position.x + player.width >= platform.position.x
      && player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0
    }
  })

  // Win condition
  if (scrollOffset > platformImg.width * 5 + 300 - 2) {
    console.log('YOU WIN!!!')
  }

  // Loose condition
  if (player.position.y > canvas.height) {
    init()
  }

}
init()
animate()

window.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = true
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = true
      break

    case 87:
      console.log('up')
      player.velocity.y -= 10
      break
  }
})

window.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = false
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = false
      break

    case 87:
      console.log('up')
      break
  }
})
