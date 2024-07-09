const questions = [
    {
        question: 'Which production car currently holds the nurburgring record?',
        answers: [
            { text: 'Lamborghini Aventador SVJ', correct: false },
            { text: 'Porsche 911 GT2RS', correct: false },
            { text: 'Mercedes AMG One', correct: true },
            { text: 'Koenigsegg Agera RS', correct: false },
        ]
    },
    {
        question: "Which of the following Ferrari models is not part of their special series?",
        answers: [
            { text: 'Ferrari LaFerrari', correct: false },
            { text: 'Ferrari SP3 Daytona', correct: false },
            { text: 'Ferrari F50', correct: false },
            { text: 'Ferrari SF-90', correct: true },
        ]
    },
    {
        question: "Japan has pioneered some incredible cars over the past 30 years and some have become pop culture icons. Which of the following cars WAS featured in Fast and Furious: Tokyo Drift?",
        answers: [
            { text: 'Lamborghini Diablo', correct: false },
            { text: 'Dodge Charger RTR', correct: false },
            { text: 'Ford Mustang', correct: false },
            { text: 'Mitsubishi Lancer EVO IX', correct: true },
        ]
    },
    {
        question: "What car is the best selling car of 2023 in the UK?",
        answers: [
            { text: 'Ford Puma', correct: true },
            { text: 'Vauxhall Corsa', correct: false },
            { text: 'Tesla Model Y', correct: false },
            { text: 'Nissan Juke', correct: false },
        ]
    },
    {
        question: "Which car holds the title for most expensive car ever sold at auction?",
        answers: [
            { text: 'Ferrari 250 GTO', correct: false },
            { text: 'Mercedes-Benz 300 slr Uhlenhaut', correct: true },
            { text: 'Bugatti La Voiture Noire', correct: false },
            { text: 'Mercedes-Benz W196', correct: false },
        ]
    },
    {
        question: "Which McLaren won the world famous Le Mans race in 1995?",
        answers: [
            { text: 'McLaren P1', correct: false },
            { text: 'McLaren-Mercedes SLR', correct: false },
            { text: 'McLaren Senna', correct: false },
            { text: 'McLaren F1', correct: true },
        ]
    },
    {
        question: "Which production car was the first to break the 300mph barrier?",
        answers: [
            { text: 'Bugatti Chiron SuperSport', correct: true },
            { text: 'Koenigsegg Agera RS', correct: false },
            { text: 'Hennessey Venom GT', correct: false },
            { text: 'SSC Aero', correct: false },
        ]
    }
];

const questionElement = document.getElementById("Question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// https://www.youtube.com/watch?v=PBcqGxrr9g8&list=PLjwm_8O3suyOgDS_Z8AWbbq3zpCmR-WE9&index=3 tutorial video explaining every step
// we're adding indexes for the questions so we know which question is where, they start at 0 in JS so 0 is question 1 

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// the last line enables for when the user clicks on an answer button it calls the function select answer
// ^ answer.buttons.appendChild displays the button in the answers, the div is answer-buttons so its telling it to display the button in this div by using answer button.appendChild so it will display the question and answer
// answer.text adds the texts after the answers in the inner html, so the text of Bugatti Chiron and Koenigsegg Agera RS are displayed as answers because we've put answers.text 

// the below is displaying the output by using start quiz function 
// this removes all the previous answers and displays the question and the answers for that question 
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    //  this allows each button to be checked if its true, and if it is it will add the class name Correct and add the green colour, and vice versa if its false
    // the next button line shows the next button popping up once something has been clicked
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
