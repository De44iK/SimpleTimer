let hh = 0;
let mm = 0;
let ss = 0;

buttons = true;
stopBtn = false;
startenabled = true;
var alarmSound = document.getElementById("alarmSound");

let timeLabel = `${hh.toString().padStart(2, '0')} : ${mm.toString().padStart(2, '0')} : ${ss.toString().padStart(2, '0')}`;

document.getElementById("timeLabel").innerHTML = timeLabel;

document.getElementById("hourUp").onclick = function() {changeTime(upOrDown = "up", hms = "h")}
document.getElementById("hourDown").onclick = function() {changeTime(upOrDown = "down", hms = "h")}

document.getElementById("minuteUp").onclick = function() {changeTime(upOrDown = "up", hms = "m")}
document.getElementById("minuteDown").onclick = function() {changeTime(upOrDown = "down", hms = "m")}

document.getElementById("secondUp").onclick = function() {changeTime(upOrDown = "up", hms = "s")}
document.getElementById("secondDown").onclick = function() {changeTime(upOrDown = "down", hms = "s")}

function changeTime(upOrDown, hms){
    if (buttons){
        if(upOrDown == "up"){
            if (hms == "h" && hh < 24) {
                hh += 1;
            }else if(hms == "m" && mm < 59){
                mm += 1;
            }else if(hms == "s" && ss < 59){
                ss += 1;
        }
    }
    
        if(upOrDown == "down"){
            if (hms == "h" && hh > 0) {
                hh -= 1;
            }else if(hms == "m" && mm > 0){
                mm -= 1;
            }else if(hms == "s" && ss > 0){
                ss -= 1;
        }
    } 
    
    let timeLabel = `${hh.toString().padStart(2, '0')} : ${mm.toString().padStart(2, '0')} : ${ss.toString().padStart(2, '0')}`;
    document.getElementById("timeLabel").innerHTML = timeLabel;

    }
}
document.getElementById("startTimer").onclick = function() {startTimer()};
document.getElementById("stopTimer").onclick = function() {stopped = true};
document.getElementById("resetTimer").onclick = function() {resetTimer()};

async function startTimer(){

if(startenabled){

    timerReset = false; 
    breakSwitch = false; 
    stopped = false;
    buttons = false;
    stopBtn = true;
    startenabled = false;
    timerEnded = false;

    while (hh+mm+ss != 0 && stopped == false) {
    
    if(breakSwitch == true){
        break;
    }
        ss --;
        if(ss < 0){
        mm --;
        ss = 59;
    }
    if(mm < 0){
        hh --;
        mm = 59
    }
    
    timeLabel = `${hh.toString().padStart(2, '0')} : ${mm.toString().padStart(2, '0')} : ${ss.toString().padStart(2, '0')}`;
    document.getElementById("timeLabel").innerHTML = timeLabel;
    console.log(hh, mm, ss)
    await sleep(1000)

    }

breakSwitch = true; 
buttons = true; 
stopBtn = false; 
startenabled = true; 

if(timerReset == false && hh+mm+ss == 0){
    for(let i=0; i<2; i++){
        alarmSound.play(); // Play the alarm sound
        await sleep(1000);
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }  
    }
}
}


function resetTimer(){

    buttons = true; 
    stopBtn = false; 
    startenabled = true;

    hh = mm = ss = 0;
    timerReset = true;
    let timeLabel = `${hh.toString().padStart(2, '0')} : ${mm.toString().padStart(2, '0')} : ${ss.toString().padStart(2, '0')}`;
    document.getElementById("timeLabel").innerHTML = timeLabel;
    breakSwitch = true;
    timerEnded = false;
    alarmSound.pause();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}