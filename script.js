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
    return {getBoard, placeMarker, checkWin, isTie};
})();

function createPlayer (name, marker) {
    return {name, marker};
}

const gameControl = (function() {
    const playerOne = createPlayer("John", "X");
    const playerTwo = createPlayer("Mark", "O");
    let activePlayer = playerOne;
    const playRound = (index) => {
       if (gameBoard.placeMarker(index, activePlayer.marker)) {
            if (gameBoard.checkWin()) {
                console.log(`${activePlayer.name} won!`);
                return;
            }
            if (gameBoard.isTie()) {
                console.log("It's a tie!");
                return;
            }
            if (activePlayer === playerOne) {
                activePlayer = playerTwo;
            } else {
                activePlayer = playerOne;
            }
            console.log(`Next Turn: ${activePlayer.name}`);
       } 
    };
    return {playRound};
})();