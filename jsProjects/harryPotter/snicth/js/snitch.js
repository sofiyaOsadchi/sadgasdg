const playingArea = document.getElementById('playingArea');
const snitch = document.getElementById('snitch');
const timerDisplay = document.getElementById('timer');
const snitchSound = new Audio('sounds/static-noise.mp3');
snitchSound.loop = true;
let interval;
let timerInterval;
let startTime;

function moveSnitch() {
    const maxX = playingArea.clientWidth - snitch.clientWidth;
    const maxY = playingArea.clientHeight - snitch.clientHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    snitch.style.left = newX + 'px';
    snitch.style.top = newY + 'px';
}

function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    let speed;
    switch (difficulty) {
        case "easy":
            speed = 2000;
            break;
        case "medium":
            speed = 1500;
            break;
        case "hard":
            speed = 1000;
            break;
    }
    interval = setInterval(moveSnitch, speed);
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 100);

    snitchSound.play().catch(error => console.error("Audio play failed:", error));
}

document.getElementById("difficulty").addEventListener("change", function () {
    clearInterval(interval);
    clearInterval(timerInterval);
    startGame();
});


function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
    timerDisplay.textContent = elapsedTime.toFixed(1); // Format to 1 decimal place
}


function catchSnitch() {
    clearInterval(interval);
    clearInterval(timerInterval);
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000;
    const formattedTime = elapsedTime.toFixed(1);
    document.getElementById("modal").style.display = "block";

    // Get the best record from localStorage
    const bestRecord = parseFloat(localStorage.getItem("bestRecord") || "Infinity");

    // Update the best record if the current time is shorter
    if (elapsedTime < bestRecord) {
        localStorage.setItem("bestRecord", formattedTime);
        document.getElementById("bestRecord").textContent = "Best Record: " + formattedTime + "s";
    }

    snitchSound.pause();
    snitchSound.currentTime = 0;
}


var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

snitch.addEventListener('click', catchSnitch);
startGame();


window.onload = function () {
    const bestRecord = localStorage.getItem("bestRecord") || "0";
    document.getElementById("bestRecord").textContent = "Best Record: " + bestRecord + "s";
};