document.addEventListener('DOMContentLoaded', () => {
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const resultContainerElement = document.getElementById('result-container');
    const resultElement = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');

    let currentQuestionIndex, scores;

    restartButton.addEventListener('click', startGame);

    function startGame() {
        scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        resultContainerElement.classList.add('hide');
        displayQuestion();
        updateProgressBar();
    }

    function displayQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }


    function updateProgressBar() {
        const totalQuestions = questions.length;
        const currentQuestionNumber = currentQuestionIndex + 1; // Assuming currentQuestionIndex is 0-based
        const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = progressPercentage + '%';

    }


    function selectAnswer(answer) {
        const { house } = answer;
        scores[house] += 10; // Assuming each answer contributes 10 points to the respective house
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            updateProgressBar();
        } else {
            showResult();
        }
    }


     function showResult() {
        const sortingHatImage = document.getElementById('sorting-hat-image');
        sortingHatImage.style.display = 'block'; // Make sure the hat is visible
         sortingHatImage.style.animation = 'spinDrop 2s ease forwards, wobble 0.5s ease 2s infinite'; // Apply the rolling animation

        setTimeout(() => {
            const highestScoreHouse = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            resultElement.innerText = `You belong to ${highestScoreHouse}!`;

           
            const resultImage = document.getElementById('result-image');
            resultImage.style.display = 'block'; 
            switch (highestScoreHouse) {
                case 'Gryffindor':
                    resultImage.src = 'img/grifindor.png';
                    break;
                case 'Hufflepuff':
                    resultImage.src = 'img/hufel.jpeg';
                    break;
                case 'Ravenclaw':
                    resultImage.src = 'img/revlenko.jpeg';
                    break;
                case 'Slytherin':
                    resultImage.src = 'img/sletherin.jpeg';
                    break;
                default:
                    resultImage.style.display = 'none'; 
            }

            questionContainerElement.classList.add('hide');
            resultContainerElement.classList.remove('hide');

        }, 1000); 
    } 



    startGame();
    updateProgressBar();
});
