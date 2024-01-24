let time = 25 * 60;
let timerInterval;
let currentMode = "focus";
let Modes = {
    focus: 25,
    short: 5,
    long: 15
};
// Default times
const DEFAULT_MODES = {
    focus: 25,
    short: 5,
    long: 15
}
let totalBreaks = 0;
const alarmSound = new Audio("sound.mp3");

document.querySelectorAll("#modes button")
    .forEach(function (button) {
        button.addEventListener("click", handleModeButtons)
    });



// Time Change 
document.querySelectorAll("#duration-control input")
    .forEach(function (input) {
        input.addEventListener("change", durationControlHandler);
        input.value = "";
    })
function durationControlHandler(event) {
    let value = event.target.value.trim();
    let durationId = event.target.dataset.durationId;

    if (value != "" && !isNaN(value) && Number.isInteger(parseFloat(value)) && parseInt(value) != 0) {
Modes[durationId] = parseInt(value)
    }else{
        Modes[durationId] = DEFAULT_MODES[durationId];
    }
    resetTimer();
}



function handleModeButtons(event) {
    switchMode(event.target.dataset.modeId);
};

// Timer Control Function
function toggleTimerControls(isRunning) {
    let startButton = document.querySelector(".timer-control.start");
    let pauseButton = document.querySelector(".timer-control.pause");

    if (isRunning) {
        startButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    } else {
        startButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    }
}

function updateControlButtons(isRunning) {
    toggleTimerControls(isRunning);
}
// Switch Modes Function
function switchMode(mode) {
    currentMode = mode;
    document.body.style.backgroundColor = "var(--" + mode + ")"
    document.querySelectorAll("#modes button").forEach(elem => {
        elem.classList.remove("active");
    });

    document.querySelector(`button[data-mode-id="${mode}"]`).classList.add("active");

    resetTimer();
};

// StartTime Function
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000)
    updateControlButtons(true);
};

// PauseTime Function
function pauseTimer() {
    clearInterval(timerInterval)
    updateControlButtons(false);
};
// UpdateTime Function
function updateTimer() {

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (minutes < 10) {
        minutes = "0" + minutes
    };
    if (seconds < 10) {
        seconds = "0" + seconds
    };
    document.getElementById("timer").textContent = minutes + ":" + seconds;
    document.title = `${minutes}:${seconds}-Timer`
    if (time <= 0) {
        pauseTimer();
        alarmSound.play();
        Swal.fire("Time's Up!");
        alarmSound.addEventListener('ended', function () {
            alarmSound.currentTime = 0;
        });
        nextMode();
        resetTimer();

    }
    time -= 1;
};
// Modes Change on Skip Button
function nextMode() {
    if (currentMode == "focus") {
        totalBreaks += 1;
        if (totalBreaks % 4 == 0) {
            switchMode("long");
        } else {
            switchMode("short");
        }
    } else {
        switchMode("focus")
    };
};
// Reset Timer
function resetTimer() {
    time = Modes[currentMode] * 60;
    clearInterval(timerInterval);
    updateTimer();
    updateControlButtons(false);
}

// Setting Modal
function openSettingsPopup() {
    document.getElementById("settings-popup").style.display = "flex";
}

function closeSettingsPopup() {
    document.getElementById("settings-popup").style.display = "none";
}





