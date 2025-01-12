const quizContainer = document.getElementById("quiz");
const quizSelection = document.getElementById("quiz-selection");
const quizList = document.getElementById("quiz-list");
const quizTitle = document.getElementById("quiz-title");
const questionElement = document.getElementById("question");
const questionNum = document.getElementById("question-num");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const progressBar = document.getElementById("progress-bar");

const nextButton = document.getElementById("next-btn");

let alfabet = ['A', 'B', 'C', 'D']
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

// fetch data from json file
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        displayQuizSelection(data.quizzes);
    });

function displayQuizSelection(quizzes) {
    quizzes.forEach(quiz => {
        const li = document.createElement('li');
        
        const image = document.createElement('img')
        image.src = `assets/images/${quiz.title.toLowerCase()}.png`
        li.appendChild(image);

        const myDiv = document.createElement('div')
        myDiv.textContent = quiz.title;
        li.appendChild(myDiv)

        li.addEventListener('click', () => startQuiz(quiz)); 
        quizList.appendChild(li);
    });
}

function startQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    score = 0;
    quizSelection.style.display = 'none';
    quizContainer.style.display = 'flex';
    showQuestion();

    const image = document.createElement('img')
    image.src = `./assets/images/${currentQuiz.title}.png`
    quizTitle.appendChild(image);

    const myDiv = document.createElement('div')
    myDiv.textContent = currentQuiz.title;
    quizTitle.appendChild(myDiv)
}


function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];    
    questionNum.textContent = `Question ${currentQuestionIndex + 1} of 10`
    questionElement.textContent = question.question;
    progressBar.style.width = `${(currentQuestionIndex + 1) * 10}%`;
    optionsElement.innerHTML = ''; // Clear previous options

    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => selectOption(li, option));
        optionsElement.appendChild(li);
    });

    nextButton.style.display = 'none';
    submitButton.style.display = 'block';
}


function selectOption(selectedOption, optionText) {

    // Remove selected class from all options first
    const options = optionsElement.querySelectorAll('li');
    options.forEach(option => option.classList.remove('selected'));

    selectedOption.classList.add('selected');
}

function checkAnswer() {
    const selectedOption = optionsElement.querySelector('.selected');
    if (!selectedOption) {
        resultElement.textContent = 'Please select an answer.';
        return;
    }

    const answer = currentQuiz.questions[currentQuestionIndex].answer;
    const options = optionsElement.querySelectorAll('li');


    options.forEach(option => {
        if (option.textContent === answer) {
            option.style.borderColor = 'lightgreen'; // Highlight correct answer
        } else if (option === selectedOption) {
            option.style.borderColor = 'var(--red)'; // Highlight incorrect selected answer
        }
        //Disable clicking after the answer
        option.onclick=null;
    });

    if (selectedOption.textContent === answer) {
        score++;
    } else {
        // Add a checkmark or other indicator to the correct option
        const correctOption = Array.from(options).find(option => option.textContent === answer);
        // You might want to use a more visually appealing indicator (e.g., an icon)
        correctOption.innerHTML += ' ✔'; // Adds a checkmark
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.questions.length) {
        showQuestion();
    } else {
      showResults();
    }
}

function showResults() {
    questionElement.textContent = `You scored ${score} out of ${currentQuiz.questions.length}.`;
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    

    const backToSelectionButton = document.createElement('button');
    backToSelectionButton.textContent = 'Back to Quiz Selection';
    backToSelectionButton.addEventListener('click', () => {
        quizContainer.style.display = 'none';
        quizSelection.style.display = 'flex';
        quizTitle.textContent = '';


        // Remove dynamically created buttons
        backToSelectionButton.remove();
    });
    quizContainer.appendChild(backToSelectionButton);
}


submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', nextQuestion);