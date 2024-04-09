const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const message = document.getElementById("message");

let player1Pos = { x: 30, y: 30 };
let player2Pos = { x: 450, y: 450 };
let player1Speed = 5;
let player2Speed = 5;
let isGameOver = false;
let isPlayer1Chasing;
let timeRemaining = 30;
let countdownTimer;
let player1Score = 0;
let player2Score = 0;

let keys = {
  w: false,
  s: false,
  a: false,
  d: false,
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", (e) => {
  if (isGameOver) return;
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function startGame() {
  isPlayer1Chasing = Math.random() < 0.5;
  message.textContent = isPlayer1Chasing ? "Blue circle is chasing!" : "Red circle is chasing!";
  timeRemaining = 30;
  countdownTimer = setInterval(updateCountdown, 1000);
  player1Score = 0;
  player2Score = 0;
  updateScoreboard();
}

function updateCountdown() {
  timeRemaining--;
  countdown.textContent = timeRemaining;
  if (timeRemaining <= 0) {
    clearInterval(countdownTimer);
    isGameOver = true;
    if (isPlayer1Chasing) {
      message.textContent = "Red circle wins by avoiding capture!";
      player2Score++;
    } else {
      message.textContent = "Blue circle wins by avoiding capture!";
      player1Score++;
    }
    updateScoreboard();
  }
}

function checkCollision() {
  let rect1 = player1.getBoundingClientRect();
  let rect2 = player2.getBoundingClientRect();

  if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
    clearInterval(countdownTimer);
    isGameOver = true;
    if (isPlayer1Chasing) {
      message.textContent = "Blue circle wins by catching Red circle!";
      player1Score++;
    } else {
      message.textContent = "Red circle wins by catching Blue circle!";
      player2Score++;
    }
    updateScoreboard();
  }
}

function updateScoreboard() {
  document.getElementById("player1-score").textContent = player1Score;
  document.getElementById("player2-score").textContent = player2Score;
}

function gameLoop() {
  if (keys.w) player1Pos.y -= player1Speed;
  if (keys.s) player1Pos.y += player1Speed;
  if (keys.a) player1Pos.x -= player1Speed;
  if (keys.d) player1Pos.x += player1Speed;

  if (keys.ArrowUp) player2Pos.y -= player2Speed;
  if (keys.ArrowDown) player2Pos.y += player2Speed;
  if (keys.ArrowLeft) player2Pos.x -= player2Speed;
  if (keys.ArrowRight) player2Pos.x += player2Speed;

  player1.style.left = player1Pos.x + "px";
  player1.style.top = player1Pos.y + "px";

  player2.style.left = player2Pos.x + "px";
  player2.style.top = player2Pos.y + "px";

  checkCollision();
}

startGame();
setInterval(gameLoop, 1000 / 60);
