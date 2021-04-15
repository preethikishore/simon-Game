var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
btnid = $()
var level = 0;
var started = false;

function nextSequence()
{
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level -" + " "+level);
    
}
$( ".btn" ).click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern.length);
  });

  function playSound(name)
  {
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();

  }
  function animatePress(currentColor)
  {
      $("#" + currentColor).addClass("pressed");
      setTimeout(function removeClass()
      {
        $("#" + currentColor).removeClass("pressed");
      },100);
  }

$(document).on('keypress',function(e) {
    if(!started) {
        nextSequence();
        $("#level-title").html("Level -" + " "+level);
        started = false;
    }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        $("body").addClass("game-over");
        $("#level-title").html("Game Over, Press Any Key to Restart")
        setTimeout(function gameOverRemove(){
            $("body").removeClass("game-over");  
        },2000);
        startOver();

    }

 }
  function startOver()
  {
      gamePattern = [];
      started = false;
      level = 0 ;
  }
