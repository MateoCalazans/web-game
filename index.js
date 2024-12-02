const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "./images/little-town.png";
const playerDownImage = new Image();
playerDownImage.src = "./images/playerDown.png";
const playerUpImage = new Image();
playerUpImage.src = "./images/playerUp.png";
const playerLeftImage = new Image();
playerLeftImage.src = "./images/playerLeft.png";
const playerRightImage = new Image();
playerRightImage.src = "./images/playerRight.png";
const foregroundImage = new Image();
foregroundImage.src = "./images/foregroundObjects.png";
const lifeImage = new Image();
lifeImage.src = "./images/life.png";
const animalsImage = new Image();
animalsImage.src = "./images/animals.png";
canvas.width = 1024;
canvas.height = 576;
i = 0, j = 0, k = 0, contador = 0;

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=54){
    collisionsMap.push(collisions.slice(i, 54 + i))
}

const boundaries = []
const offset = {
    x: -295,
    y: -150
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1742)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const life1 = new lifeSprite({
    position :{
        x: canvas.width - 1000,
        y: canvas.height - 550
    },
    image: lifeImage,
    frames: {
        max: 2
    }
})

const life2 = new lifeSprite({
    position :{
        x: canvas.width - 960,
        y: canvas.height - 550
    },
    image: lifeImage,
    frames: {
        max: 2
    }
})

const life3 = new lifeSprite({
    position :{
        x: canvas.width - 920,
        y: canvas.height - 550
    },
    image: lifeImage,
    frames: {
        max: 2
    }  
})

const chicken = new Animal({
    position: { x: -50, y: 350 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const chicken1 = new Animal({
    position: { x: 20, y: 385 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width:  64, height: 96 }
});

const chicken2 = new Animal({
    position: { x: -40, y: 410 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const pig = new Animal({
    position: { x: 700, y: 210 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 } 
});

const pig1 = new Animal({
    position: { x: 750, y: 158 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const cow = new Animal({
    position: { x: -190, y: 580 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const cow1 = new Animal({
    position: { x: -100, y: 550 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const player = new Sprite({
    position :{
        x: canvas.width/2 - 156/8,
        y: canvas.height/2 + 46
    },
    image: playerDownImage,
    frames: {
        max: 6
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    },
    q: {
        pressed: false
    }

}

const movables = [background, ...boundaries, foreground, chicken, chicken1, chicken2, pig, pig1, cow, cow1]

function rectangularCollision ({rectangle1, rectangle2}){
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) =>{
        boundary.draw()
   
    })
    player.draw()
    foreground.draw()
    life1.draw(k)
    life2.draw(j)
    life3.draw(i)
    chicken.draw(0, 25)
    chicken1.draw(0, 35)
    chicken2.draw(0, 30)
    pig.draw(32, 30)
    pig1.draw(32, 35)
    cow.draw(64, 30)
    cow1.draw(64, 35)

    let moving = true
    player.moving = false
    
    if (keys.space.pressed){
        if (contador == 0){
            i = 1
            keys.space.pressed = false
        }else if (contador == 1){
            j = 1
            keys.space.pressed = false 
        }else if (contador == 2){   
            k = 1
            keys.space.pressed = false
        }
        contador++;
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 2
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y +=2
        })
    }else if(keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x + 2,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x +=2
        })
    }else if(keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x - 2,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x -=2
        })
    }
    else if(keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 2
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y -=2
        })
    }
}
animate()

let lastKey = ''

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
        case ' ':
            keys.space.pressed = true
            lastKey = ' '
            break;
        case 'q':
            keys.q.pressed = true
            lastKey = 'q'
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case ' ':
            keys.space.pressed = false
            break;
        case 'q':
            keys.q.pressed = false
            break;
    }
})