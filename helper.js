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
                square.dataset.x_pos = piece.x_pos
                square.dataset.y_pos = piece.y_pos
                const board_piece = document.createElement("img")
                board_piece.draggable = true
                const curr_piece = document.querySelector("div#curr_piece")
                curr_piece.textContent = "Deez"
                board_piece.addEventListener("dragstart", event => {
                    //access square the piece is inside right now and print its x_pos, y_pos
                    curr_piece.textContent = `${event.currentTarget.parentElement.dataset.x_pos}, ${event.currentTarget.parentElement.dataset.y_pos}`
                })
                if (piece.color){
                    board_piece.src = `pieces/white-${entry[0].slice(0, -1)}.svg`
                } else{
                    board_piece.src = `pieces/black-${entry[0].slice(0, -1)}.svg`
                }
                board_piece.height = 50
                board_piece.width = 50
                square.insertAdjacentElement("beforeend", board_piece)
                // todo on select, highlight squares it can move to (ignore capture)

                // todo on select for each piece change the properties of the squares it can move to allow it to drop
                // -> once dropped allow remove the permission to accept the piece
                // will have to calculate which squares are moveable on selection based on the current position
            })
        })
    })
    return board
}


export function updateBoard(piece, location) {

}