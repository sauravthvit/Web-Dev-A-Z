var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect the first keypress and call nextSequence()
$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

// Detect button clicks using jQuery
$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	// Call checkAnswer after a user has clicked and chosen their answer
	checkAnswer(userClickedPattern.length - 1);
});

// Function to check user's answer
function checkAnswer(currentLevel) {
	// Check if the most recent user answer is the same as the game pattern
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");

		// Check if user has finished their sequence
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function nextSequence() {
	userClickedPattern = []; // Reset userClickedPattern for the next level
	level++;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play().catch(function (error) {
		console.error("Error playing sound:", error);
	});
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

// Function to reset the game
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
