var startBtn = document.querySelector("#start-btn");
var startPage = document.querySelector("#start-page");
var timer = document.querySelector("#timer");
var header = document.querySelector("header");

var highScoreBtn = document.querySelector("#high-score-btn");
var highScorePage = document.querySelector("#high-score-page");
var scoresList = document.querySelector("#scores-list");
var questionContainer = document.querySelector("#question-container");
var questionsEl = document.querySelector(".questions");

var timesUp = document.querySelector("#times-up");
var showScore = document.querySelector(".show-score");
var userScore = document.querySelector("#user-score");
var userInputSubmit = document.querySelector("#user-initial-submit");
var userText = document.querySelector("#user-text");
var goBackBtn = document.querySelector("#goBackBtn");
var clearScoreBtn = document.querySelector("#clear-scores");

var score = 0;
var highScore = "";
var scoreArray = [];
var currentQuestion, shuffledQuestions;

// Function called right away to display the start page and to load localStorage if available
var init = function () {
    questionContainer.style.display = "none";
    timesUp.style.display = "none";
    highScorePage.style.display = "none";

    var allScores = JSON.parse(localStorage.getItem("scores"));

    if (allScores !== null) {
        scoreArray = allScores;
    }
}

var questionsArray = [
    {
        question: "Which phase of propagation travels from the target node to the root node?",
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
        answers: ["A: setTimeout", "B: setInterval", "C: clearInterval", "D: All of the above"],
        correct: "D: All of the above" 
    },
    {
        question: "Which answer best represents appending a child element?",
        answers: ["A: document.appendChild(document2)", "B: document(appendChild).document2", "C: appendChild(document[document2])", "D: All of the above"],
        correct: "A: document.appendChild(document2)" 
    },
    {
        question: "What does JSON stand for?",
        answers: ["A: JavaScript Orientation Nodule", "B: JavaScript Object Notation", "C: Java Overnight", "D: All of the above"],
        correct: "B: JavaScript Object Notation" 
    },
    {
        question: "What method would we use to prevent a user from submitting a form?",
        answers: ["A: stopSubmit()", "B: noSubmit()", "C: preventDefault()", "D: All of the above"],
        correct: "C: preventDefault()" 
    },
    {
        question: "In jQuery, how do we represent the method addEventListener()?",
        answers: ["A: .addEventListener()", "B: .on()", "C: .onClick()", "D: .listen()"],
        correct: "B: .on()" 
    },
    {
        question: "How do we check the value of a variable?",
        answers: ["A: typeof()", "B: variable()", "C: check()", "D: var()"],
        correct: "A: typeof()" 
    },
    
]

// Randomizing the questions using Fisher-Yates algorithm
var questionShuffle = function () {
    // Looping over items in reverse order
    for (var i = questionsArray.length - 1; i > 0; i--) {
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

var displayQuestion = function(e) {
    questionsEl.innerHTML = e.question;
   
    // looping through the nested array length of answers and appending each and then calling answerCheck function on click
    for (var i = 0; i < questionsArray[currentQuestion].answers.length; i++) {
        var answerArray = document.createElement("button");
            answerArray.innerHTML = questionsArray[currentQuestion].answers[i];
            answerArray.setAttribute("class", "btn-answers");
          
            questionsEl.appendChild(answerArray);
            answerArray.addEventListener("click", answerCheck);
        }
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
 
    // If there are more questions, call goNext(). If no more questions, call timeOver(). 
    // If length of shuffled questions is bigger than current Question + 1, there are more questions (currentQuestion starts at 0)
    if(shuffledQuestions.length > currentQuestion + 1) {
        goNext();
    } else {
        timeOver();
    }
}

// Displaying a temporary visual cue to user's choice (correct or wrong)
var displayCorrect = function () {
    var correctEl = document.getElementById("correct");
    correctEl.style.display = "block";

    var correctInterval = setInterval(function () {
        correctEl.style.display = "none";
        clearInterval(correctInterval);
    }, 450)
}

var displayINcorrect = function () {
    var wrongEl = document.getElementById("wrong");
    wrongEl.style.display = "block";

    var inCorrectInterval = setInterval(function () {
        wrongEl.style.display = "none";
        clearInterval(inCorrectInterval);
    }, 450)
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

    // Display users score out of the amount of questions
    userScore.textContent = score + "/" + shuffledQuestions.length;
}

// When user submits their initials, store their score in an object by using push(). Afterwards, append 'view high scores' element and then call storeScores to store the scores in localStorage
userInputSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    var initials = userText.value.trim();
    if (!initials) {
        return;
    }

    // An object that holds initials and scores. The
    var storedScore = {initials: initials, scores: score};
    scoreArray.push(storedScore);
   

    var highScoreBeat = document.createElement("h3");
    var form = document.querySelector("form");
    highScoreBeat.textContent = "Your score has been recorded. Thanks for playing!"
    
    var viewScores = document.createElement("button");
    viewScores.textContent = "View High Scores";
    viewScores.setAttribute("style", "margin: 5px");
    viewScores.addEventListener("click", viewHighScores);

    form.appendChild(highScoreBeat);
    showScore.appendChild(viewScores);
 
    storeScores();
})

var storeScores = function () {
    localStorage.setItem("scores", JSON.stringify(scoreArray));
}

var loadScores = function () {
    // Using the sort method to arrange the scores in ascending order
    var sortedScores = scoreArray.sort(function(a, b) {
        return b.scores - a.scores;
    })

    // Looping through the sorted array of scores and creating a list item for each to display the scores
    for (var i = 0; i < sortedScores.length; i++) {
        var scoreli = document.createElement('li');
        scoreli.textContent = sortedScores[i].initials + " ------ " + sortedScores[i].scores + " point(s)";
        scoreli.setAttribute("style", "text-align: left; padding: 0.25em 1em 0.25em 1em;");
        scoresList.appendChild(scoreli);
    }
    
    goBack();
    clearScores();
}

var viewHighScores = function () {
    highScorePage.style.display = "block";
    timesUp.style.display = "none";
    startPage.style.display = "none";
    questionContainer.style.display = "none";
    header.style.display = "none";
    loadScores();
}

var goBack = function () {
    goBackBtn.addEventListener("click", restart);
}

// When clicked, will clear the scores and reload the page so all scores will be cleared
var clearScores = function () {
    clearScoreBtn.addEventListener("click", function () { localStorage.removeItem('scores');
    scoreArray = [];
    restart();
    });
}

// Reload the entire page so the program when this function called
var restart = function () {
    location.reload();
}

// Calling the startQuiz function when the 'start' button is clicked
startBtn.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", viewHighScores);

// On window load, call init which hides other displays except for start page
init();
