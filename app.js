let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const move = Math.floor(Math.random() * 3);
    switch (move) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        default:
            return "scissors";
    }
}

function getHumanChoice() {
    return prompt("What move do you play?");
}

function playRound(humanChoice, computerChoice) {
    endgameCheck();
    const result = document.getElementById('result');
    humanChoice = humanChoice.toLowerCase();
    if (humanChoice === computerChoice) {
        result.textContent = `Tied game! You both played ${humanChoice}`;
        return;
    }
    const hands = new Set();
    let winningHand;
    hands.add(humanChoice);
    hands.add(computerChoice);
    if (hands.has('rock') && hands.has('paper')) winningHand = "paper";
    else if (hands.has('rock') && hands.has('scissors')) winningHand = "rock";
    else if (hands.has('paper') && hands.has('scissors')) winningHand = "scissors";
    if (winningHand === humanChoice) {
        humanScore++;
        humanScoreDiv.textContent = humanScore;
        result.textContent = `Congratulations, you win! ${humanChoice} beats ${computerChoice}`;
    }
    else {
        computerScore++;
        result.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
        computerScoreDiv.textContent = computerScore;
    }
    endgameCheck();
}

function endgameCheck() {
    if (computerScore < 5 && humanScore < 5) return;
    const result = document.getElementById('result');
    result.textContent = `${computerScore > humanScore ? 'The computer' : 'You'} won the game!`;
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
        btn.removeEventListener('click', addButtonAction);
    });
}
const humanScoreDiv = document.querySelector('.humanScore');
const computerScoreDiv = document.querySelector('.computerScore');
humanScoreDiv.textContent = humanScore;
computerScoreDiv.textContent = computerScore;

const btns = document.querySelectorAll('button');
btns.forEach(function addButtonAction(btn) {
    btn.addEventListener('click', (e) => {
        playRound(btn.classList.value, getComputerChoice());
    })
})

