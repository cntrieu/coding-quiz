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

var questionsArray = [
    {
        question: "which phase of propagation travels from the target node to the root node?",
        answer: [{text: "A: Capturing", correct: false},
        {text: "B: Propagation", correct: false},
        {text: "C: Bubbling", correct: true},
        {text: "D: Travel", correct: false}]
    },
    {
        question: "How can we retrieve an an HTML's attribute using JavaScript?",
        answer: [{text: "A: retrieveAttribute", correct: false},
        {text: "B: getAttribute", correct: true},
        {text: "C: setAttribute", correct: false},
        {text: "D: addAttribute", correct: false}]
    },
    {
        question: "placeholder",
        answer: [{text: "A: rAAAAAA", correct: false},
        {text: "B: JJJJJJJ", correct: true},
        {text: "C: setAttribute", correct: false},
        {text: "D: addAttribute", correct: false}]
    },
    {
        question: "PLACEHOLDING",
        answer: [{text: "A: WDAWDS", correct: false},
        {text: "B: WDASD", correct: true},
        {text: "C: setAttribute", correct: false},
        {text: "D: addAttribute", correct: false}]
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
    console.log(questionsArray);
}

var timerStart = function() {
    timer.textContent = 60;

    var interval = setInterval(function() {
        timer.textContent--;

        if(timer.textContent == 0) {
            clearInterval(interval);
            timeOver();
         }
    }, 10);
}

var timeOver = function () {
    timesUp.style.display = "block";
    
}

startBtn.addEventListener("click", function() {
    startPage.style.display = "none";
    questionContainer.style.display = "block";
    timerStart();
    questionShuffle();
})

// On window load, hide the other containers so only the start page appears
window.onload = function () {
    questionContainer.style.display = "none";
    timesUp.style.display = "none";
}


//On user click of start -->
    // - Begin Timer ;
    // - highScore set to 0;
    // - Manipulate HTML so section is hidden to reveal first question
    //     - place questions in an object. Each question will have 3-4 answers with one true value and rest falsy values 
    // - When question 1 is answered -->
    //     - IF FALSE --> timer -10 seconds, change to next question
    //     - IF TRUE --> score +10, change to next question
    // - When timer = 0, display "Time's up!" 
    //     - if currentScore > highScore, highScore = currentScore. 
    //         - Store score of user initials in localStorage.setItem("")?? or smthin else
    // When "View High Scores" is clicked on, localStorage.getItem() retrieves the users high score attempts


// localStorage.setItem("paragraph", content)
// In the above code, what other line of code do we use to retrieve the value in the local storage?
// a - localStorage.getItem("paragraph"), b - return localStorage(); 

