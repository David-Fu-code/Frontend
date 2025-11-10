// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0
let answersDisable = 0

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// event Listeners
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)


function startQuiz (){
  // reset var if not the score is gonna keep incresing if we restart quiz
  currentQuestionIndex = 0
  score = 0
  scoreSpan.textContent = score

  startScreen.classList.remove("active")
  quizScreen.classList.add("active")

  showQuestion()
}

function showQuestion (){
  // Re-enable answers for the new question
  answersDisable = false

  // Get the current question object
  const currentQuestion = quizQuestions[currentQuestionIndex]
  currentQuestionSpan.textContent = currentQuestionIndex + 1

  // Calculate progress bar percentage
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%"

  // Update question text
  questionText.textContent = currentQuestion.question

  // Clear previous answer -> to prevent them from showing again
  answersContainer.innerHTML = "";

  // Create answer buttons dynamically
  currentQuestion.answers.forEach(answer =>{
    // Create buttons for each possible answer
    const button = document.createElement("button")
    button.textContent = answer.text
    button.classList.add("answers-btn")

    // dataset? It's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct

    button.addEventListener("click", selectAnswer)

    answersContainer.appendChild(button)
  })

 }

function selectAnswer(event) {
   // Prevent selecting multiple answers
   if (answersDisable) return

   answersDisable = true

   const selectedButton = event.target;
   const isCorrect = selectedButton.dataset.correct === "true"

   // Show the correct answer when the chosen one is wrong
   // Convert NodeList to Array to use forEach
  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true"){
      button.classList.add("correct");
      // When the correct answer is chosen, wrong ones are not highlighted
    } else if(button === selectedButton){
      button.classList.add("incorrect");
    }
  });

  // Update the score if the answer is correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() =>{
    currentQuestionIndex++;

    // Move to the next question or show results after a short delay
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    } else {
      showResults()
    }
  }, 1000)
 }

function showResults() {
  // Hide the quiz screen and show the results screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // Display final score and percentage
  finalScoreSpan.textContent = score;

  // Show a message based on performance
  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz (){
  // Hide the result screen and start a new quiz
  resultScreen.classList.remove("active")
  startQuiz();
}