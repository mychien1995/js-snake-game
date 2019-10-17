const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const PAUSE_KEY = 80;
const UP_DIR = 'up';
const DOWN_DIR = 'down';
const LEFT_DIR = 'left';
const RIGHT_DIR = 'right';

var SnakeModule = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
};

SnakeModule.prototype.start = function() {
    this.playGround = new Playground(this.canvas);
    this.playGround.addSnake();
};

var Playground = function(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.height = this.canvas.getAttribute('height');
    this.width = this.canvas.getAttribute('width');
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();
};

Playground.prototype.addSnake = function() {
    this.snake = new Snake(this.canvas);
    var snake = this.snake;
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === PAUSE_KEY) {
            if (snake.isMoving)
                snake.stopMoving();
            else snake.startMoving();
            return;
        }
        var direction = '';
        if (e.keyCode === LEFT_KEY) direction = LEFT_DIR;
        if (e.keyCode === RIGHT_KEY) direction = RIGHT_DIR;
        if (e.keyCode === UP_KEY) direction = UP_DIR;
        if (e.keyCode === DOWN_KEY) direction = DOWN_DIR;
        if (direction) {
            snake.changeDirection(direction);
            snake.startMoving();
        }
    });
};

var Snake = function(canvas) {
    this.color = 'green';
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.boxWidth = 10;
    this.boxHeight = 10;
    this.movement = 10;
    this.position = [{ x: 130, y: 150 }, { x: 140, y: 150 }, { x: 150, y: 150 }];
    this.intervalTime = 1000;
    this.movingInterval = undefined;
    this.isMoving = false;
    this.draw();
};

Snake.prototype.draw = function() {
    var ctx = this.context;
    ctx.beginPath();
    for (var i = 0; i < this.position.length; i++) {
        var pos = this.position[i];
        ctx.fillStyle = 'lightgreen';
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(pos.x, pos.y, this.boxWidth, this.boxHeight);
        ctx.strokeRect(pos.x, pos.y, this.boxWidth, this.boxHeight);
    }
    ctx.closePath();
};

Snake.prototype.erase = function(pos) {
    var ctx = this.context;
    ctx.clearRect(pos.x - 1, pos.y - 1, this.boxWidth + 2, this.boxHeight + 2);
};

Snake.prototype.changeDirection = function(direction) {
    if (!this.isValidMove(direction)) return;
    this.direction = direction;
};

Snake.prototype.move = function() {
    var newPosition = {};
    var lastPosition = this.position[this.position.length - 1];
    if (this.direction === LEFT_DIR) {
        newPosition.x = lastPosition.x - this.movement;
        newPosition.y = lastPosition.y;
    }
    if (this.direction === RIGHT_DIR) {
        newPosition.x = lastPosition.x + this.movement;
        newPosition.y = lastPosition.y;
    }
    if (this.direction === UP_DIR) {
        newPosition.x = lastPosition.x;
        newPosition.y = lastPosition.y - this.movement;
    }
    if (this.direction === DOWN_DIR) {
        newPosition.x = lastPosition.x;
        newPosition.y = lastPosition.y + this.movement;
    }
    this.position.push(newPosition);
    this.erase(this.position[0]);
    this.position.shift();
    this.draw();
};

Snake.prototype.stopMoving = function() {
    var snake = this;
    clearInterval(this.movingInterval);
    snake.isMoving = false;
};

Snake.prototype.startMoving = function() {
    var snake = this;
    if (snake.isMoving) return;
    snake.movingInterval = setInterval(function() {
        if (!snake.isMoving) {
            snake.isMoving = true;
        }
        snake.move();
    }, snake.intervalTime);
}

Snake.prototype.isValidMove = function(direction) {
    if ((direction === LEFT_DIR || direction === RIGHT_DIR) && (this.direction === LEFT_DIR || this.direction === RIGHT_DIR)) return false;
    if ((direction === UP_DIR || direction === DOWN_DIR) && (this.direction === UP_DIR || this.direction === DOWN_DIR)) return false;
    return true;
};

var snakeModule = new SnakeModule('gameCanvas');
snakeModule.start();