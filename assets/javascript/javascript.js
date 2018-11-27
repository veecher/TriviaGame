var gameboard = $("#gameboard");
var startingTime = 10;
var timer;

var questions = [{
	question: "question one",
	answers: ["wrong", "right", "wrong", "wrong"],
	correctAnswer: "right",
},
{
	question: "question two",
	answers: ["right", "wrong", "wrong", "wrong"],
	correctAnswer: "right",
},
{
	question: "question three",
	answers: ["wrong", "wrong", "wrong", "right"],
	correctAnswer: "right",
},
{
	question: "question four",
	answers: ["wrong", "wrong", "right", "wrong"],
	correctAnswer: "right",
}]

$(document).on("click", "#start-button", function() {
	$("#timer-box").html("<h2>time remaining: <span id='game-timer'>10</span></h2>");
	game.setup();
});

$(document).on("click", ".answer-button", function(a) {
	game.answer(a);
});
  
  
var game = {
	questions: questions,
	currentQuestion: 0,
	clock: startingTime,
	correct: 0,
	incorrect: 0,

	setup: function() {
		$("#start-button").hide();
		this.currentQuestion = 0;
		this.runningTimer = game.clock;
		this.correct = 0;
		this.incorrect = 0;
		this.questionGetter();
	},


	countdown: function () {
		game.clock -- ;
		$("#game-timer").text(game.clock);
		if (game.clock === 0) {
			game.timesUp();
		}
	},

	timesUp: function() {
		clearInterval(timer);
		$("#timer-box").hide();
		gameboard.html("<h2>times up</h2>");
		gameboard.append("<p>the answer is " + questions[this.currentQuestion].correctAnswer);
		if (game.currentQuestion === questions.length -1) {
			game.score();
		}
		else {
			setTimeout(game.newQuestion, 3000);
		}
	},

	newQuestion: function() {
		game.clock = startingTime;
		$("#game-timer").text(game.clock);
		game.currentQuestion ++;
		game.questionGetter();
	},

	questionGetter: function() {
		$("#timer-box").show();
		timer = setInterval(game.countdown, 1000);
		gameboard.html("<h2>" + questions[this.currentQuestion].question + "</h2>")
		for (var i = 0; i < questions[this.currentQuestion].answers.length; i ++){
			gameboard.append("<button class='answer-button' id='button' answer='" + questions[this.currentQuestion].answers[i] +"'>" + questions[this.currentQuestion].answers[i] + "</button>");
		}
	},

	score: function() {
		clearInterval(timer);
		$("#timer-box").hide();
		gameboard.html("<h2>your score:</h2>");
		gameboard.append("<p>correct answers: " + game.correct + "</p>");
		gameboard.append("<p>wrong answers: " + game.incorrect + "</p>");
		gameboard.append("<p>unanswered questions: " + (questions.length - (game.correct + game.incorrect)) + "</p>");
		gameboard.append("<br> <button id='start-button'>restart</button>");
	},

	answer: function(a) {
		clearInterval(timer);
		if ($(a.target).attr("answer") === questions[this.currentQuestion].correctAnswer) {
			this.rightAnswer();
		}
		else {
			this.doesntKnowRightFromWrong();
		}
	},

	rightAnswer: function() {
		clearInterval(timer);
		game.correct ++;
		gameboard.html("<h2>...good job</h2>");
		if (game.currentQuestion === questions.length -1) {
			setTimeout(game.score, 3000);
		}
		else {
			setTimeout(game.newQuestion, 3000);
		}
	},

	doesntKnowRightFromWrong: function() {
		clearInterval(timer);
		game.incorrect ++;
		gameboard.html("<h2>reading isn't cheating</h2>");
		gameboard.append("<p>the correct answer is " + questions[game.currentQuestion].correctAnswer + "</p>");
		if (game.currentQuestion === questions.length -1) {
			setTimeout(game.score, 3000);
		}
		else {
			setTimeout(game.newQuestion, 3000);
		}
	},
}