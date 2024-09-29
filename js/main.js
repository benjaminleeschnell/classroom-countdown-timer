let timerInterval;
let totalSeconds;
let isPaused = false;
let isFullScreen = false;

function startTimer() {
    const hoursInput = document.getElementById('hours').value || 0;
    const minutesInput = document.getElementById('minutes').value || 0;
    const secondsInput = document.getElementById('seconds').value || 0;

    if (!isPaused) {
        totalSeconds = (parseInt(hoursInput) * 3600) + (parseInt(minutesInput) * 60) + parseInt(secondsInput);
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "Time's up!";
            document.title = "Time's up!";
        } else {
            if (!isPaused) {
                totalSeconds--;
                updateDisplay(totalSeconds);
            }
        }
    }, 1000);
}

function updateDisplay(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const displayHours = hours < 10 ? '0' + hours : hours;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;

    document.getElementById('timer').innerHTML = formattedTime;
    document.title = formattedTime;
}

function pauseTimer() {
    if (!isPaused) {
        isPaused = true;
        document.getElementById('pauseButton').innerText = "Resume";
    } else {
        isPaused = false;
        document.getElementById('pauseButton').innerText = "Pause";
        startTimer();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = false;
    document.getElementById('pauseButton').innerText = "Pause";
    document.getElementById('timer').innerHTML = "00:00:00";
    document.title = "Countdown Timer";
    document.getElementById('hours').value = "";
    document.getElementById('minutes').value = "";
    document.getElementById('seconds').value = "";

}

function toggleFullScreen() {
    const timerElement = document.getElementById('timer');
    if (!isFullScreen) {
        timerElement.classList.add('fullscreen');
        isFullScreen = true;
    } else {
        timerElement.classList.remove('fullscreen');
        isFullScreen = false;
    }
}
