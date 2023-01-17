var startBtn = document.querySelector("#start-btn");
var startPage = document.querySelector("#start-page");
var timer = document.querySelector("#timer");

var highScoreBtn = document.querySelector("#high-score-btn");
var questionContainer = document.querySelector("#question-container");
var questionsEl = document.querySelector(".questions");
var body = document.body;

var timesUp = document.querySelector("#times-up");
var showScore = document.querySelector(".show-score");

var score = 0;
var currentQuestion, shuffledQuestions;

var orderedList = document.querySelector("#ordered-list");

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

var startQuiz = function () {
    startPage.style.display = "none";
    questionContainer.style.display = "block";
    currentQuestion = 0;
    timerStart();
    questionShuffle();
    nextQuestion();
}

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

    if (answerSelection.textContent === questionsArray[currentQuestion].correct) {
        score++;
        displayCorrect();
    } else {
        timer.textContent -= 10;
        displayINcorrect();
    }

    if(shuffledQuestions.length > currentQuestion + 1) {
        goNext();
    } else {
        showResults();
    }
}

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



var timerStart = function() {
    timer.textContent = 60;

    var interval = setInterval(function() {
        timer.textContent--;

        if(timer.textContent == 0) {
            clearInterval(interval);
            timeOver();
         }
    }, 1000);
}

var timeOver = function () {
    timesUp.style.display = "block";
    
}

var showResults = function () {
    // CREATE FUNCTION FOR THE END OF THE QUIZ
}

startBtn.addEventListener("click", startQuiz)

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

