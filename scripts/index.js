const COLS = 10; // Số cột trong màn hình
const ROWS = 25; // Số hàng trong màn hình
const BLOCK_SIZE = 30; // Kích thước của mỗi ô vuông
const COLOR_MAPPING = [
  'red', 'orange', 'green', 'purple', 'blue', 'cyan', 'yellow', 'white',
]; // Mảng màu cho các khối vuông

  // Cấu trúc của các khối vuông
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

//Điều khiển
const KEYBOARD = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  SPACE: 'Space',
}

const WHITE_COLOR_ID = 7;
let level = 0;
const LEVEL_THRESHOLD = 1000; // Ngưỡng điểm để tăng cấp độ
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

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



const board = new Board(ctx);

board.drawBoard();

let brick;

let gameStarted = false;

document.getElementById('play').addEventListener('click', () => {
  if(!gameStarted){
    gameStarted = true;
    board.reset();
    board.isPlaying = true;
    generateNewBrick(); 
    startTimer();
    const refresh = setInterval(() => {
      if (!board.gameOver) {
        brick.moveDown();
      } else {
        clearInterval(refresh);
      }
    }, board.dropInterval);
  }
});


document.addEventListener('keydown', (e) => {
  if (!board.gameOver && board.isPlaying && gameStarted) {
    e.preventDefault();

    switch (e.code) {
      case KEYBOARD.LEFT:
        brick.moveLeft();
        break;
      case KEYBOARD.RIGHT:
        brick.moveRight();
        break;
      case KEYBOARD.UP:
        brick.rotate();
        break;
      case KEYBOARD.SPACE: // Xử lý phím Space
        dropToBottom();
        break;
      case KEYBOARD.DOWN:
        brick.moveDown();
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



function generateNewBrick() {
  const randomCol = Math.floor(Math.random() * (COLS - 3));
  brick = new Brick(Math.floor(Math.random() * BRICK_LAYOUT.length), randomCol);
}

console.table(board.grid);


//xử lý thời gian 
let timerElement = document.getElementById('timer');
let startTime = 0; // Thời điểm bắt đầu tính thời gian

function startTimer() {
  startTime = Date.now(); // Ghi nhận thời điểm bắt đầu
  updateTimer(); // Cập nhật hiển thị thời gian
  timerInterval = setInterval(updateTimer, 1000); // Cập nhật thời gian mỗi giây
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000); // Thời gian đã trôi qua (tính bằng giây)

  const minutes = Math.floor(elapsedTimeInSeconds / 60);
  const seconds = elapsedTimeInSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0'); // Định dạng để có 2 chữ số
  const formattedSeconds = String(seconds).padStart(2, '0'); // Định dạng để có 2 chữ số

  timerElement.innerHTML = `Time: ${formattedMinutes}:${formattedSeconds}`;
}


function stopTimer() {
  clearInterval(timerInterval); // Dừng đếm thời gian

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

