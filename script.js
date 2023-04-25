const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let foodX, foodY;
let gameOver = false;
let snakeX = 10, snakeY=10;
let snakeBody = [];
let velocityX = 0, velocityY=0;
let setIntervalId;
let score = 0;
// getting high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score:${highScore}`;

const changePositionOfFood = () =>{
    // passing a randam position from 0-30
    foodX = Math.floor(Math.random()* 30 )+1;
    foodY = Math.floor(Math.random()* 30 )+1;
}
function handleGameOver()
{
    // clearing the timer and reloading the page
    clearInterval(setIntervalId);
    alert("Game is over! press ok to replay");
    location.reload();
}
const changeDirection = (e) =>{
    // console.log(e);
    // changing the velocity of head based on keypress
    if(e.key === "ArrowLeft" && velocityX != 1){
         velocityX = -1;
         velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1){
         velocityX = 1;
         velocityY = 0;
    }else if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
         velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
         velocityY = 1;
    }
}
controls.forEach(key => {
    // calling the changeDirection fun on each key click and passing key dataset obj
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
})
function initGame(){
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/ ${foodX}"></div>`;
    // changing food position when head eats the food
    if(snakeX === foodX && snakeY === foodY)
    {
       changePositionOfFood();
       snakeBody.push([foodX,foodY]);// pushing the food position to snake body
    //    console.log(snakeBody);
        score++;// increment score by 1
        highScore = score>=highScore ? score : highScore;
        localStorage.setItem("high-score",highScore)
        scoreElement.innerText = `Score:${score}`;
        highScoreElement.innerText = `High Score:${highScore}`;

    }
    for (let i = snakeBody.length-1; i>0; i--){
        // shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i-1];
       
    }
    snakeBody[0] = [snakeX,snakeY];// setting a first element of snakeBody for to current position
    // updateing the position of head based on current velocity
    snakeX +=velocityX;
    snakeY +=velocityY;
    if(snakeX <= 0 || snakeX >30 || snakeY <= 0 || snakeY >30){
    //   console.log("Game over");
        gameOver = true;
    }
    for(let i = 0; i< snakeBody.length;i++){
        //adding each div to snake's body
       htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/ ${snakeBody[i][0]}"></div>`;
      if (i !== 0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]) {
        gameOver = true;
      }
    }
    playBoard.innerHTML = htmlMarkup;
}
changePositionOfFood();
// initGame();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);