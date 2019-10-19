const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const PAUSE_KEY = 80;
const UP_DIR = 'up';
const DOWN_DIR = 'down';
const LEFT_DIR = 'left';
const RIGHT_DIR = 'right';
const MOVING_INTERVAL_TIME = 70;
const SNAKE_COLOR = 'lightskyblue';
const CHERRY_COLOR = 'red';

var SnakeModule = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
};

SnakeModule.prototype.start = function() {
    this.playGround = new Playground(this.canvas);
    this.playGround.addSnake();
};