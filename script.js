//your code here
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");
  
  let score = 0;
  let snake = [{ row: 20, col: 1 }]; // Snake initial position
  let food = { row: getRandomPosition(), col: getRandomPosition() }; // Food initial position
  let direction = "right";

  function getRandomPosition() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function renderSnake() {
    snake.forEach(segment => {
      const snakePixel = document.createElement("div");
      snakePixel.classList.add("pixel", "snakeBodyPixel");
      snakePixel.style.gridColumn = segment.col;
      snakePixel.style.gridRow = segment.row;
      gameContainer.appendChild(snakePixel);
    });
  }

  function renderFood() {
    const foodPixel = document.createElement("div");
    foodPixel.classList.add("pixel", "food");
    foodPixel.id = `pixel${food.row}-${food.col}`;
    foodPixel.style.gridColumn = food.col;
    foodPixel.style.gridRow = food.row;
    gameContainer.appendChild(foodPixel);
  }

  function updateScore() {
    scoreElement.textContent = score;
  }

  function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
      case "up":
        head.row--;
        break;
      case "down":
        head.row++;
        break;
      case "left":
        head.col--;
        break;
      case "right":
        head.col++;
        break;
    }

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.row === food.row && head.col === food.col) {
      score++;
      updateScore();
      food = { row: getRandomPosition(), col: getRandomPosition() };
      const foodPixel = document.getElementById(`pixel${food.row}-${food.col}`);
      if (foodPixel) {
        foodPixel.remove();
      }
    } else {
      const tail = snake.pop();
      const tailPixel = document.getElementById(`pixel${tail.row}-${tail.col}`);
      if (tailPixel) {
        tailPixel.remove();
      }
    }

    renderSnake();

    // Check for collision with the walls
    if (head.row < 1 || head.row > 20 || head.col < 1 || head.col > 20) {
      alert("Game Over! Your score: " + score);
      clearInterval(intervalId);
    }
  }

  renderSnake();
  renderFood();
  updateScore();

  const intervalId = setInterval(moveSnake, 100);

  // Listen for arrow key presses to change direction
  document.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  });
});

