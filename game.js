
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(event){
    if(started == false){
     $("#level-title").text("Level 0");
     nextSequence();
    
     started = true;
    } 
 });

$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);
    var ind = userClickedPattern.length -1;
    checkAnswer(ind);
 });

 function checkAnswer (currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000); 
        }
    }else{
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over") 
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 2000); 
          $("#level-title").text("Game Over, Press Any Key to Restart");
          started = false;
          level = 0;
          gamePattern = [];
          
       
    }
    }

function nextSequence(){
    userClickedPattern = [];
    level++;
    var title = "Level "+ level;
    $("#level-title").text(title);
     var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}
 function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);
    
}




