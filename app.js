// Variables

//paddles
paddle1y = paddle2y = 40;
paddleThickness = 20;
paddleHeight = 110;

// Ball
ballX = ballY = 50;
ballDimension = 10;
xVelocity = yVelocity = 4;

// Score
score1 = score2 = 0;
winScore = 10;

showingWinScreen = false;

// The AI
aiSpeed = 3;

window.onload = function() {
	canvas = document.getElementById('gameConsole');
	canvasContent = canvas.getContext('2d');
	setInterval(update, 1000 / 30);

	canvas.addEventListener('mousedown', function(e) {
		if(showingWinScreen) {
			score1 = 0;
			score2 = 0;
			showingWinScreen = false;
		}
	});

	canvas.addEventListener('mousemove', function(e) {
		paddle1y = e.clientY - paddleHeight / 2;
	});
}

function reset() {
	if(score1 >= winScore ||
		score2 >= winScore) {

		showingWinScreen = true;
	}

	if(score1 % 3 == 0 ) {

		xVelocity += 2;
	}

	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	xVelocity =- xVelocity;
	yVelocity = 3;
}

function update() {
	// ball moving
	ballX += xVelocity;
	ballY += yVelocity;

	// If ball gots top and bottom bouce
	if(ballY < 0 && yVelocity < 0) {
		yVelocity =- yVelocity;
	}

	if(ballY > canvas.height && yVelocity > 0) {
		yVelocity =- yVelocity;
	}

	// the sides bouce back

	if(ballX < 0) {
		if(ballY > paddle1y && ballY < paddle1y + paddleHeight){
			xVelocity =- xVelocity;
			deltaY = ballY-(paddle1y + paddleHeight / 2);
			yVelocity = deltaY * 0.3;
		} else {
			score2++;
			reset();
		}
	}

	if(ballX > canvas.width) {
		if(ballY > paddle2y && ballY < paddle2y + paddleHeight){
			xVelocity =- xVelocity;
			deltaY = ballY-(paddle2y + paddleHeight / 2);
			yVelocity = deltaY * 0.3;
		} else {
			score1++;
			reset();
		}
	}

	if(paddle2y + paddleHeight / 2 < ballY) {
		paddle2y += aiSpeed;
	} else {
		paddle2y -= aiSpeed;
	}

	canvasContent.fillStyle = 'black';
	// screen size
	canvasContent.fillRect(0, 0, canvas.width, canvas.height);

	if(showingWinScreen) {
		canvasContent.fillStyle = 'white';

		if(score1 >= winScore) {
			canvasContent.fillText("You Won!", 350, 200);
		} else if(score2 >= winScore) {
			canvasContent.fillText("Computer Won!", 340, 200);
		}
		canvasContent.fillText("click to restart", 340, canvas.height / 2);
		
		return;
	}

	canvasContent.fillStyle = 'white';

	// Net
	for(var i = 0; i < canvas.height; i += 40) {
		canvasContent.fillRect(canvas.width / 2 - 1, i, 6, 20);
	}

	// Paddles
	canvasContent.fillRect(0, paddle1y, paddleThickness, paddleHeight);
	canvasContent.fillRect(canvas.width - paddleThickness, paddle2y, paddleThickness , paddleHeight);

	// Draws Ball
	canvasContent.fillStyle = 'white';
	canvasContent.beginPath();
	canvasContent.arc(ballX, ballY, 10, 0,Math.PI*2,true);
	canvasContent.fill();

	// Draws Scores
	canvasContent.fillText(score1, 100, 100);
	canvasContent.fillText(score2, canvas.width - 100, 100);

}

