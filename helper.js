export function valid_move(x, y){
    return ((x >= 0 && x <= 7) && (y >= 0 && x <= 7))
}

export function get_color_of_tile(x, y){
    if ((x + y) % 2 === 1) {
        return 1
    }
    return 0
}

export function createBoard(board_length){
    const board_display = document.querySelector("div#board")
    for (let i = 0; i < board_length; i++) {
        for (let j = 0; j < board_length; j++) {
            const square = document.createElement("div")
            square.classList.add("square")
            if ((i+j) % 2 === 0) {
                square.style.backgroundColor = "#bfdbfe"
            } else {
                square.style.backgroundColor = "#a5b4fc"
            }
            board_display.insertAdjacentElement("beforeend", square)
        }
    }
}

export function fillBoards(players, board){
    const board_display = document.querySelector("div#board")
    players.forEach(player => {
        Object.entries(player.pieces).forEach(entry => {
            entry[1].forEach(piece => {
                board[piece.x_pos][piece.y_pos] = piece
                const square = board_display.querySelector(`:nth-child(${8*piece.x_pos+piece.y_pos + 1})`)
                const board_piece = document.createElement("p")
                board_piece.draggable = true
                square.insertAdjacentElement("beforeend", board_piece)
                board_piece.textContent = entry[0].slice(0, -1)
                if (piece.color){
                    square.style.color = "white"
                } else {
                    square.style.color = "black"
                }
            })
        })
    })
    return board
}


export function updateBoard(piece, location) {

}