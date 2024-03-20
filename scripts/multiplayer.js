const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
  'red', 'orange', 'green', 'purple', 'blue', 'cyan', 'yellow', 'white',
];
const BRICK_LAYOUT = [
    [
      [
        [1, 7, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 1],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 1, 7],
        [7, 1, 7],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [7, 1, 7],
        [7, 1, 1],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 1],
        [1, 1, 1],
        [7, 7, 7],
      ],
    ],
    [
      [
        [1, 7, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 1, 1],
        [1, 1, 7],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 7, 7],
        [7, 1, 1],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 7],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 7, 1],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 7],
        [7, 1, 1],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
      ],
      [
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 1, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
    ],
  ];
const KEYBOARD = {
  LEFT_P1: 'ArrowLeft',
  RIGHT_P1: 'ArrowRight',
  UP_P1: 'ArrowUp',
  DOWN_P1: 'ArrowDown',
  LEFT_P2: 'KeyA',
  RIGHT_P2: 'KeyD',
  UP_P2: 'KeyW',
  DOWN_P2: 'KeyS',
};

const WHITE_COLOR_ID = 7;
let level = 0;
const LEVEL_THRESHOLD = 1000;

const board1Canvas = document.getElementById('board1');
const board2Canvas = document.getElementById('board2');

const ctx1 = board1Canvas.getContext('2d');
const ctx2 = board2Canvas.getContext('2d');

// Đảm bảo rằng kích thước của cả hai bảng là giống nhau
ctx1.canvas.width = ctx2.canvas.width = COLS * BLOCK_SIZE;
ctx1.canvas.height = ctx2.canvas.height = ROWS * BLOCK_SIZE;

class Board {
  constructor(ctx) {
      this.ctx = ctx;
      this.grid = this.generateWhiteBoard(); //Lưới trong trạng thái đầu
      this.score = 0; //Điểm khởi đầu
      this.gameOver = false; // gameover
      this.isPlaying = false; // playing
      this.clearAudio = new Audio('../sounds/clear.wav'); // sound
      this.dropInterval = 1000; // Thời gian rơi ban đầu (1 giây)
      this.dropSpeed = null;
      this.level = 0;

      // Hiển thị cấp độ
      this.levelDisplay = document.getElementById('level');
      this.levelDisplay.innerHTML = this.level;

      this.dropSpeed = setInterval(() => {
        if (!board.gameOver) {
          brick.moveDown();
        }
      }, this.dropInterval);
      
  }
  //chơi lại
  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    this.level = 0;
    document.getElementById('score').innerHTML = this.score;
    document.getElementById('level').innerHTML = this.level;
    this.drawBoard();
  }
  
  //tạo bảng
  generateWhiteBoard() {
      return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
  }
  //vẽ cell
  drawCell(xAxis, yAxis, colorId) {
      this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
      this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }
  //vẽ bảng
  drawBoard() {
      for (let row = 0; row < this.grid.length; row++) {
          for (let col = 0; col < this.grid[0].length; col++) {
              this.drawCell(col, row, this.grid[row][col]);
          }
      }
  }
  //xử lý hàng khi đã đầy
  handleCompleteRows() {
    const latestGrid = board.grid.filter((row) =>{
      return row.some(col => col === WHITE_COLOR_ID);
    });

    const newScore = ROWS - latestGrid.length;
    const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));

    if(newScore){
      board.grid = [...newRows, ...latestGrid];
      this.handleScore(newScore * 100);
      this.clearAudio.play();
      console.log({latestGrid});
      
    }
    
  }
  // Xử lý điểm
  handleScore(newScore) {
    this.score += newScore;
    document.getElementById('score').innerHTML = this.score;
  
    while (this.score >= (this.level + 1) * LEVEL_THRESHOLD){
      this.level++;
      document.getElementById('level').innerHTML = this.level;
  
      this.dropInterval = 1000 - this.level * 50;
      clearInterval(this.dropSpeed);
      this.dropSpeed = setInterval(() => {
        if (!this.gameOver) {
          brick.moveDown();
        }
      }, this.dropInterval);
    }
  }
  
  
  //xử lý gameover
  handleGameOver(){
    this.gameOver = true;
    alert('GAME OVER!!!');
    this.isPlaying = false;
  }
}

//gạch
class Brick {
constructor(id, startCol) {
  this.id = id;
  this.layout = BRICK_LAYOUT[id];
  this.activeIndex = 0;
  this.colPos = startCol || Math.floor(COLS / 2) - 1; // Sử dụng cột được truyền vào hoặc cột giữa màn hình
  this.rowPos = 0;
}
//vẽ gạch
draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
        for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
            if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                board.drawCell(col + this.colPos, row + this.rowPos, this.id);
            }
        }
    }
} 
//xóa gạch
clear() {
  for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
          if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
              board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
          }
      }
  }
} 
// các di chuyển của gạch
moveLeft(){
  if(!this.handleCollision(this.rowPos, this.colPos -1, this.layout[this.activeIndex])){
    this.clear();
    this.colPos--;
    this.draw(); 
  }
     
}

moveRight(){
  if(!this.handleCollision(this.rowPos, this.colPos +1, this.layout[this.activeIndex])){
    this.clear();
    this.colPos++;
    this.draw();    
  }
  
}

moveDown(){
  if(!this.handleCollision(this.rowPos +1, this.colPos, this.layout[this.activeIndex])){
    this.clear();
    this.rowPos++;
    this.draw();  
    return;
  }
  this.handleGoals();

  if(!board.gameOver){
    generateNewBrick();
  }
}

dropToBottom() {
  while (!brick.handleCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
    this.moveDown();
  }
}

rotate(){
  if(!this.handleCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])){
    this.clear();
    this.activeIndex = (this.activeIndex + 1) % 4;
    this.draw();
  }
  
}
// xử lý va chạm
handleCollision(nextRow, nextCol, nextLayout){   
  for (let row = 0; row < nextLayout.length; row++) {
    for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
            if(
              col + nextCol < 0 ||
              col + nextCol >= COLS ||
              row + nextRow >= ROWS ||
              board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
              ) return true;
        }
    }
  }
  return false;
}

handleGoals(){
  if(this.rowPos <= 0){
     board.handleGameOver();
    return;
  }

  for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
    for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
      if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
        board.grid[row + this.rowPos][col + this.colPos] = this.id;
      }
    }
  }

  board.handleCompleteRows();
  board.drawBoard();
}

}




const board1 = new Board(ctx1);
const board2 = new Board(ctx2);

board1.drawBoard();
board2.drawBoard();

let brick1;
let brick2;

let gameStarted = false;

document.getElementById('play').addEventListener('click', () => {
  if(!gameStarted){
    gameStarted = true;
    board1.reset();
    board2.reset();
    board1.isPlaying = true;
    board2.isPlaying = true;
    generateNewBricks();
    startTimer();
    const refresh =setInterval(() =>{
      if((!board1.gameOver)||(!board2.gameOver)){
        brick1.moveDown();
        brick2.moveDown();
      }else{
        clearInterval(refresh);
      }
    }, board1.dropInterval, board2.dropInterval);
  }
});

document.addEventListener('keydown', (e) => {
  if (!board1.gameOver && board1.isPlaying && !board2.isPlaying) {
    e.preventDefault();
    switch (e.code) {
      case KEYBOARD.LEFT_P1:
        board1.moveLeft();
        break;
      case KEYBOARD.RIGHT_P1:
        board1.moveRight();
        break;
      case KEYBOARD.UP_P1:
        board1.rotate();
        break;
      case KEYBOARD.DOWN_P1:
        board1.moveDown();
        break;
      default:
        break;
    }
  } else if (!board2.gameOver && board2.isPlaying) {
    e.preventDefault();
    switch (e.code) {
      case KEYBOARD.LEFT_P2:
        board2.moveLeft();
        break;
      case KEYBOARD.RIGHT_P2:
        board2.moveRight();
        break;
      case KEYBOARD.UP_P2:
        board2.rotate();
        break;
      case KEYBOARD.DOWN_P2:
        board2.moveDown();
        break;
      default:
        break;
    }
  }
});

// Hàm rớt gạch nhanh
function dropToBottom() {
  while (!brick.handleCollision(brick.rowPos + 1, brick.colPos, brick.layout[brick.activeIndex])) {
    brick.moveDown();
  }
}

function generateNewBricks() {
  const randomCol1 = Math.floor(Math.random() * (COLS - 3));
  const randomCol2 = Math.floor(Math.random() * (COLS - 3));
  brick1 = new Brick(Math.floor(Math.random() * BRICK_LAYOUT.length), randomCol1);
  brick2 = new Brick(Math.floor(Math.random() * BRICK_LAYOUT.length), randomCol2);
}
console.table(board1.grid);
console.table(board2.grid);

//xử lý thời gian
let timerElement = document.getElementById('timer');
let startTime = 0;

function startTimer() {
  startTime = Date.now();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

  const minutes = Math.floor(elapsedTimeInSeconds / 60);
  const seconds = elapsedTimeInSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  timerElement.innerHTML = `Time: ${formattedMinutes}:${formattedSeconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.getElementById('settingsButton');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const volumeControl = document.getElementById('volumeControl');
  const musicSelect = document.getElementById('musicSelect');
  const backgroundMusic = new Audio('./sounds/themetetris.mp3');
  const unmuteIcon = document.getElementById('unmute');
  const muteIcon = document.getElementById('mute');
  let isMuted = false;
  backgroundMusic.play();
  backgroundMusic.loop = true;
  document.getElementById("sound-control").addEventListener('click', () => {
    if (isMuted) {
        backgroundMusic.play();
        backgroundMusic.loop = true;
        isMuted = false;
        unmuteIcon.style.display = "inline";
        muteIcon.style.display = "none";
    } else {
        backgroundMusic.pause();  
        isMuted = true;
        unmuteIcon.style.display = "none";
        muteIcon.style.display = "inline";
    }
  });
  volumeControl.addEventListener('input', () => {
    const volume = volumeControl.value / 100;
    backgroundMusic.volume = volume;
  });
  
  
  
  musicSelect.addEventListener('change', () => {
    const selectedMusic = musicSelect.value;
    backgroundMusic.src = selectedMusic;
    backgroundMusic.play();
  });
  
  
  
  settingsButton.addEventListener('click', () => {
      settingsModal.classList.remove('hidden');
  });

  closeSettings.addEventListener('click', () => {
      settingsModal.classList.add('hidden');
  });

});



// Thêm mã JavaScript này vào phần scripts/index.js hoặc nơi khác tùy thuộc vào cách bạn tổ chức mã của mình
document.getElementById("settingsButton").addEventListener('click', function() {
  document.getElementById("settingsModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener('click', function() {
  document.getElementById("settingsModal").style.display = "none";
});

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("settingsModal").style.display = "none";
  }
}
