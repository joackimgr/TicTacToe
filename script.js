const gameBoard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        } else {return false;}
    };
    
    const checkWin = () => {
        const winningAxes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < winningAxes.length; i++) {
            const pattern = winningAxes[i];
            const a = pattern[0];
            const b = pattern[1];
            const c = pattern[2];
            if (board[a] != "" && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };
    const isTie = () => {
        if (board.every((cell) => cell != "")) {
            return true;
        } else return false;
    }
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }
    return {getBoard, placeMarker, checkWin, isTie, resetBoard};
})();

function createPlayer (name, marker) {
    return {name, marker};
}

const gameControl = (function() {
    const playerOne = createPlayer("John", "X");
    const playerTwo = createPlayer("Mark", "O");
    let isGameOver = false;
    let activePlayer = playerOne;
    const playRound = (index) => { 
        if (isGameOver) {
                return;
            }
        if (gameBoard.placeMarker(index, activePlayer.marker)) {
           
            if (gameBoard.checkWin()) {
                displayControl.setMessage(`${activePlayer.name} won!`);
                isGameOver = true;
                return;
            }
            if (gameBoard.isTie()) {
                displayControl.setMessage(`It's a tie!`);
                isGameOver = true;
                return;
            }
            if (activePlayer === playerOne) {
                activePlayer = playerTwo;
            } else {
                activePlayer = playerOne;
            }
            displayControl.setMessage(`Next Turn: ${activePlayer.name}`);
       }};
    const resetGame = () => {
        activePlayer = playerOne;
        isGameOver = false;
        displayControl.setMessage(`It is ${activePlayer.name}'s turn!`);
    } 
    
    return {playRound, resetGame};
})();

const displayControl = (function() {
    const render = () => {
        const board = gameBoard.getBoard();
        const container = document.querySelector("#gameboard");
        container.innerHTML = "";
        board.forEach((cell, index) => {
            let div = document.createElement("div");
            div.classList.add("cell");
            div.textContent = cell;
            div.addEventListener("click", () => {
                gameControl.playRound(index);
                render();
            })
            container.appendChild(div);
        });
    }
        const setMessage = (text) => {
            const messageDiv = document.querySelector("#message");
            messageDiv.textContent = text;
        };
    return {render, setMessage};
})();

const restartBtn = document.querySelector("#restartBtn");
restartBtn.addEventListener("click", () => {
    gameBoard.resetBoard();
    gameControl.resetGame();
    displayControl.setMessage("");
    displayControl.render();
})
displayControl.render();