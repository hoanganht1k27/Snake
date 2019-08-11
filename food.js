var food = function(game) {
	this.game = game;
	this.col = 0;
	this.row = 0;

	this.init = function() {
		this.createNewFood();
	}

	this.createNewFood = function() {
		var col = Math.round(Math.random() * (NUM_COLS - 1));
		var row = Math.round(Math.random() * (NUM_ROWS - 1));

		while(!this.validNewFood(row, col)) {
			col = Math.round(Math.random() * (NUM_COLS - 1));
			row = Math.round(Math.random() * (NUM_ROWS - 1));
		}

		this.col = col;
		this.row = row;
	}

	this.validNewFood = function(row, col) {
		var valid = true;

		this.game.snake.dots.forEach(function(dot) {
			if(dot.col == col && dot.row == row) valid = false;
		})

		return valid;
	}

	this.draw = function() {
		this.game.context.fillStyle = '#ffff00';
		this.game.context.fillRect(this.col * DOT_SIZE + 2, this.row * DOT_SIZE + 2, DOT_SIZE - 3, DOT_SIZE - 3);
	}
}