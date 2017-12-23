var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set 
var questions = [{
	question: "Jon Snow was born to:",
	answers: ["Melisandre", "Catelyn Stark", "Joanna Lannister", "Lyanna Stark"],
	correctAnswer: "Lyanna Stark",
	image: "assets/images/jon-snow.gif"
}, {
	question: "Which is the largest of Daenery's dragons?",
	answers: ["Rhaegal", "Viserion", "Drogon", "Enron"],
	correctAnswer: "Drogon",
	image: "assets/images/drogon.gif"
}, {
	question: "The Narrow Sea separates Essos and which continent?",
	answers: ["Esteros", "Qarth", "Westeroes", "Dorne"],
	correctAnswer: "Westeroes",
	image: "assets/images/sea.gif"
}, {
	question: "Who built the wall?",
	answers: ["The First Men", "Bran the Builder", "Mywin the Mason", "Tim the Serve-and-Volleyer"],
	correctAnswer: "Bran the Builder",
	image: "assets/images/wall.gif"
}, {
	question: "The Onion Knight is:",
	answers: ["Benjen Stark", "Tyrion Lannister", "Davos Seaworth", "Brynden Tully"],
	correctAnswer: "Davos Seaworth",
	image: "assets/images/davos.gif"
}, {
	question: "The Iron Throne was made for:",
	answers: ["King Robert Baratheon", "King Joffrey", "King Aerys II", "King Aegon"],
	correctAnswer: "King Aegon",
	image: "assets/images/throne.gif"
}, {
	question: "Whats the name of Arya Stark's sword?",
	answers: ["Pointer", "Needle", "Lightbringer", "Lionsbane"],
	correctAnswer: "Needle",
	image: "assets/images/needle.gif"
}, {
	question: "What is the official Lannister family motto?",
	answers: ["A Lannister always pays his debts", "Hear Me Roar", "None So Fierce", "Never Undersold"],
	correctAnswer: "Hear Me Roar",
	image: "assets/images/lannister.gif"
}, {
	question: "'Valar Morghulis' means:",
	answers: ["All Men Must Serve", "All Men Must Live", "All Men Must Dance", "All Men Must Die"],
	correctAnswer: "All Men Must Die",
	image: "assets/images/valar.gif"
}, {
	question: "Catelyn Stark was betrothed to whom before marrying Eddard Stark?",
	answers: ["King Robert Baratheon", "Tywin Lannister", "Petyr Baelish", "His brother Brandon Stark"],
	correctAnswer: "His brother Brandon Stark",
	image: "assets/images/catelyn.gif"
}];

// Variable to hold setInterval 
var timer;

var game = {

	questions: questions,
	currentQuestion: 0,
	counter: countStartNumber,
	correct: 0,
	incorrect: 0,

	countdown: function() {
		game.counter--;
		$("#counter-number").text(game.counter);
		if (game.counter === 0) {
			console.log("TIME UP");
			game.timeUp();
		}
	},

	loadQuestion: function() {
		
		timer = setInterval(game.countdown, 1000);

		panel.html("<h2 id='question'>" + questions[this.currentQuestion].question + "</h2>");

		for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
			panel.append(
				"<button class='answer-button' id='button' data-name='" 
				+ questions[this.currentQuestion].answers[i] + "'>" 
				+ questions[this.currentQuestion].answers[i] + "</button");
		}
	},

	nextQuestion: function() {
		game.counter = countStartNumber;
		$("#counter-number").text(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},

	timeUp: function() {

		clearInterval(timer);

		$("#counter-number").html(game.counter);

		panel.html("<h2>Out of Time!</h2>");
		panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
		panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},

	results: function() {

		clearInterval(timer);

		panel.html("<h2>All done, heres how you did</h2>");

		$("#counter-number").text(game.counter);

		panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
		panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
		panel.append("<h3>Unaswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
		panel.append("<br><button id='start-over'>Start Over?</button>");
	},

	clicked: function(e) {
		clearInterval(timer);
		if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
			this.answeredCorrectly();
		}
		else {
			this.answeredIncorrectly();
		}
	},

	answeredIncorrectly: function() {

		game.incorrect++;

		clearInterval(timer);

		panel.html("<h2>Nope!</h2>");
		panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
		panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},

	answeredCorrectly: function() {

		clearInterval(timer);

		game.correct++;

		panel.html("<h2>Correct!</h2>");
		panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.nextQuestion, 3 * 1000);
		} 
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},

	reset: function() {
		this.currentQuestion = 0;
		this.counter = countStartNumber;
		this.correct = 0;
		this.incorrect = 0;
		this.loadQuestion();
	}
};

// CLICK EVENTS 
// =============================
$(document).on("click", "#start-over", function() {
	game.reset();
}) ;

$(document).on("click", ".answer-button", function(e) {
	game.clicked(e);
});

$(document).on("click", "#start", function() {
	$("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
	game.loadQuestion();
});