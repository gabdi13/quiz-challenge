var questions = [
    {
        question: "Which of these is not a commonly used data type?",
        choices: ["String", "Boolean", "Numbers", "Alerts"],
        answer: 3
    },
    {
        question: "The condition in an if statement is enclosed with?",
        choices: ["Quotes", "Curly brackets", "Parenthesis", "commmas"],
        answer: 2
    },
    {
        question: "A tool used to during debuging to print content to the console is?",
        choices: ["Debugger", "Console.log", "Arrays", "Methods"],
        answer: 1
    },
    {
        question: "An array can be used to store?",
        choices: ["Objects", "Strings", "Numbers", "All of the Above"],
        answer: 3
    },
];

var currentQuestion = 0;
var correctAnswers = 0;

function showQuestion() {
    var questionText = document.getElementById("question");
    questionText.textContent = questions[currentQuestion].question;

    var choices = document.querySelectorAll("button[id^='option']");
    choices.forEach(function (choice, index) {
        choice.textContent = questions[currentQuestion].choices[index];
        choice.onclick = function () {
            checkAnswer(index);
        };
    });
}

function checkAnswer(selected) {
    var correctIndex = questions[currentQuestion].answer;
    if (selected === correctIndex) {
        // Correct answer
        correctAnswers++;
        playAudio("correctAudio");
    } else {
        // Incorrect answer
        playAudio("incorrectAudio");
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        var quizContainer = document.querySelector(".wrapper");
        quizContainer.innerHTML = "<p>You got " + correctAnswers + " out of " + questions.length + " questions.</p>" +
            "<input type='text' id='initials' placeholder='Enter Initials' />" +
            "<button onclick='saveScore()'>Save Score</button>" +
            "<ol id='highscores'></ol>";

        displayHighScores(); // Add this line to display high scores
    }
}

function playAudio(audioId) {
    var audio = document.getElementById(audioId);
    audio.play();
}

function saveScore() {
    var initialsInput = document.getElementById("initials");
    var initials = initialsInput.value;

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: correctAnswers });
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.href = "highscores.html";
}

function displayHighScores() {
    var highScoreList = document.getElementById("highscores");

    // Get high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Display high scores in the list
    highScores.forEach(function(score, index) {
        var listItem = document.createElement("li");
        listItem.textContent = (index + 1) + ". " + score.initials + ": " + score.score;
        highScoreList.appendChild(listItem);
    });
}

showQuestion();