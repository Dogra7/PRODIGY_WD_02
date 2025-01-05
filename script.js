let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCounter = 0;

const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const laps = document.getElementById('laps');

function startPauseTimer() {
    if (!running && difference === 0) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startPauseBtn.textContent = "⏸"; 
    } else if (running) {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.textContent = "⏵"; 
    } else if (!running && difference > 0) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startPauseBtn.textContent = "⏸";
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0; 
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    milliseconds.innerHTML = "00";
    laps.innerHTML = ""; 
    laps.style.display = "none"; 
    lapCounter = 0;
    startPauseBtn.textContent = "⏵";
}

function lapTimer() {
    if (running) {
        lapCounter++;
        const lapTime = `${minutes.innerHTML}:${seconds.innerHTML}:${milliseconds.innerHTML}`;
        const lapElement = document.createElement('li');
        lapElement.textContent = `• Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        laps.style.display = "block"; 
        laps.scrollTop = laps.scrollHeight; 
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);
    const millis = Math.floor((difference % 1000) / 10);
    
    minutes.innerHTML = (mins < 10) ? "0" + mins : mins;
    seconds.innerHTML = (secs < 10) ? "0" + secs : secs;
    milliseconds.innerHTML = (millis < 10) ? "0" + millis : millis;

    const totalSeconds = 60; 
    const currentSeconds = mins * 60 + secs; 
    const progress = (totalSeconds - currentSeconds) / totalSeconds; 
    const circumference = 502.65; 
    const offset = circumference * progress; 
    document.querySelector('.progress-circle-fill').style.strokeDashoffset = offset; 
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', stopTimer);
lapBtn.addEventListener('click', lapTimer);
