const X_CLASS = "X";
const O_CLASS = "O";

const CellElements = document.querySelectorAll('[data-cell]');
const BoardElement = document.getElementById('Board');
const WinningMessageTextElement = document.querySelector('[data-winning-message-text]');
const RestartGameButton = document.getElementById('RestartButton');
let CircleTurn = false;

RestartGameButton.addEventListener('click', () => {
    StartGame();
});

StartGame();

function StartGame() {
    WinningMessageTextElement.parentElement.classList.add('hide');
    CellElements.forEach((Cell) => {
        Cell.classList.remove(O_CLASS);
        Cell.classList.remove(X_CLASS);
        Cell.addEventListener('click', CellClick, { once: true })
    });
    CircleTurn = false;
    SetBoardHoverClass();
}

function CellClick(e) {
    const Cell = e.target;
    const CurrentClass = CircleTurn ? O_CLASS : X_CLASS;
    PlaceMark(Cell, CurrentClass);

    if (CheckWin(CurrentClass)) {
        EndGame(false);
    } else if (CheckDraw()) {
        EndGame(true);
    } else {
        SwapTurn();
        SetBoardHoverClass();
    }
}

function PlaceMark (Cell, Class) {
    Cell.classList.add(Class);
}

function SwapTurn () {
    CircleTurn = !CircleTurn;
}

function EndGame(Draw = false) {
    if (Draw) {
        WinningMessageTextElement.innerText = `Draw`;
    } else {
        WinningMessageTextElement.innerText = `${ CircleTurn ? 'O' : 'X' }'s win.`;
    }
    WinningMessageTextElement.parentElement.classList.remove('hide');
}

function GetBoard() {
    let Board = [];
    for (let i = 0; i <= 2; i++) {
        Board[i] = [];
        for (let j = 0; j <= 2; j++) {
            let CellStatus = CellElements[(i * 3) + j];
            if (CellStatus.classList.contains(O_CLASS)) CellStatus = O_CLASS;
            else if (CellStatus.classList.contains(X_CLASS)) CellStatus = X_CLASS;
            else CellStatus = '';
            Board[i][j] = CellStatus;
        }
    }
    return Board;
}

function CheckWinBasedOnBoard(Board, LastMoveClass) {
    if (Board[0][0] === LastMoveClass && Board[1][1] === LastMoveClass && Board[2][2] === LastMoveClass) return true;
    if (Board[2][0] === LastMoveClass && Board[1][1] === LastMoveClass && Board[0][2] === LastMoveClass) return true;
    for (let i = 0; i <= 2; i++) {
        if (Board[0][i] === LastMoveClass && Board[1][i] === LastMoveClass && Board[2][i] === LastMoveClass) return true;
        else if (Board[i][0] === LastMoveClass && Board[i][1] === LastMoveClass && Board[i][2] === LastMoveClass) return true;
    }
    return false;
}

function CheckWin(CurrentClass) {
    const CurrentBoard = GetBoard();
    return CheckWinBasedOnBoard(CurrentBoard, CurrentClass);
}

function SetBoardHoverClass () {
    BoardElement.classList.remove(X_CLASS);
    BoardElement.classList.remove(O_CLASS);
    if (CircleTurn) {
        return BoardElement.classList.add(O_CLASS);
    }
    BoardElement.classList.add(X_CLASS);
}

function CheckDraw() {
    return [...CellElements].every((Cell) => {
        return (Cell.classList.contains(O_CLASS) || Cell.classList.contains(X_CLASS));
    });
}
