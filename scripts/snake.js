var Snake = function(playGround) {
    this.color = SNAKE_COLOR;
    this.playGround = playGround;
    this.context = this.playGround.canvas.getContext("2d");
    this.boxWidth = 10;
    this.boxHeight = 10;
    this.movement = 10;
    this.position = [{ x: 130, y: 150 }, { x: 140, y: 150 }, { x: 150, y: 150 }];
    this.intervalTime = MOVING_INTERVAL_TIME;
    this.isMoving = false;
    this.actionQueue = [];
    this.isHitBorder = function() { return playGround.checkSnakeHitBorder(this); };
    this.draw();
};

Snake.prototype.draw = function() {
    var ctx = this.context;
    ctx.beginPath();
    for (var i = 0; i < this.position.length; i++) {
        var pos = this.position[i];
        ctx.fillStyle = this.color;
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
    this.move();
};

Snake.prototype.move = function() {
    var snake = this;
    if (snake.isHitBorder() || snake.isHitYourself()) {
    	snake.dead();
        return;
    }
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
    this.checkForCherry();
};

Snake.prototype.stopMoving = function() {
    var snake = this;
    clearInterval(this.movingInterval);
    snake.isMoving = false;
};

Snake.prototype.startMoving = function() {
    var snake = this;
    if (snake.isMoving) return;
    clearInterval(this.movingInterval);
    snake.movingInterval = setInterval(function() {
        snake.move();
    }, snake.intervalTime);
};

Snake.prototype.isValidMove = function(direction) {
    if ((direction === LEFT_DIR || direction === RIGHT_DIR) && (this.direction === LEFT_DIR || this.direction === RIGHT_DIR)) return false;
    if ((direction === UP_DIR || direction === DOWN_DIR) && (this.direction === UP_DIR || this.direction === DOWN_DIR)) return false;
    return true;
};

Snake.prototype.checkForCherry = function() {
    var playground = this.playGround;
    var snake = this;
    var cherry = this.playGround.cherry;
    if (!cherry) return;
    var head = snake.position[snake.position.length - 1];
    var headXStart = head.x;
    var headXEnd = head.x + snake.movement;
    var headYStart = head.y;
    var headYEnd = head.y + snake.movement;
    if (cherry.y === head.y && cherry.x === head.x) {
        var newXPoint = cherry.x;
        var newYPoint = cherry.y;
        if (snake.direction === LEFT_DIR) newXPoint -= snake.movement;
        if (snake.direction === RIGHT_DIR) newXPoint += snake.movement;
        if (snake.direction === UP_DIR) newYPoint -= snake.movement;
        if (snake.direction === DOWN_DIR) newYPoint += snake.movement;
        snake.position.push({
            x: newXPoint,
            y: newYPoint
        });
        snake.draw();
        playground.addCherry();
        playground.updateScore();
    }
};

Snake.prototype.isHitYourself = function(){
	var head = this.position[this.position.length - 1];
	for(var i = 0; i < this.position.length - 2; i++){
		var pos = this.position[i];
		if(head.x === pos.x && head.y === pos.y){
			return true;
		}
	}
	return false;
};

Snake.prototype.dead = function() {
	var snake = this;
    snake.stopMoving();
    snake.isDead = true;
    alert('YOU DIED');
};