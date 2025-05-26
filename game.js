const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


$(document).keydown(function() {
    if (!started) {
        $("h1").text(`Level ${level + 1}`)
        nextSequence()
        started = true;
    }
});


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


function nextSequence(){

    level++;

    $("h1").text(`Level ${level}`);    
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).addClass("pressed");
    makeSound(randomChosenColor);
    // console.log("game " + gamePattern);

    setTimeout (function() {
        $(`#${randomChosenColor}`).removeClass("pressed");
    }, 200);
}


function useClickHandler(){

    $(".btn").click(function() {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        makeSound(userChosenColor);
        // console.log(userClickedPattern);
    
        checkAnswer(userClickedPattern.length - 1);
    });

}
useClickHandler();


function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        // console.log(`level ${level} Vetri`);

        if (gamePattern.length === userClickedPattern.length){
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }

    }
    else {
        // console.log(`level ${level} Tholvi`);
        
        let gameOverAudio = new Audio('sounds/wrong.mp3');
        gameOverAudio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, press any key to restart");
        startOver();
    }
}


function makeSound(name){

    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();

    // switch (name){
    //     case "green":
    //         let green = new Audio('sounds/green.mp3');
    //         green.play();
    //         break;
        
    //     case "red":
    //         let red = new Audio('sounds/red.mp3');
    //         red.play();
    //         break;

    //     case "yellow":
    //         let yellow = new Audio('sounds/yellow.mp3');
    //         yellow.play();
    //         break;

    //     case "blue":
    //         let blue = new Audio('sounds/blue.mp3');
    //         blue.play();
    //         break;

    //     default:
    //         console.log("something went wrong");
    // }
}
makeSound();
