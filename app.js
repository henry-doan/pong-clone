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

// The AI
aiSpeed = 2;

window.onload = function() {
	canvas = document.getElementById('gameConsole');
	cc = canvas.getContext('2d');
	setInterval(update, 1000 / 30);
	canvas.addEventListener('mousemove', function(e) {
		paddle1y = e.clientY - paddleHeight / 2;
	});
}

function reset() {
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

	cc.fillStyle = 'black';
	// screen size
	cc.fillRect(0, 0, canvas.width, canvas.height);

	// Paddles
	cc.fillStyle = 'white';

	cc.fillRect(0, paddle1y, paddleThickness, paddleHeight);
	cc.fillRect(canvas.width - paddleThickness, paddle2y, paddleThickness , paddleHeight);



	// Draws Ball
	cc.fillRect(ballX - ballDimension/2, ballY - ballDimension/2,ballDimension, ballDimension );


	// Draws Scores
	cc.fillText(score1, 100, 100);
	cc.fillText(score2, canvas.width - 100, 100);

}