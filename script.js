const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            {text: "Berlin", correct: false},
            {text: "Amsterdam", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false}
        ]
    },
    {
        question: 'Who wrote "Pride and Prejudice"?',
        answers: [
            {text: "Jane Austen", correct: true},
            {text: "Mark Twain", correct: false},
            {text: "Charles Dickens", correct: false},
            {text: "J.K. Rowling", correct: false}
        ]
    },
    {
        question: 'What is the chemical symbol for gold?',
        answers: [
            {text: "Ag", correct: false},
            {text: "Fe", correct: false},
            {text: "Hg", correct: false},
            {text: "Au", correct: true}
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            {text: "Vincent van Gogh", correct: false},
            {text: "Leonardo da Vinci", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: "Claude Monet", correct: false}
        ]
    },
    {
        question: 'What is the largest planet in our Solar System?',
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: 'In which year did the Titanic sink?',
        answers: [
            {text: "1910", correct: false},
            {text: "1914", correct: false},
            {text: "1916", correct: false},
            {text: "1912", correct: true}
        ]
    },
    {
        question: 'Who developed the theory of relativity?',
        answers: [
            {text: "Albert Einstein", correct: true},
            {text: "Isaac Newton", correct: false},
            {text: "Nikola Tesla", correct: false},
            {text: "Galileo Galilei", correct: false}
        ]
    },
    {
        question: 'What is the powerhouse of the cell?',
        answers: [
            {text: "Nucleus", correct: false},
            {text: "Ribosome", correct: false},
            {text: "Chloroplast", correct: false},
            {text: "Mitochondria", correct: true}
        ]
    },
    {
        question: 'Which element has the atomic number 1?',
        answers: [
            {text: "Helium", correct: false},
            {text: "Hydrogen", correct: true},
            {text: "Oxygen", correct: false},
            {text: "Carbon", correct: false}
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false}
        ]
    }
];    

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

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
