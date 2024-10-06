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
    {
        question: "What does CSS stand for?",
        a: "Creative Style Sheets",
        b: "Cascading Style Sheets",
        c: "Computer Style Sheets",
        d: "Colorful Style Sheets",
        correct: "b",
    },
    {
        question: "Which company developed Java?",
        a: "Microsoft",
        b: "Google",
        c: "Sun Microsystems",
        d: "Apple",
        correct: "c",
    },
    {
        question: "Which HTML element is used for the largest heading?",
        a: "<h1>",
        b: "<h6>",
        c: "<heading>",
        d: "<h4>",
        correct: "a",
    },
    {
        question: "Which of the following is not a programming language?",
        a: "Python",
        b: "HTML",
        c: "Java",
        d: "Swift",
        correct: "b",
    },
    {
        question: "What does SQL stand for?",
        a: "Structured Query Language",
        b: "Simple Query Language",
        c: "Statement Query Language",
        d: "Structured Quick Language",
        correct: "a",
    },
    {
        question: "What does API stand for?",
        a: "Application Programming Interface",
        b: "Application Process Interface",
        c: "Automated Programming Interface",
        d: "Applied Process Interface",
        correct: "a",
    },
    {
        question: "Who invented the World Wide Web?",
        a: "Steve Jobs",
        b: "Bill Gates",
        c: "Tim Berners-Lee",
        d: "Mark Zuckerberg",
        correct: "c",
    },
    {
        question: "Which of the following is a NoSQL database?",
        a: "MySQL",
        b: "MongoDB",
        c: "PostgreSQL",
        d: "SQLite",
        correct: "b",
    },
    {
        question: "What is the correct way to create a comment in JavaScript?",
        a: "// This is a comment",
        b: "<!-- This is a comment -->",
        c: "/* This is a comment */",
        d: "** This is a comment",
        correct: "a",
    },
    {
        question: "Which method is used to convert JSON data into a JavaScript object?",
        a: "JSON.parse()",
        b: "JSON.stringify()",
        c: "JSON.objectify()",
        d: "JSON.convert()",
        correct: "a",
    },
    {
        question: "Which protocol is used to send web pages?",
        a: "HTTP",
        b: "FTP",
        c: "SMTP",
        d: "SSH",
        correct: "a",
    },
    {
        question: "What is the full form of PHP?",
        a: "Personal Hypertext Processor",
        b: "Preprocessor Home Page",
        c: "PHP: Hypertext Preprocessor",
        d: "Programmed Home Page",
        correct: "c",
    },
    {
        question: "Which symbol is used for comments in Python?",
        a: "//",
        b: "#",
        c: "/* */",
        d: "<!-- -->",
        correct: "b",
    },
    {
        question: "Which company owns GitHub?",
        a: "Amazon",
        b: "Google",
        c: "Microsoft",
        d: "Facebook",
        correct: "c",
    },
    {
        question: "What is the default port for HTTP?",
        a: "443",
        b: "80",
        c: "22",
        d: "21",
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
let countdownInterval;
const nextButton = document.getElementById("next-button");
const submitDiv = document.getElementById("submit-button");
let userAnswers = []; // Store user answers

function loadQuiz() {
    // Clear any previously selected radio button
    const answers = document.querySelectorAll('input[name="op1"]');
    answers.forEach(answer => answer.checked = false); // Uncheck all radio buttons

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    const quizIndexEl = document.getElementById("activeStep");
    quizIndexEl.innerText = `${currentQuiz + 1}/${quizData.length}`;

    // Disable the next button initially
    nextButton.disabled = true;
    nextButton.style.opacity = 0.7;

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
            selectedAnswer = answer.value; // Store the selected answer value
        }
    });

    return selectedAnswer;
}

document.querySelectorAll('input[name="op1"]').forEach(option => {
    option.addEventListener('change', () => {
        // Enable the next button once an option is selected
        nextButton.disabled = false;
        nextButton.style.opacity = 1;
    });
});

function nextQuiz() {
    const selectedAnswer = getSelectedAnswer();
    userAnswers[currentQuiz] = selectedAnswer; // Store the selected answerFs

    currentQuiz++;

    if (currentQuiz < quizData.length - 1) {
        // Load the next question if it's not the last one
        loadQuiz();
    } else if (currentQuiz === quizData.length - 1) {
        // On the last question, show the submit button and hide the next button
        loadQuiz();
        submitDiv.style.display = "block";
        nextButton.style.display = "none";
    } else {
        showResult()
        clearInterval(countdownInterval);
    }
}

// function showResult() {
//     let correctAnswers = 0;
//     let wrongAnswers = 0;
//     let skippedAnswers = 0;



//     quizData.forEach((quiz, index) => {
//         const selectedAnswer = userAnswers[index];

//         if (selectedAnswer) {
//             if (selectedAnswer === quiz.correct) {
//                 correctAnswers++;
//             } else {
//                 wrongAnswers++;
//             }
//         } else {
//             skippedAnswers++;
//         }
//     });


//     // Hide quiz content
//     document.querySelector('.quiz-content').style.display = 'none';

//     // Show result page
//     const resultPage = document.querySelector(".result_page");
//     // Show result page
//     resultPage.style.clipPath = 'circle(100% at 50% 50%)';
//     resultPage.style.pointerEvents = 'auto';
//     resultPage.style.visibility = 'visible';
//     resultPage.style.display = 'flex';

//     document.getElementById('correct').innerHTML = correctAnswers;
//     document.getElementById('wrong').innerHTML = wrongAnswers;
//     document.getElementById('skip').innerHTML = skippedAnswers;

//     // Create a container for showing the answers
//     const reviewContainer = document.createElement('div');
//     reviewContainer.classList.add('review-container');

//     quizData.forEach((quiz, index) => {
//         // Get the user's selected answer for the current question
//         const selectedAnswer = userAnswers[index];

//         // Create a div for each question
//         const questionBox = document.createElement('div');
//         questionBox.classList.add('review-question-box');
//         document.querySelectorAll(".review-question")

//         // Add the question text
//         const questionHeading = document.createElement('h3');
//         questionHeading.innerText = `Q${index + 1}: ${quiz.question}`;
//         questionBox.appendChild(questionHeading);

//         // Show all options for the question
//         const optionList = document.createElement('ul');
//         optionList.classList.add('option-list');

//         // Loop through each option (a, b, c, d)
//         ['a', 'b', 'c', 'd'].forEach(option => {
//             const optionEl = document.createElement('li');
//             optionEl.innerText = `${option.toUpperCase()}: ${quiz[option]}`;

//             // Highlight the correct answer in green
//             if (option === quiz.correct) {
//                 optionEl.style.color = 'green';
//                 optionEl.style.fontWeight = 'bold';
//             }

//             // Highlight the selected answer (correct or incorrect)
//             if (selectedAnswer === option) {
//                 optionEl.style.textDecoration = 'underline'; // Underline the selected answer
//                 optionEl.style.color = selectedAnswer === quiz.correct ? 'green' : 'red'; // Blue if correct, red if wrong
//             }

//             optionList.appendChild(optionEl);
//         });

//         questionBox.appendChild(optionList);

//         // Append the question box to the review container
//         reviewContainer.appendChild(questionBox);
//     });

//     // Append the review container to the result inner section
//     resultInner.appendChild(reviewContainer);

// }


function showResult() {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let skippedAnswers = 0;

    quizData.forEach((quiz, index) => {
        const selectedAnswer = userAnswers[index];

        if (selectedAnswer) {
            if (selectedAnswer === quiz.correct) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        } else {
            skippedAnswers++;
        }
    });

    // Hide quiz content
    document.querySelector('.quiz-content').style.display = 'none';

    // Show result page
    const resultPage = document.querySelector(".result_page");
    resultPage.style.clipPath = 'circle(100% at 50% 50%)';
    resultPage.style.pointerEvents = 'auto';
    resultPage.style.visibility = 'visible';
    resultPage.style.display = 'flex';

    document.getElementById('correct').innerHTML = correctAnswers;
    document.getElementById('wrong').innerHTML = wrongAnswers;
    document.getElementById('skip').innerHTML = skippedAnswers;

    // Get the container for review questions
    const reviewContainer = document.querySelector('.review-container');
    reviewContainer.innerHTML = ''; // Clear it before adding new content

    // Loop through quiz data and display the results
    quizData.forEach((quiz, index) => {
        // Create a new div for each question
        const questionBox = document.createElement('div');
        questionBox.classList.add('review-question-box');

        // Add the question heading
        const questionHeading = document.createElement('h3');
        questionHeading.innerText = `Q${index + 1}: ${quiz.question}`;
        questionBox.appendChild(questionHeading);

        // Create the option list
        const optionList = document.createElement('ul');

        // Loop through each option (a, b, c, d)
        ['a', 'b', 'c', 'd'].forEach(option => {
            const optionElement = document.createElement('li');
            optionElement.classList.add('option');
            optionElement.id = `option-${option}-${index}`; // Unique ID for each option

            optionElement.innerText = `${option.toUpperCase()}: ${quiz[option]}`;

            // Highlight correct answer
            if (option === quiz.correct) {
                optionElement.style.color = 'green';
                optionElement.style.backgroundColor = '#c2ffc2'; // Correct background color for the right answer
                optionElement.style.fontWeight = 'bold';
            }


            // Highlight the selected answer
            const selectedAnswer = userAnswers[index];
            if (selectedAnswer === option) {
                optionElement.style.color = selectedAnswer === quiz.correct ? 'green' : 'red';
                optionElement.style.backgroundColor = selectedAnswer === quiz.correct ? '#c2ffc2' : '#ffbfbf'; // Background color based on correctness
                optionElement.style.borderColor = selectedAnswer === quiz.correct ? 'green' : 'red'; // Border color for selected answer
            }

            optionList.appendChild(optionElement);
        });

        // If no answer was selected, show "Skipped" message
        if (!userAnswers[index]) {
            const skippedMessage = document.createElement('li');
            skippedMessage.innerText = "Skipped";
            skippedMessage.style.color = 'orange'; // Style for skipped questions
            skippedMessage.style.fontWeight = 'bold';
            skippedMessage.style.fontStyle = 'italic';
            optionList.appendChild(skippedMessage);
        }

        // Append the option list to the question box
        questionBox.appendChild(optionList);

        // Append the question box to the review container
        reviewContainer.appendChild(questionBox);
    });
}

loadQuiz();
startCountdown();
