function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return choice === this.answer;
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questions.length === this.questionIndex;
};

function showScore() {
  percentage = (gradQuiz.score / gradQuiz.questions.length) * 100;
  document.querySelector("#quiz").innerHTML = `<h1>Result</h1>
      <div id="score">You scored ${gradQuiz.score} / ${gradQuiz.questions.length}</div>
      <div id="per_score">Your percentage score is ${percentage}%</div>`;
}

function loadQuestion() {
  if (gradQuiz.isEnded()) {
    showScore();
    return;
  }

  var currentQuestion = gradQuiz.getCurrentQuestion();

  document.querySelector("#question").textContent = currentQuestion.text;

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    document.getElementById("choice" + i).textContent =
      currentQuestion.choices[i];
    handleOptionButtonClick("btn" + i, currentQuestion.choices[i]);
  }
  showProgress();
}

function handleOptionButtonClick(btnId, choice) {
  var button = document.querySelector("#" + btnId);
  button.onclick = function () {
    gradQuiz.checkOptionWithAnswer(choice);
    loadQuestion();
  };
}

function showProgress() {
  document.querySelector("#progress").textContent =
    "Question " +
    (gradQuiz.questionIndex + 1) +
    " of " +
    gradQuiz.questions.length;
}

var questions = [
  new Question(
    "Which of them are closures in Javascript?",
    ["Variables", "Functions", "Objects", "All of the above"],
    "All of the above"
  ),
  new Question(
    "Which function is used to serialize an object into a JSON string in Javascript?",
    ["stringify()", "parse()", "convert()", "None of the above"],
    "stringify()"
  ),
  new Question(
    "Which keyword is used to check whether a given property is valid or not?",
    ["in", "is in", "exists", "lies"],
    "in"
  ),
  new Question(
    "Upon encountering empty statements, what does Javascript Interpreter do?",
    [
      "Throws an error",
      "Ignores the statements",
      "Gives a warning",
      "None of the above",
    ],
    "Ignores the statements"
  ),
  new Question(
    "JavaScript is an ________ language ",
    ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
    "Object-Oriented"
  ),
];

var gradQuiz = new Quiz(questions);
loadQuestion();
