document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.getElementById("gameBoard");
  const newGameBtn = document.getElementById("newGameBtn");

  let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  renderBoard();
  addNewTile();
  addNewTile();
  renderBoard();

  newGameBtn.addEventListener("click", function () {
    board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addNewTile();
    addNewTile();
    renderBoard();
  });

  function renderBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = board[i][j] === 0 ? "" : board[i][j];
        gameBoard.appendChild(cell);
      }
    }
  }

  function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { row, col } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function move(direction) {
    switch (direction) {
      case "up":
        for (let j = 0; j < 4; j++) {
          for (let i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
              let k = i;
              while (k > 0 && board[k - 1][j] === 0) {
                board[k - 1][j] = board[k][j];
                board[k][j] = 0;
                k--;
              }
              if (k > 0 && board[k - 1][j] === board[k][j]) {
                board[k - 1][j] *= 2;
                board[k][j] = 0;
              }
            }
          }
        }
        break;
      case "down":
        for (let j = 0; j < 4; j++) {
          for (let i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
              let k = i;
              while (k < 3 && board[k + 1][j] === 0) {
                board[k + 1][j] = board[k][j];
                board[k][j] = 0;
                k++;
              }
              if (k < 3 && board[k + 1][j] === board[k][j]) {
                board[k + 1][j] *= 2;
                board[k][j] = 0;
              }
            }
          }
        }
        break;
      case "left":
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
              let k = j;
              while (k > 0 && board[i][k - 1] === 0) {
                board[i][k - 1] = board[i][k];
                board[i][k] = 0;
                k--;
              }
              if (k > 0 && board[i][k - 1] === board[i][k]) {
                board[i][k - 1] *= 2;
                board[i][k] = 0;
              }
            }
          }
        }
        break;
      case "right":
        for (let i = 0; i < 4; i++) {
          for (let j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
              let k = j;
              while (k < 3 && board[i][k + 1] === 0) {
                board[i][k + 1] = board[i][k];
                board[i][k] = 0;
                k++;
              }
              if (k < 3 && board[i][k + 1] === board[i][k]) {
                board[i][k + 1] *= 2;
                board[i][k] = 0;
              }
            }
          }
        }
        break;
    }
  }

  let touchStartX, touchStartY, touchEndX, touchEndY;

  document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener(
    "touchmove",
    function (event) {
      event.preventDefault(); // Запобігаємо прокрутці сторінки під час торкання
    },
    { passive: false }
  );

  document.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
  });

  function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const threshold = 50; // Мінімальна відстань для визначення свайпу

    if (Math.abs(dx) > Math.abs(dy)) {
      // Горизонтальний свайп
      if (Math.abs(dx) > threshold) {
        // Визначаємо напрямок свайпу
        const direction = dx > 0 ? "right" : "left";
        move(direction);
        renderBoard();
        addNewTile();
        addNewTile();
      }
    } else {
      // Вертикальний свайп
      if (Math.abs(dy) > threshold) {
        // Визначаємо напрямок свайпу
        const direction = dy > 0 ? "down" : "up";
        move(direction);
        renderBoard();
        addNewTile();
        addNewTile();
      }
    }
  }

  document.addEventListener("keydown", function (event) {
    const key = event.key;
    switch (key) {
      case "ArrowUp":
        move("up");
        break;
      case "ArrowDown":
        move("down");
        break;
      case "ArrowLeft":
        move("left");
        break;
      case "ArrowRight":
        move("right");
        break;
      default:
        break;
    }
    renderBoard();
    addNewTile();
    addNewTile();
  });
});
