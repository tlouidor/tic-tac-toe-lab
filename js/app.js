/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = [
    document.getElementById('squ[0]'),
    document.getElementById('squ[1]'),
    document.getElementById('squ[2]'),
    document.getElementById('squ[3]'),
    document.getElementById('squ[4]'),
    document.getElementById('squ[5]'),
    document.getElementById('squ[6]'),
    document.getElementById('squ[7]'),
    document.getElementById('squ[8]'),
];

const messageEl = document.getElementById('gameStatus')
console.log(messageEl)

const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    console.log('Init funtcion has been called! Start game!')
}
render();
window.onload = init;

let board = ['', '', '', '', '', '', '', '', ''];

let turn = 'X';

let winner = false;

let tie = false;

const render = () => {
    updateBoard();
    updateMessage();
}

const updateBoard = () => {
    board.forEach((value, index) => {
        const square = squareEls[index];
        square.innertext = value;
        if (value === 'X') {
            square.style.color = 'blue';
        } else if (value === 'O') {
            square.style.color = 'red';
        } else {
            square.style.color = 'black';
        }
    });
}

const updateMessage = () => {
    if (!winner && !tie) {
        messageEl.innerText = "It's ${turn}'s turn!";
    } else if (!winner && tie) {
        messageEl.innerText = "It's a tie!";
    } else{
        messageEl.innerText = "${winner} wins! Congratulations!";
    }
}

const handleClick = (event) => {
    const target = event.target;
    if(!squareEls.includes(target)) {
        return;
    }
    const squareIndex = parseInt(target.id.replace('square', '')) -1
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece = (index) => {

}

const checkForTie = () => {
    if (winner) {
        return;
    }
    tie = !board.includes('');
    console.log('Tie state:', tie);
}

const checkForWinner = () => {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board [a] === board[c]) {
            winner = board[a];
            return;
        }
    }
}

const switchPlayerTurn = () => {
    if(winner) {
        return;
    }
    turn = (turn === 'X') ? 'O' : 'X';
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
    square.addEventListener('click', handleClick); 
});

resetBtnEl.addEventListener('click', init);
