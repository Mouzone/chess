export function valid_move(x, y){
    return ((x >= 0 && x <= 7) && (y >= 0 && x <= 7))
}

export function get_color_of_tile(x, y){
    if ((x + y) % 2 === 1) {
        return 1
    }
    return 0
}

export function translate_position(position) {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < alphabet.length; i++){
        if (position.at(0) === alphabet[i]) {
            return {"file": i, "rank": parseInt(position.at(1))}
        }
    }
}

export function fillBoard(players, board){
    for (const player in players) {
        for (const pieces in player.pieces) {
            for (const type in pieces) {
                for (const piece in type) {
                    board[piece.x_pos][piece.y_pos] = piece
                }
            }
        }
    }
}

export function updateBoard(piece, location) {

}