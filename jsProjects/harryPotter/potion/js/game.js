let currentRecipe = null;
let currentStepIndex = 0;
let isHeating = false;
let heatStartTime = null;


function startHeating() {
    console.log('Heating started');
    if (currentStepIndex < currentRecipe.steps.length) {
        const currentStep = currentRecipe.steps[currentStepIndex];
        if (currentStep.action === 'heat') {
            isHeating = true;
            heatStartTime = Date.now();
            document.getElementById('heating-indicator').style.display = 'block'; // Show heating indicator
            // Start timer
            const heatDuration = currentStep.duration * 1000; // Convert seconds to milliseconds
            setTimeout(() => {
                if (isHeating) { // Check if still heating
                    stopHeating();
                }
            }, heatDuration);
        } else {
            failGame();
        }
    }
}



function stopHeating() {
    console.log('Mixing started');
    if (isHeating) {
        const currentStep = currentRecipe.steps[currentStepIndex];
        currentStepIndex++;
        isHeating = false;
        document.getElementById('heating-indicator').style.display = 'none'; // Hide heating indicator
        checkCompletion();
    }
}



function mix() {
    if (currentStepIndex < currentRecipe.steps.length) {
        const currentStep = currentRecipe.steps[currentStepIndex];
        if (currentStep.action === 'mix') {
            currentStepIndex++;
            // Add mixing animation to cauldron
            const cauldronImage = document.getElementById('cauldron-image');
            cauldronImage.classList.add('mixing-animation');
            // Remove animation after a short delay
            setTimeout(() => {
                cauldronImage.classList.remove('mixing-animation');
            }, 2000); // Adjust time based on animation duration
            checkCompletion();
        } else {
            failGame();
        }
    }
}


function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    timerElement.style.display = 'block';
    let timeLeft = duration;
    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.style.display = 'none';
        } else {
            timerElement.textContent = timeLeft + 's';
            timeLeft--;
        }
    }, 1000);
}

function stopTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.style.display = 'none';
}



