var startBtn = document.querySelector("#start-btn");
var startPage = document.querySelector("#start-page");
var timer = document.querySelector("#timer");

var highScoreBtn = document.querySelector("#high-score-btn");
var highScorePage = document.querySelector("#high-score-page");
var scoresList = document.querySelector("#scores-list");
var questionContainer = document.querySelector("#question-container");
var questionsEl = document.querySelector(".questions");
var body = document.body;

var timesUp = document.querySelector("#times-up");
var showScore = document.querySelector(".show-score");
var userScore = document.querySelector("#user-score");
var userInputSubmit = document.querySelector("#user-initial-submit");

var score = 0;
var highScore = "";
var currentQuestion, shuffledQuestions;

// Add more questions
var questionsArray = [
    {
        question: "which phase of propagation travels from the target node to the root node?",
        answers: ["A: Capturing", "B: Propagation", "C: Bubbling", "D: Travel"],
        correct: "C: Bubbling"
    },
    
    {
        question: "How can we retrieve an an HTML's attribute using JavaScript?",
        answers: ["A: retrieveAttribute", "B: getAttribute", "C: setAttribute", "D: addAttribute"],
        correct: "B: getAttribute"
    },

    {
        question: "What methods can be used with timers?",
        answers: ["setTimeout", "setInterval", "clearInterval", "All of the above"],
        correct: "All of the above" 
    },
    {
        question: "Which answer best represents appending a child element?",
        answers: ["document.appendChild(document2)", "document(appendChild).document2", "appendChild(document[document2])", "All of the above"],
        correct: "document.appendChild(document2)" 
    },
]


// Randomizing the questions using Fisher-Yates algorithm
var questionShuffle = function () {
    // Looping over items in reverse order
    for (let i = questionsArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        var temp = questionsArray[i];

        questionsArray[i] = questionsArray[j];
        questionsArray[j] = temp;
    }
    shuffledQuestions = questionsArray;
    return shuffledQuestions;
}

// Only displays the question container
var startQuiz = function () {
    startPage.style.display = "none";
    questionContainer.style.display = "block";
    timesUp.style.display = "none";
    currentQuestion = 0;
    timerStart();
    questionShuffle();
    nextQuestion();
}

// When called, it goes to the next question as it iterates to the next currentQuestion variable
var goNext = function () {
    currentQuestion++;
    nextQuestion();
}


var nextQuestion = function() {
    displayQuestion(shuffledQuestions[currentQuestion])
}

var displayQuestion = function(question) {
    questionsEl.innerHTML = question.question;

    var answersContainer = document.createElement("div");
    var answerli1 = document.createElement("button");
    var answerli2 = document.createElement("button");
    var answerli3 = document.createElement("button");
    var answerli4 = document.createElement("button");

    answerli1.innerHTML = questionsArray[currentQuestion].answers[0];
    answerli2.innerHTML = questionsArray[currentQuestion].answers[1];
    answerli3.innerHTML = questionsArray[currentQuestion].answers[2];
    answerli4.innerHTML = questionsArray[currentQuestion].answers[3];

    questionsEl.appendChild(answersContainer);
    questionsEl.appendChild(answerli1);
    questionsEl.appendChild(answerli2);
    questionsEl.appendChild(answerli3);
    questionsEl.appendChild(answerli4);

    answerli1.addEventListener("click", answerCheck);
    answerli2.addEventListener("click", answerCheck);
    answerli3.addEventListener("click", answerCheck);
    answerli4.addEventListener("click", answerCheck);
}


var answerCheck = function (e) {
    var answerSelection = e.target;

    // Matching button clicked to the 'correct' object in the questionsArray
    if (answerSelection.textContent === questionsArray[currentQuestion].correct) {
        score++;
        displayCorrect();
    } else {
        timer.textContent -= 10;
        displayINcorrect();
    }

    // If there are more questions, call goNext(). If no more questions, call timeOver()
    if(shuffledQuestions.length > currentQuestion + 1) {
        goNext();
    } else {
        timeOver();
    }
}

// Displaying a temporary visual cue to user's choice
var displayCorrect = function () {
    var correctEl = document.createElement("h2");
    correctEl.textContent = "Correct!";
    var correctInterval = setInterval(function () {
        correctEl.textContent = "";
        clearInterval(correctInterval);
    }, 500)

    questionContainer.appendChild(correctEl);
}

var displayINcorrect = function () {
    var inCorrectEl = document.createElement("h2");
    inCorrectEl.textContent = "Wrong!";
    var inCorrectInterval = setInterval(function () {
        inCorrectEl.textContent = "";
        clearInterval(inCorrectInterval);
    }, 500)

    questionContainer.appendChild(inCorrectEl);
}

// Initial timer to start at 60 when function is called that will run only when timer is above 0.
var timerStart = function() {
    timer.textContent = 60;

    var interval = setInterval(function() {
        if(timer.textContent > 0) {
            timer.textContent--;
        } else if(timer.textContent === 0 || timer.textContent < 0) {
            timer.textContent = 0;
            clearInterval(interval);
            timeOver();
         }
    }, 1000);
}

var timeOver = function () {
    timesUp.style.display = "block";
    startPage.style.display = "none";
    questionContainer.style.display = "none";

    // Set timer to 0 so the timerStart function can clearInterval
    timer.textContent = 0;
    userScore.textContent = score + "/" + shuffledQuestions.length;
}

// When user submits their initials, append 'play again' and 'view high scores' elements
userInputSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    var highScoreBeat = document.createElement("h3");
    var form = document.querySelector("form");
    highScoreBeat.textContent = "Your score has been recorded. Thanks for playing!"
    
    form.appendChild(highScoreBeat);

    var playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play Again?";
    playAgainBtn.setAttribute("style", "margin: 5px");
    playAgainBtn.setAttribute("type", "button");

 
    playAgainBtn.addEventListener("click", restart);

    var viewScores = document.createElement("button");
    viewScores.textContent = "View High Scores";
    viewScores.setAttribute("style", "margin: 5px");
    
    viewScores.addEventListener("click", viewHighScores);

    form.appendChild(highScoreBeat);
    showScore.appendChild(playAgainBtn);
    showScore.appendChild(viewScores);
})

var viewHighScores = function () {

}

// Reload the entire page so the program restarts
var restart = function () {
    location.reload();
}

// Calling the startQuiz function when the 'start' button is clicked
startBtn.addEventListener("click", startQuiz);

// On window load, hide the other containers so only the start page appears
window.onload = function () {
    questionContainer.style.display = "none";
    timesUp.style.display = "none";
    
}


// var displayQuestions = function () {
//     var questionH2 = document.createElement("h2");
//     var allAnswers = document.createElement("div");
//     var answerli1 = document.createElement("button");
//     var answerli2 = document.createElement("button");
//     var answerli3 = document.createElement("button");
//     var answerli4 = document.createElement("button");
//     var answerSelector = document.querySelector("button");

//     questionH2.innerHTML = questionsArray[currentQuestion].question;

//         answerli1.innerHTML = questionsArray[currentQuestion].answers[0].text;
//         answerli2.innerHTML = questionsArray[currentQuestion].answers[1].text;
//         answerli3.innerHTML = questionsArray[currentQuestion].answers[2].text;
//         answerli4.innerHTML = questionsArray[currentQuestion].answers[3].text;

//     questionsEl.appendChild(questionH2);
//     questionsEl.appendChild(allAnswers);
//     allAnswers.appendChild(answerli1);
//     allAnswers.appendChild(answerli2);
//     allAnswers.appendChild(answerli3);
//     allAnswers.appendChild(answerli4);

//     allAnswers.setAttribute("style", "display: flex; flex-direction: column; align-items: flex-start;");

// }

