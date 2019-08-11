const DOT_SIZE = 20;

var dot = function(game, row, col) {
	this.game = game;
	this.row = row;
	this.col = col;

	this.init = function() {

	}

	this.moveRight = function() {
		this.col++;
	}

	this.moveLeft = function() {
		this.col--;
	}

	this.moveUp = function() {
		this.row--;
	}

	this.moveDown = function() {
		this.row++;
	}

	this.draw = function() {
		this.game.context.fillStyle = '#ff0000';
		this.game.context.fillRect(this.col * DOT_SIZE + 2, this.row * DOT_SIZE + 2, DOT_SIZE - 3, DOT_SIZE - 3);
	}

	this.drawHead = function() {
		this.game.context.fillStyle = '#f0f0f0';
		this.game.context.fillRect(this.col * DOT_SIZE + 2, this.row * DOT_SIZE + 2, DOT_SIZE - 3, DOT_SIZE - 3);
	}
}