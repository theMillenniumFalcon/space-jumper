const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 100
        this.height = 100
    }

    draw() {
        context.fillRect(this.position.x, this.position.y, this.position.width, this.position.height)
    }
}

const player = new Player(100, 100, 100, 100)
player.draw()