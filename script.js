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
};

var Snake = function(canvas) {
    this.color = 'green';
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.boxWidth = 10;
    this.boxHeight = 10;
    this.movement = 10;
    this.position = [{ x: 130, y: 150 }, { x: 140, y: 150 }, { x: 150, y: 150 }];
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

Snake.prototype.erase = function(pos){
    var ctx = this.context;
    ctx.clearRect(pos.x - 1, pos.y - 1, this.boxWidth + 2, this.boxHeight + 2);
};

Snake.prototype.move = function(direction) {
	if(!this.isValidMove(direction)) return;
    var newPosition = {};
    var lastPosition = this.position[this.position.length - 1];
    if(this.direction != 'left' && this.direction != 'right'){
    	newPosition.y = lastPosition.y;
    	if(direction === 'left')
    		newPosition.x = lastPosition.x - this.movement;
    	else if(direction === 'right')
    		newPosition.x = lastPosition.x + this.movement;
    }
    if(this.direction != 'top' && this.direction != 'bottom'){
    	newPosition.x = lastPosition.x;
    	if(direction === 'top')
    		newPosition.y = lastPosition.y - this.movement;
    	else if(direction === 'bottom')
    		newPosition.y = lastPosition.y + this.movement;
    }
    this.position.push(newPosition);
    this.direction = direction;
    this.erase(this.position[0]);
    this.position.shift();
    this.draw();
};

Snake.prototype.isValidMove = function(direction){
	if((direction === 'left' || direction === 'right') && (this.direction === 'left' || this.direction === 'right')) return false;
	if((direction === 'top' || direction === 'bottom') && (this.direction === 'top' || this.direction === 'bottom')) return false;
	return true;
}

var snakeModule = new SnakeModule('gameCanvas');
snakeModule.start();