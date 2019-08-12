const NUM_COLS = 30;
const NUM_ROWS = 20;
const GAME_WIDTH = 20 * NUM_COLS;
const GAME_HEIGHT = 20 * NUM_ROWS;

var game = function() {
	this.timePerFrame = 100;
	this.snake = null;
	this.canvas = null;
	this.context = null;
	this.food = null;
	this.startGame = 0;
	this.image = null;
	this.loaded = false;
	this.score = 0;
	this.looping = 0;

	var self = this;

	this.init = function() {
		//create game screen
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = GAME_WIDTH;
		this.canvas.height = GAME_HEIGHT;
		document.body.appendChild(this.canvas);

		this.replay();
		this.loadImage();

		this.listenEvent();
	}

	this.replay = function() {
		if(this.looping == 1) return;
		var test = document.getElementById('score');
		if(test != null) test.innerHTML = "Score: 0";

		this.snake = new snake(this);
		this.snake.init();

		//create new food
		this.food = new food(this);
		this.food.init();
		
		//create the world
		this.loop();

		this.looping = 1;
	}

	this.loadImage = function() {
		this.image = new Image();
		this.image.onload = function() {
			self.loaded = true;
		}
		this.image.src = 'gameOver.jpg';
	}

	this.loop = function() {
		if(self.snake.gameOver == 1) {
			//self.gameOver();
			self.startGame = 0;
			if(self.loaded) {
				self.context.drawImage(self.image, 0, 0);
			}
			self.looping = 0;
			return;
		}
		self.clearScreen();
		self.food.draw();
		if(self.startGame == 1) {
			self.snake.go();
			if(self.snake.eaten == 1) {
				self.food.createNewFood();
				self.snake.eaten = 0;
			}
		}
		self.snake.draw();
		setTimeout(self.loop, self.timePerFrame);
	}

	this.listenEvent = function() {
		document.addEventListener('keydown', function(event) {
			switch(event.keyCode) {
				case 39: {
					if(self.snake.direction != 'left')
					self.snake.direction = 'right';
					break;
				}
				case 40: {
					if(self.snake.direction != 'up')
					self.snake.direction = 'down';
					break;
				}
				case 37: {
					if(self.snake.direction != 'right')
					self.snake.direction = 'left';
					break;
				}
				case 38: {
					if(self.snake.direction != 'down')
					self.snake.direction = 'up';
					break;
				}
			}
			self.startGame = 1;
		})
	}

	this.gameOver = function() {
		//create snake
		this.snake = new snake(this);
		this.snake.init();

		this.timePerFrame = 100;
	}

	this.clearScreen = function() {
		this.context.fillStyle = '#000000';
		this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	}
}

var g = new game();
g.init();

function myFunction() {
	g.replay();
}