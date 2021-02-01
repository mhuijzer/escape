// Page elements
var startBtn = document.getElementsByTagName('button')[0];
var checkBtn = document.getElementsByTagName('button')[1];
var progressbar = document.getElementById('progressbar');
var gamesScrn = document.getElementById('games');
var roomScrn = document.getElementById('room');
var roomDescr  = roomScrn.getElementsByTagName('p')[1];
var roomMessage  = roomScrn.getElementsByTagName('p')[3];
var timer = document.getElementById('timer');
var escapedScrn = document.getElementById('escaped');
var games = document.getElementsByClassName('game');
var inputField = document.getElementById('input').getElementsByTagName('input')[0]

// Playing variables

var selectedGameID = 'ER_1';
var solutions;
var puzzle = 1;
var minutes;

for (i=0; i < games.length; i++){
    games[i].onclick = function(){
        selectGame(this.id);
    }
}

var selectedGame = gamesScrn.getElementsByClassName('selected')[0];

function selectGame(game){
    if (selectedGame !== null) {
        selectedGame.classList.remove('selected');
    }
    selectedGame = document.getElementById(game);
    selectedGame.classList.add('selected');
    selectedGameID = game;
}

startBtn.onclick = function(){
    gamesScrn.style.display = "none";
    roomScrn.style.display = "flex";
    prepareRoom(selectedGameID);
}

checkBtn.onclick = function(){
    if(checkSolution(puzzle)) {
        puzzle ++;
        if(puzzle > solutions.length){
            roomScrn.style.display = "none";
            escapedScrn.style.display = "flex";
            confetti.start(5000);
        } else {
            roomDescr.innerHTML = 'De ' + puzzle + 'e code';
            roomMessage.innerHTML = 'Dat was goed! Op naar de volgende!';
        }
    } else {
        roomMessage.innerHTML = 'Dat was fout! Probeer het opnieuw!';
    }
}

function prepareRoom(selectedGameID){
    switch(selectedGameID){
        case 'ER_1': 
            solutions = ['6251','5216','CACB'];
            time = 60;
            break;
        case 'ER_2': 
            solutions = ['3617','4156','1341'];
            time = 60;
            break;
        case 'ER_3': 
            solutions = ['1622','5411','CDFE'];
            time = 60;
            break;
        case 'ER_4': 
            solutions = ['4563','1362','5463'];
            time = 60;
            break;
    }
    minutes = time - 1;
    seconds = 60;
    
    if (time == 0){
        timer.innerHTML = '00:00';
    } else if (time < 10) {
        timer.innerHTML = '0' + time + ':' + '00';
    } else {
        timer.innerHTML = time + ':' + '00';
    }
    startT = new Date().getTime();
    interval = window.setInterval(() => {
        count(); 
     }, 1000);
}

function checkSolution(puzzle){
    input = inputField.value.toUpperCase();
    inputField.value = '';
    if (input == solutions[puzzle-1]){
        return true;
    } else {
        return false;
    }
}
verstrekenT = 0;
secondsDisplay = '00';
minutesDisplay = '00';
function count(){
    verstrekenT = Math.round((new Date().getTime() - startT) / 1000);
    restSeconds = seconds - verstrekenT;
    if (restSeconds < 0){
        startT = new Date().getTime();
        minutes = minutes - 1;
        seconds = 60 + restSeconds;
        secondsDisplay = 60 + restSeconds; 
    } else if (restSeconds == 0){
        startT = new Date().getTime();        
        minutes = minutes - 1;
        seconds = 60;
        secondsDisplay = '00'; 
    } else if (restSeconds < 10){
        secondsDisplay = '0' + restSeconds; 
    } else {
        secondsDisplay = restSeconds;
    }
    if (minutes == 0){
        minutesDisplay = '00';
    } else if (minutes < 10) {
        minutesDisplay = '0' + minutes;
    } else {
        minutesDisplay = minutes;
    }
    timer.innerHTML = minutesDisplay + ':' + secondsDisplay.toString();
}
