var snake = function(game) {
	this.game = game;
	this.dots = [];
	this.direction = "right";
	this.gameOver = 0;
	this.prev = null;
	this.eaten = 0;
	this.score = 0;

	this.init = function() {
		this.gameOver = 0;
		this.createDots();
	}

	this.createDots = function() {
		let newDot = new dot(this.game, 0, 0);
		newDot.init();
		this.dots.push(newDot);

		let newDot2 = new dot(this.game, 0, 1);
		newDot2.init();
		this.dots.push(newDot2);

		let newDot3 = new dot(this.game, 0, 2);
		newDot3.init();
		this.dots.push(newDot3);
	}

	this.go = function() {
		switch(this.direction) {
			case 'right': {
				this.moveRight();
				break;
			}

			case 'left': {
				this.moveLeft();
				break;
			}

			case 'up': {
				this.moveUp();
				break;
			}

			case 'down': {
				this.moveDown();
				break;
			}
		}
	}

	this.headDot = function() {
		return this.dots[this.dots.length - 1];
	}

	this.checkEaten = function() {
		let headDot = this.headDot();
		if(headDot.col == this.game.food.col && headDot.row == this.game.food.row) {
			this.eaten = 1;
			this.score++;
			document.getElementById('score').innerHTML = "Score: " + this.score;
		}
	}

	this.canMoveRight = function() {
		let headDot = this.headDot();
		if(headDot.col >= NUM_COLS - 1) return false;
		return true;
	}

	this.moveRight = function() {
		if(this.canMoveRight()) {
			let headDot = this.headDot();
			let newDot = new dot(this.game, headDot.row, headDot.col + 1);
			this.dots.push(newDot);
			this.checkEaten();
			if(this.eaten == 0)
			this.dots.shift();
		}
		else this.gameOver = 1;
	}

	this.canMoveLeft = function() {
		let headDot = this.headDot();
		if(headDot.col <= 0) return false;
		return true;
	}

	this.moveLeft = function() {
		if(this.canMoveLeft()) {
			let headDot = this.headDot();
			let newDot = new dot(this.game, headDot.row, headDot.col - 1);
			this.dots.push(newDot);
			this.checkEaten();
			if(this.eaten == 0)
			this.dots.shift();
		}
		else this.gameOver = 1;

	}

	this.canMoveUp = function() {
		let headDot = this.headDot();
		if(headDot.row <= 0) return false;
		return true;
	}

	this.moveUp = function() {
		if(this.canMoveUp()) {
			let headDot = this.headDot();
			let newDot = new dot(this.game, headDot.row - 1, headDot.col);
			this.dots.push(newDot);
			this.checkEaten();
			if(this.eaten == 0)
			this.dots.shift();
		}
		else this.gameOver = 1;

	}

	this.canMoveDown = function() {
		let headDot = this.headDot();
		if(headDot.row >= NUM_ROWS - 1) return false;
		return true;
	}

	this.moveDown = function() {
		if(this.canMoveDown()) {
			let headDot = this.headDot();
			let newDot = new dot(this.game, headDot.row + 1, headDot.col);
			this.dots.push(newDot);
			this.checkEaten();
			if(this.eaten == 0)
			this.dots.shift();
		}
		else this.gameOver = 1;

	}

	this.draw = function() {
		let l = this.dots.length;
		this.dots.forEach(function(dot, index) {
			if(index != l - 1) dot.draw();
			else dot.drawHead();
		})
	}
}