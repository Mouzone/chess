function generateBoard(){
    const board = document.querySelector("div#board")
    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){
            const square = document.createElement("div")
            board.insertAdjacentElement("beforeend", square)
            square.setAttribute("id", `${row+col}`)
            square.classList.add("square")
            square.dataset.row = `${row}`
            square.dataset.col = `${col}`
            if ((row + col) % 2) {
                square.classList.add("black")
            } else {
                square.classList.add("white")
            }
        }
    }
}

function placePieces() {
    const board = document.querySelector("div#board")
}

function initializeGame(){
    generateBoard()
    placePieces()
}

// White is 0, Black is 1
initializeGame()