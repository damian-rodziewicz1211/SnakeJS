const canvas = document.getElementById("game-board");
var ctx = canvas.getContext("2d");

let snake = [ {x: 200, y: 200}, {x: 190,y:200}, {x: 180, y: 200}, {x: 170, y: 200}];

let dx = 10;
let dy = 0;
let food_x;
let food_y;


function clearBoard(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function drawSnakePart(snakePart) {
    ctx.beginPath();
    ctx.rect(snakePart.x, snakePart.y, 10, 10);
    ctx.fillStyle = "#00AA55";
    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
}

function moveSnake(){

    //declare head variable responsible for tracking snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    //shifting snake's head simulating movement
    snake.unshift(head);

    const hasEatenFood = head.x === food_x && head.y === food_y;

    if(hasEatenFood){
        generateFood();
    }
    else {
        //removing last element from the snake array
        snake.pop();
    }
}

function randomFood(min, max){
    return Math.round((Math.random() * (max-min) + min) / 10) * 10
}

function generateFood(){

    food_x = randomFood(0, canvas.width-10);
    food_y = randomFood(0, canvas.height-10);

    //preventing generation of a food in snake body
    snake.forEach( function preventingGeneratingInBody(snakePart){
        const generatedInBody = snakePart.x == food_x && snakePart.y == food_y;

        if(generatedInBody)
            generateFood();
    });
}

function drawFood(){
    ctx.beginPath();
    ctx.rect(food_x, food_y, 10, 10);
    ctx.fillStyle = "#00AA55";
    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
}
window.addEventListener('keydown', changingDirection, true);

function changingDirection(e){

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingLeft = dx === -10;
    const goingUp = dy === -10;
    const goingRight = dx === 10;
    const goingDown = dy === 10;

    
    switch(e.keyCode){

        case LEFT:
            if(!goingRight){
                dx = -10;
                dy = 0;
            }
        break;

        case UP:
            if(!goingDown){
                dx = 0;
                dy = -10;
            }
            break;

        case RIGHT:
            if(!goingLeft){
                dx = 10;
                dy = 0;
            }
            break;

        case DOWN:
            if(!goingUp){
                dx = 0;
                dy = 10;
            }
            break;
    };
    
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}

function gameOver(){

    for(let i = 2; i< snake.length; i++) {
        const collision = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
   
        if (collision)
            return true;
    }
    
    const leftBoundry = snake[0].x < 0;
    const rightBoundry = snake[0].x > canvas.width - 10;
    const topBoundry = snake[0].y < 0;
    const bottomBoundry = snake[0].y > canvas.height - 10;

    return leftBoundry || rightBoundry || topBoundry || bottomBoundry
    
}

function main(){
    setTimeout(function singleFrame(){

        if (gameOver())
            return;

        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();

        main();

    },50);
}

main();
generateFood();





