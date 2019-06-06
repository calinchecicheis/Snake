const gameCanvas = document.getElementById("gameCanvas")
const ctx = gameCanvas.getContext("2d")
const scoreText = document.getElementById("score")
const messageText = document.getElementById("message")

let canvasWidth = gameCanvas.width
let canvasHeight = gameCanvas.height
const box = 20
let score = 0

// create the snake
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// create the food
let food = {
    x: Math.floor(Math.random() * 29 + 1) * box,
    y: Math.floor(Math.random() * 17 + 3) * box
}

//control the snake
let d

document.addEventListener("keydown" , (event) => {

    let key = event.keyCode

    if (key == 37 && d != "RIGHT") {
        d = "LEFT"
    } else if (key == 38 && d != "DOWN") {
        d = "UP"
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT"
    } else if (key == 40 && d != "UP") {
        d = "DOWN"
    }
})

// cheack collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    console.log(snake.length)
    for( let i = 0; i < snake.length ; i++) {
        ctx.fillStyle = "green"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)

        
    }

    ctx.fillStyle = 'red'
    ctx.fillRect(food.x, food.y, box, box)
    ctx.strokeStyle = "black";
    ctx.strokeRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //switch direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score += 10
        scoreText.innerText = score
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop()
        
    }

    //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over
    if (snakeX < 0 || snakeX > canvasWidth-box || snakeY < 0 || snakeY > canvasHeight-box || collision(newHead, snake)) {
        clearInterval(game);
        messageText.innerText = "Game Over"
    }

    snake.unshift(newHead)
}

let game = setInterval(draw, 200)
