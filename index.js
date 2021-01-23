function blink(element) {
    playSound(element.substring(1))
    $(element).fadeOut().fadeIn();
}

function playSound(element){
    var audio = new Audio("./sounds/" + element + ".mp3");
    audio.play();
}

function clicking(element) {
    if (inGame){
        $(element).addClass("shadow");
        setTimeout( function(){
            $(element).removeClass("shadow");    
        } , 150);   
    }
}

$(".square").click(function(event){
    if (!notStartedYet){
        var elementName = "." + event.currentTarget.classList[0];
        playSound(event.currentTarget.classList[0]);
        if(inGame){        
            clicking(elementName);
            playerSquare.push(squares.indexOf(elementName));
            if (playerSquare[numToCheck] == mainSquares[numToCheck]){
                numToCheck++;
                if (numToCheck < level ){

                } else {
                    setTimeout(function(){
                        startGame();
                    }, 1000);
                }

            } else {
                $("h1").text("Game Over, Press here or Any Key to Restart") ;
                $("body").addClass("redBG");
                setTimeout( function(){
                    $("body").removeClass("redBG"); 
                } , 250);
                inGame = false;
                mainSquares = [];
                level = 0;
            }
        }  else {
            $("body").addClass("redBG");
            $(elementName).addClass("shadow");
            setTimeout( function(){
                $("body").removeClass("redBG"); 
                $(elementName).removeClass("shadow");
            } , 250); 
        }
    }
              
});

var squares = [".green" , ".red" , ".yellow" , ".blue"];
var mainSquares = [];
var playerSquare = [];
var level = 0;
var numToCheck = 0;
var inGame;
var notStartedYet = true;


$("body").keypress(function() {
    notStartedYet = false;
    if(level == 0 ){
        startGame();
    }
});

$("h1").click(function(){
    notStartedYet = false;
    if(level == 0 ){
        startGame();
    }
});

function startGame() {
    $("body").removeClass("redBG");
    playerSquare = [];
    numToCheck = 0;
    level++;
    $("h1").text("level " + level)
    inGame = true;
    var number = Math.floor(Math.random()*4);
    mainSquares.push(number);
    blink(squares[number]);
}

function gameOverClick(element){
    $("body").addClass("redBG");
    setTimeout( function(){
        $("body").removeClass("redBG"); 
    } , 250);
}