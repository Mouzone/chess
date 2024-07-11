import Player from "./player.js"

function generateBoard(){
    const board = document.querySelector("div#board")
    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){
            const square = document.createElement("div")
            board.insertAdjacentElement("beforeend", square)
            // sX for square number X
            square.id =`s${8*row+col}`
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

function placePieces(players) {
    players.forEach(player => {
        Object.entries(player.pieces).forEach(([type_of_piece, pieces]) => {
            pieces.forEach(piece => {
                const target_square = document.querySelector(`[data-row='${piece.row}'][data-col='${piece.col}']`)
                const piece_icon = new Image()
                piece_icon.draggable = true
                piece_icon.classList.add("piece")
                if (piece.color === BLACK) {
                    // slice to remove plural "s" from pieces keys
                    piece_icon.src = `./pieces/black-${type_of_piece.slice(0,-1)}.svg`
                } else {
                    piece_icon.src = `./pieces/white-${type_of_piece.slice(0,-1)}.svg`
                }
                target_square.appendChild(piece_icon)
            })
        })
    })
}

function initializeGame(){
    const players = [new Player(WHITE), new Player(BLACK)]
    generateBoard()
    placePieces(players)
}

const WHITE = 0
const BLACK = 1
initializeGame()