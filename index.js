const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class theHeroKinda {
    constructor() {
        this.position = {
          x: 200,
          y: 200  
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src ="./img/theHero.gif"

        this.image = image 
        this.width = 100
        this.height = 100

    }

    draw() {
        // c.fillStyle = "red"
        // c.fillRect(this.position.x,this.position.y, this.width, this.height)
c.drawImage(this.image,this.position.x, this.position.y)
    }
}
const player = new theHeroKinda()
player.draw()

function animate(){
    requestAnimationFrame(animate)
    player.draw()
}

animate()