//Timer
let startTime,elapsedTime;

let minutes=0,seconds=0;

let startGame = document.getElementById("play-button");

let newGame = document.getElementById("new-game");
let NewGame = document.getElementById("new_game");

let resume = 0;

newGame.addEventListener("click", function(){
    window.location.reload();
});

NewGame.addEventListener("click", function(){
    window.location.reload();
});

document.addEventListener("keydown", function(event){
    if(event.code == "Space"){
        if(resume == 0){
            StartGame();
        } 
        else{
            pauseTimer();
        }
    }
})

startGame.addEventListener("click",StartGame);

function StartGame(){ 
    if(seconds==0 && minutes == 0){
        startTimer();
    }
    else{ 
        resumeTimer();
    }
    resume = 1; 
    document.getElementById("play").style.display = "none"; 
}

function startTimer(){
    if (!startTime) {
        startTime = Date.now(); 
        timerInterval = setInterval(updateTime, 1000); 
    }
}

function pauseTimer() {
    clearInterval(timerInterval); 
    startTime = null;
    document.getElementById("play").style.display = "block";
    resume = 0;   
}
  
function resumeTimer() {
    if (!startTime) {
      startTime = Date.now() - elapsedTime; 
      timerInterval = setInterval(updateTime, 1000);
    }
    document.getElementById("play").style.display = "none";
    resume = 1;   
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let toSecond = Math.floor(elapsedTime/1000);
    minutes = Math.floor( toSecond/ 60);
    seconds = toSecond % 60;
    let formattedTime = `${minutes}:${seconds}`;

    document.getElementById("time").innerHTML = formattedTime
}

let pauseButton = document.getElementById("pause-button"); 
pauseButton.addEventListener("click", pauseTimer);

let playButton = document.getElementById("resume-button"); 
playButton.addEventListener("click", resumeTimer);
