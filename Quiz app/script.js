const questions = [
    {
        question:"How many bits make a byte",
        answers:[
            {text:"16 bits", correct:false},
            {text:"8 bits", correct:true},
            {text:"24", correct:false},
            {text:"12 bits", correct:false},

        ],
        explanation:"A byte is a unit of digital information that consists of 8 bits. Each bit can represent a binary value of either 0 or 1. Therefore, 8 bits make up a byte.",
    },
    {
        question:"The first search engine on the internet is?",
        answers:[
            {text:"Archie", correct:true},
            {text:"Google", correct:false},
            {text:"Bing", correct:false},
            {text:"Yahoo", correct:false},

        ],
        explanation:"Archie was created in 1990 by Alan Emtage and allowed users to search for file names on FTP (File Transfer Protocol) servers. It was the precursor to modern search engines like Google, Bing, Yahoo etc.",

    },
    {
        question:"Which technology is used to record cryptocurrency transactions?",
        answers:[
            {text:"Mining", correct:false},
            {text:"Digital wallet", correct:false},
            {text:"Blockchain technology", correct:true},
            {text:"Token", correct:false},
        ],
        explanation:"Blockchain technology is used to record cryptocurrency transactions. It is a decentralized and distributed ledger technology that securely records and verifies transactions across multiple computers.",
    },
    {
        question:"The first computer virus was known as?",
        answers:[
            {text:"Rabbit", correct:false},
            {text:"Elk cloner", correct:false},
            {text:"SCA virus", correct:false},
            {text:"Creeper program", correct: true},

        ],
        explanation:"The first computer virus is known as the Creeper program. It was created in the early 1970s and targeted the ARPANET, which was the precursor to the internet.",
    },
    {
        question:"What technology is used to make telephone calls over the Internet possible?",
        answers:[
            {text:"VoIP", correct:true},
            {text:"Bluetooth", correct:false},
            {text:"Ethernet", correct:false},
            {text:"All the above", correct:false},

        ],
        explanation:"VoIP stands for Voice over Internet Protocol, which is a technology used to make telephone calls over the internet. It allows users to make calls using an internet connection instead of traditional telephone lines.",
    },
];

const questionElement = document.getElementById("question");
const answersButton = document.getElementById("btn-primary");
const nextButton = document.getElementById("next-btn");
const explanationElement = document.getElementById("explanations");


let CurrentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    CurrentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[CurrentQuestionIndex];
    let questionNo = CurrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

   currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
   });

   
}

function resetState(){
    nextButton.style.display = "none";
    while(answersButton.firstChild){
        answersButton.removeChild(answersButton.firstChild);
    }
   
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        displayExplanation();
    }else{
        selectedBtn.classList.add("incorrect");
        displayExplanation();
    }
    Array.from(answersButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function displayExplanation(){
    const currentQuestion = questions[CurrentQuestionIndex];
    explanationElement.innerHTML = `<h4>Explanation:</h4> ${currentQuestion.explanation}`;
    explanationElement.style.display = "block";
}


function showScore(){
    resetState();
    resetExplanation();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < questions.length){
        resetExplanation();
        showQuestion();
    }else{
        showScore();
    }
}

function resetExplanation(){
    explanationElement.innerHTML = "";
    explanationElement.style.display = "none";
}

nextButton.addEventListener("click",() =>{
    if(CurrentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();