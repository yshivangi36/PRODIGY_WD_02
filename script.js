// script.js
let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    difference = 0;
    display.textContent = '00:00:00.000';
    lapList.innerHTML = '';
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds;
    
    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        let lapTime = display.textContent;
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
}
