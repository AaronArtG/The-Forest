const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class theHeroKinda {
    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }
this.rotation = 0 
        const image = new Image()
        image.src ="./img/theHero.gif"
        image.onload = () => {
            const scale = 0.40
            this.image = image 
            this.width = image.width * scale
            this.height = image.height* scale
                   this.position = {
          x: canvas.width / 2 - this.width / 2,
          y: canvas.height - this.height - 20
        }   
        }
 }

draw() {
        // c.fillStyle = "red"
        // c.fillRect(this.position.x,this.position.y, this.width, this.height)
    c.save()
    c.translate(
        player.position.x + player.width / 2, 
        player.position.y + player.height / 2 )

        c.rotate(this.rotation)

    c.translate(
        - player.position.x - player.width / 2, 
        - player.position.y - player.height / 2 )


     c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width, 
        this.height
        )
        c.restore()
    }
    update(){
        if (this.image) {
        this.draw()
        this.position.x += this.velocity.x   
        }
    }
}


class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 6
    }


    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = "black"
        c.fill()
        c.closePath()

    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}



class BadTrees {
    constructor({position}) {

        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src ="./img/evilTree.jpg"
        image.onload = () => {
            const scale = 0.20
            this.image = image 
            this.width = image.width * scale
            this.height = image.height* scale
        this.position = {
          x: position.x,
          y: position.y 
        }   
        }
 }

draw() {
        // c.fillStyle = "red"
        // c.fillRect(this.position.x,this.position.y, this.width, this.height)



     c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width, 
        this.height
        )
     
    }
    update(){
        if (this.image) {
        this.draw()
        this.position.x += this.velocity.x  
        this.position.y += this.velocity.y   
        }
    }
}



class Grid {
    constructor(){
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 0,
            y: 0
        }
    this.badTree = [
       
    ]
    for(let i = 0;i < 10; i++){
        this.badTree.push(new BadTrees({position:{
            x:i * 10,
            y:0
        }}))
    }
    console.log(this.badTree)
    }

    update(){}
}

const player = new theHeroKinda()
const projectiles = []
const grids = [new Grid()]

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    },
}








function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "#E6E6E6"
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    player.update()
    projectiles.forEach((projectile, index) => {

        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() =>{ 
             projectiles.splice(index, 1)    
            }, 0)
           
        } else {
        projectile.update()
        }
    })

    grids.forEach(grid =>{
      grid.update()  
      grid.badTree.forEach(BadTrees =>{
        BadTrees.update()
      })
    })

    if (keys.a.pressed && player.position.x >= 0) {
     player.velocity.x = -9
     player.rotation = -0.15
} else if (keys.d.pressed && player.position.x +player.width <= canvas.width){
    player.velocity.x = 9
    player.rotation = 0.15
} else {
        player.velocity.x = 0
        player.rotation = 0
    }
}

animate()

addEventListener('keydown',({key}) => {
    // console.log(key)
    switch(key){
        case'a':
        // console.log('left')
    
        keys.a.pressed = true
        break
        case'd':
        // console.log('right')
        keys.d.pressed = true
        break
        case' ':
        // console.log('space')
        projectiles.push(
            new Projectile({
            position: {
                x: player.position.x + player.width / 2,
                y: player.position.y
            },
            velocity: {
                x:0,
                y:-10
            }
        }))
        break

    }
})

addEventListener('keyup',({key}) => {
    // console.log(key)
    switch(key){
        case'a':
        // console.log('left')
    
        keys.a.pressed = false
        break
        case'd':
        // console.log('right')
        keys.d.pressed = false
        break
        case' ':
        // console.log('space')
        break

    }
})