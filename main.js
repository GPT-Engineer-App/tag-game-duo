const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const message = document.getElementById("message");

let player1Pos = { x: 30, y: 30 };
let player2Pos = { x: 450, y: 450 };
let player1Speed = 5;
let player2Speed = 5;
let isGameOver = false;

document.addEventListener("keydown", (e) => {
  if (isGameOver) return;

  switch (e.key) {
    case "w":
      player1Pos.y -= player1Speed;
      break;
    case "s":
      player1Pos.y += player1Speed;
      break;
    case "a":
      player1Pos.x -= player1Speed;
      break;
    case "d":
      player1Pos.x += player1Speed;
      break;
    case "ArrowUp":
      player2Pos.y -= player2Speed;
      break;
    case "ArrowDown":
      player2Pos.y += player2Speed;
      break;
    case "ArrowLeft":
      player2Pos.x -= player2Speed;
      break;
    case "ArrowRight":
      player2Pos.x += player2Speed;
      break;
  }
});

function checkCollision() {
  let rect1 = player1.getBoundingClientRect();
  let rect2 = player2.getBoundingClientRect();

  if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
    isGameOver = true;
    message.textContent = "Player 1 Wins!";
  }
}

function gameLoop() {
  player1.style.left = player1Pos.x + "px";
  player1.style.top = player1Pos.y + "px";

  player2.style.left = player2Pos.x + "px";
  player2.style.top = player2Pos.y + "px";

  checkCollision();
}

setInterval(gameLoop, 1000 / 60); // 60 fps
