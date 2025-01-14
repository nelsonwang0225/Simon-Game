//generate master game pattern variables
var gamePattern = [];
var userClickedPattern = [];
var gameLevel = 0;
var level = "Level";
var started = false;

//Attach correct audio
function attachAudio(e) {
    var buttonClass = document.querySelectorAll(".btn");
    for (var i = 0; i < buttonClass.length; i++) {
        if (e.classList.contains("green")) {
            var audio = new Audio("sounds/green.mp3");
            audio.play();
        } else if (e.classList.contains("red")) {
            var audio = new Audio("sounds/red.mp3");
            audio.play();
        } else if (e.classList.contains("yellow")) {
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
        } else if (e.classList.contains("blue")) {
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
        }
    }
} 

function checkAnswer() {
    for (var i=0; i<userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            document.body.classList.add("game-over");
            setTimeout(function() {
                document.body.classList.remove("game-over");
            }, 100);
            gamePattern = [];
            userClickedPattern = [];
            var gamePassed = false;
        }
    }
    return gamePassed;
}

//Generate Random number and assign to button
function randomNumberButton() {
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    switch (randomNumber) {
        case 1:
            var buttonClass = document.querySelector("#green");
            var randomChosenColor = "green";
            break;
        case 2:
            var buttonClass = document.querySelector("#red");
            var randomChosenColor = "red";
            break;
        case 3:
            var buttonClass = document.querySelector("#yellow");
            var randomChosenColor = "yellow";
            break;
        case 4:
            var buttonClass = document.querySelector("#blue");
            var randomChosenColor = "blue";
            break;
        default: console.log(buttonClass);
    }
    gameLevel++;
    document.querySelector("h1").innerHTML = level.concat(" ", gameLevel);
    return [buttonClass, randomChosenColor, randomNumber];
}

//game 1 - keydown and selecting the correct block
function firstRound() {
document.addEventListener("keydown", function() {
    if (started === false) {
        var [correctButton, selectedColor, numberSelected] = randomNumberButton();
        attachAudio(correctButton);
        correctButton.classList.add("pressed");
        setTimeout(function() {
            correctButton.classList.remove("pressed");
        }, 100);
        gamePattern.push(selectedColor);
        started = true;
}
});
}



//game generated clicks
function gameGeneratedClicks() {
    setTimeout(function() {
        var [correctButton, selectedColor, numberSelected] = randomNumberButton();
        attachAudio(correctButton);
        correctButton.classList.add("pressed");
        setTimeout(function() {
            correctButton.classList.remove("pressed");
        }, 100);
        gamePattern.push(selectedColor);
        }, 1000);
}


function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    gameLevel = 0;
}
//Execution
//Run first round
firstRound();



//user clicks and generating the next game click
for (var i=0; i<document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        var clickedId = this.id;
        userClickedPattern.push(clickedId);
        var self = this;
        self.classList.add("pressed");
        setTimeout(function() {
            self.classList.remove("pressed");
        }, 100);
        attachAudio(this);

        var gameStatus = checkAnswer();
        if (gameStatus !== false) {
            if (userClickedPattern.length === gamePattern.length) {
                gameGeneratedClicks();
                userClickedPattern = [];
            }
        } else {
            startOver();
            started = false;
            
        }
    }
)}
    

