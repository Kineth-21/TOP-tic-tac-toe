// creating game board
const gameBoard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];

    const resetBoard = () => {
        board = [null, null, null, null, null, null, null, null, null];
    }

    const getBoard = () => board;

    const updateBoard = (index, mark) =>{
        board[index] = mark;
        console.log("Board updated:", board);
    }

    return{resetBoard, getBoard, updateBoard};
})();

// player creator
function player (name, mark){
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark};
}

// dialog
const dialog = document.querySelector("#resultDialog");
const resultPanel = document.querySelector(".results");

// game creator
const gameCreator = () => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");

    let player1Turn = true;

    let currentMark = player1.getMark();

    const addClickable = (event) =>{ // a function to add mark to the div
        const cell = event.target;
        const index = cell.getAttribute("data-index"); // gets the index to update the content of the board
        gameBoard.updateBoard(index, currentMark);
        cell.textContent = currentMark;

        player1Turn = !player1Turn;
        currentMark = player1Turn ? player1.getMark() : player2.getMark();
        cell.style.pointerEvents = "none";

        const winner = winCheck();

        if(winner === "Tie"){
            dialog.show();
            console.log("im at tie");
            resultPanel.textContent = "It's a tie";
        }
        else if(winner === null){
            resultPanel.textContent = "In progress"
        }
        else{
            dialog.show();
            console.log("im at win");
            resultPanel.textContent = winner === player1.getMark()? "Player 1 wins!" : "Player 2 wins!";
        }
    }

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell =>{
        cell.addEventListener("click", addClickable);
    });

    // check for winner
    const winCheck = () => {
        const board = gameBoard.getBoard();
        const winConditions = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal
            [2, 4, 6]  // Other diagonal
        ];
    
        for (const element of winConditions) {
            const [a, b, c] = element;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winning mark
            }
        }
    
        return board.includes(null) ? null : 'Tie'; // Return 'Tie' if board is full
    };
    
    return {addClickable};
}

const game = gameCreator(); // initialise game

const resetGame = () =>{
    gameBoard.resetBoard();

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.pointerEvents = "auto";
        cell.textContent = "";
        cell.removeEventListener("click", game.addClickable);
    });

    resultPanel.textContent = "";
    dialog.close();

    gameCreator();  // reinitialise the game
}

const resetBtn = document.querySelector(".resetBtn");
resetBtn.addEventListener("click", resetGame); //adding eventlistener to reset button

