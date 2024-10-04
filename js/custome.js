const quizData = [
    {
        question: "What is the capital of France?",
        a: "New York",
        b: "London",
        c: "Paris",
        d: "Berlin",
        correct: "c",
    },
    {
        question: "Which language is used for web development?",
        a: "Python",
        b: "JavaScript",
        c: "C++",
        d: "Java",
        correct: "b",
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Mark Zuckerberg",
        correct: "b",
    },
    {
        question: "HTML stands for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks and Text Markup Language",
        d: "Hyper Tool Markup Language",
        correct: "a",
    },
    {
        question: "Which year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "1993",
        correct: "b",
    },
];

const questionEl = document.getElementById("question");
const a_text = document.getElementById("a");
const b_text = document.getElementById("b");
const c_text = document.getElementById("c");
const d_text = document.getElementById("d");
const resultPage = document.querySelector('.result_page');
const resultMessage = document.querySelector('.result_msg');
const totalQuestions = quizData.length;

let currentQuiz = 0;
let score = 0;
let countdownInterval;

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    const quizIndexEl = document.getElementById("activeStep");
    quizIndexEl.innerText = `${currentQuiz + 1}/${quizData.length}`;
    startCountdown();
}

function startCountdown() {
    let countdown = 10; // 10 seconds per question
    const timeRemain = document.getElementById("time-remain");
    timeRemain.textContent = `${countdown}`;

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        countdown--;
        timeRemain.textContent = `${countdown}`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            nextQuiz(); // Move to next quiz when time runs out
        }
    }, 1000);
}

function getSelectedAnswer() {
    const answers = document.querySelectorAll('input[name="op1"]');
    let selectedAnswer;
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}

function nextQuiz() {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer && selectedAnswer === quizData[currentQuiz].correct) {
        score += 20; // Assign 20 points for each correct answer
    }
    
    currentQuiz++;
    
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        clearInterval(countdownInterval);
        showResult(); // Show result when the quiz ends
    }
}

function showResult() {
    // Hide quiz content and show result page
    document.querySelector('.quiz-content').style.display = 'none';
    resultPage.style.clipPath = 'circle(100% at 50% 50%)';
    resultPage.style.pointerEvents = 'auto';
    resultPage.style.visibility = 'visible';
    resultPage.style.display = 'block';

    // Determine the result message
    if (score >= 80) {
        resultMessage.innerText = 'Congratulations! You Passed!';
    } else {
        resultMessage.innerText = 'Better Luck Next Time!';
    }
}

loadQuiz();
startCountdown();
