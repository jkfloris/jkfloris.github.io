const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// import { quizData } from vragenlijst;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {

    const optionText = document.createTextNode(shuffledOptions[i]);
    
    const option = document.createElement('label');
    option.htmlFor = shuffledOptions[i];
    option.innerHTML = shuffledOptions[i];


    const radio = document.createElement('input');
      radio.id = shuffledOptions[i];
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];

    optionsElement.appendChild(radio);
    optionsElement.appendChild(option);
    
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');

  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  let uitslag = (score / quizData.length * 10).toFixed(0);
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  if (uitslag > 6) {
    resultContainer.innerHTML = `Gefeliciteerd!<br>Je hebt een <span class="goed">${uitslag}</span>!<br>Ga zo door.`;
  } else {
    resultContainer.innerHTML = `Jammer!<br>Je hebt een <span class="fout">${uitslag}</span><br>Probeer het nog een keer.`;
    }
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  window.location='index.html'
  //displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <div class="nakijken">
        ${incorrectAnswers[i].question}<br>
        Jouw antwoord:<div class="fout"> ${incorrectAnswers[i].incorrectAnswer}</div>
        <br>
        Het goede antwoord:<div class="goed"> ${incorrectAnswers[i].correctAnswer}</div>
        <hr>
      </div>
    `;
  }

  resultContainer.innerHTML = `
    <div class="score">Je hebt <span class="punten"> ${score} </span> van 
    de <span class="punten"> ${quizData.length} </span> vragen goed.</div>
    <div class="nakijken">Deze vragen had je fout:</div>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
