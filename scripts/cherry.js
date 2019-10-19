var Cherry = function(playground, x, y) {
    this.playGround = playground;
    this.x = x;
    this.y = y;
    this.boxWidth = 10;
    this.boxHeight = 10
    this.point = 10;
};

Cherry.prototype.draw = function() {
    var ctx = this.playGround.context;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'black';
    ctx.fillRect(this.x, this.y, this.boxWidth, this.boxHeight);
    ctx.strokeRect(this.x, this.y, this.boxWidth, this.boxHeight);
    ctx.closePath();
};

Cherry.prototype.erase = function() {
    var ctx = this.playGround.context;
    ctx.beginPath();
    ctx.clearRect(this.x - 1, this.y - 1, this.boxWidth + 2, this.boxHeight + 2);
    ctx.closePath();
};