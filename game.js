
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var counter = 0;
var result = true;


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
}

function restorePress(currentColor){
    $("#"+currentColor).removeClass("pressed");
}

function isCorrect(){
    for(var i = 0; i < userChosenPattern.length; i++){
        if(gamePattern[i] != userChosenPattern[i]){
            return false;
        }
    }
    return true;
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level = gamePattern.length;
  $("h1").text("LEVEL "+level);
}

var userChosenButton;

$(".btn").click(function(event){
    if(level > 0){
        userChosenButton = event.target.id;
        userChosenPattern.push(userChosenButton);
        playSound(userChosenButton);
        animatePress(userChosenButton);
        setTimeout(function(){
            restorePress(userChosenButton);
        }, 100); 
        result = isCorrect();
        if(!result){ // if pattern incorrect
            $("h1").text("GAME OVER");
            level = 0;
            gamePattern = [];
            userChosenPattern = [];
            $("body").css("background-color","red");
            setTimeout(function(){
                $("body").css("background-color","#011F3F");
            }, 200); 
            setTimeout(function(){
                $("h1").text("Press A Key/Button to Start");
            }, 1000); 
        }
        if(userChosenPattern.length === gamePattern.length && gamePattern.length != 0){ // if everything is correct
            setTimeout(function(){
                nextSequence();
            }, 1000); 
            $("h1").text("LEVEL "+level);
            userChosenPattern = [];
        }
    }
    else{ // if the user start the game with a button, then take it as the first pattern
        userChosenButton = event.target.id;
        gamePattern.push(userChosenButton);
        playSound(userChosenButton);
        animatePress(userChosenButton);
        setTimeout(function(){
            restorePress(userChosenButton);
        }, 100); 
        level = gamePattern.length;
        setTimeout(function(){
            $("h1").text("LEVEL "+level);
        }, 500); 
        setTimeout(function(){
            nextSequence();
        }, 500); 
    }
    console.log("gamePattern:"+gamePattern);
    console.log("userChosenPattern:"+userChosenPattern);
});

$(document).keydown(function(){
    if(level === 0){
        setTimeout(function(){
            nextSequence();
        }, 300); 
    }
});

