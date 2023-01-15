var startBtn = document.querySelector("#start-btn");
var startPage = document.querySelector("#start-page");
var timer = document.querySelector("#timer");
var score = 0;
var highScoreBtn = document.querySelector("#high-score-btn");





var questionsArray = [
    {
    id: 0,
    question: "which phase of propagation travels from the target node to the root node?",
    answer: [{text: "A: Capturing", correct: false},
    {text: "B: Propagation", correct: false},
    {text: "C: Bubbling", correct: true},
    {text: "D: Travel", correct: false}]
    },
    {
    id: 1,
    question: "How can we retrieve an an HTML's attribute using JavaScript?",
    answer: [{text: "A: retrieveAttribute", correct: false},
    {text: "B: getAttribute", correct: true},
    {text: "C: setAttribute", correct: false},
    {text: "D: addAttribute", correct: false}]
    }
]

var timerStart = function() {
    timer.textContent = 60;

    var interval = setInterval(function() {
        timer.textContent--;

        if(timer.textContent == 0) {
            clearInterval(interval);
            timeOver();
          
         }
    }, 100);
}

var timeOver = function () {

}

startBtn.addEventListener("click", function() {
    startPage.style.display = "none";
    timerStart();
})


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



// How can we retrieve an an HTML's attribute using JavaScript?
// a - retrieveAttribute, b - getAttribute, c - setAttribute, d - addAttribute

// localStorage.setItem("paragraph", content)
// In the above code, what other line of code do we use to retrieve the value in the local storage?
// a - localStorage.getItem("paragraph"), b - return localStorage(); 

