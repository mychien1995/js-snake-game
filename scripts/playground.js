var Playground = function(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.top = 0;
    this.left = 0;
    this.height = parseInt(this.canvas.getAttribute('height'));
    this.width = parseInt(this.canvas.getAttribute('width'));
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.fillRect(this.top, this.left, this.width, this.height);
    this.score = 0;
    this.scoreElement = document.getElementById('score');
    this.context.closePath();
};

Playground.prototype.addSnake = function() {
    var playground = this;
    this.snake = new Snake(this);
    var snake = this.snake;
    var isFirstMove = true;
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
            if (isFirstMove) {
                isFirstMove = false;
                playground.addCherry();
            }
            snake.changeDirection(direction);
            snake.startMoving();
        }
    });
};

Playground.prototype.checkSnakeHitBorder = function(snake) {
    var playGround = this;
    var movement = snake.movement;
    var head = snake.position[snake.position.length - 1];
    if (head.x + movement > playGround.left + playGround.width ||
        head.x < playGround.left ||
        head.y + movement > playGround.top + playGround.height ||
        head.y < playGround.top) return true;
    return false;
};

Playground.prototype.addCherry = function() {
    while (true) {
        var xPoint = this.left + Math.floor(Math.random() * (this.width));
        var yPoint = this.top + Math.floor(Math.random() * (this.height));
        if (xPoint % 10 !== 0 || yPoint % 10 !== 0) continue;
        var isValid = true;
        for (var i = 0; i < this.snake.position.length; i++) {
            if (this.snake.position[i].x === xPoint || this.snake.position[i].y === yPoint) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            this.cherry = new Cherry(this, xPoint, yPoint);
            this.cherry.draw();
            break;
        }
    }
};

Playground.prototype.updateScore = function(){
	this.score ++;
	this.scoreElement.textContent = this.score;
};