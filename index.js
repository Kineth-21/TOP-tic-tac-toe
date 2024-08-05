const gameBoard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];

    const resetBoard = () => {
        board = [null, null, null, null, null, null, null, null, null];
    }

    const getBoard = () =>{
        return board;
    }

    const updateBoard = (index, board) =>{
        board[index] = mark;
    }

    return{resetBoard, getBoard, updateBoard};
})();