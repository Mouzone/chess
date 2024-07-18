export function checkThreat(row, col, board) {
    // check in each direction for the first piece it encounters as enemy cannot hop over own pieces
    // -- except for knight
    // return True right away if any piece is found
    // return False at end if no piece is found

    // check diagonal for bishop, pawn, queen, king
    // diagonal to top left corner
    let j = col - 1
    for (let i = row-1; i > -1; i--){
        if (j < 0){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== board[row][col].color){
                if (board[i][j] instanceof Bishop || board[i][j] instanceof Queen) {
                    return true
                }
                if (board[i][j] instanceof Pawn || board[i][j] instanceof King) {
                    if (col - j === 1) {
                        return true
                    }
                }
            }
            break
        }
    }

    // diagonal to top right corner
    j = this.col + 1
    for (let i = this.row-1; i > -1; i--){
        if (j > 7){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== board[row][col].color){
                if (board[i][j] instanceof Bishop || board[i][j] instanceof Queen) {
                    return true
                }
                if (board[i][j] instanceof Pawn || board[i][j] instanceof King) {
                    if (col - j === 1) {
                        return true
                    }
                }
            }
            break
        }
    }

    // diagonal to bottom left corner
    j = this.col - 1
    for (let i = this.row+1; i < 8; i++){
        if (j < 0){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== board[row][col].color){
                if (board[i][j] instanceof Bishop || board[i][j] instanceof Queen) {
                    return true
                }
                if (board[i][j] instanceof Pawn || board[i][j] instanceof King) {
                    if (col - j === 1) {
                        return true
                    }
                }
            }
            break
        }
    }

    // diagonal to bottom right corner
    j = this.col + 1
    for (let i = this.row+1; i < 8; i++){
        if (j > 7){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== board[row][col].color){
                if (board[i][j] instanceof Bishop || board[i][j] instanceof Queen) {
                    return true
                }
                if (board[i][j] instanceof Pawn || board[i][j] instanceof King) {
                    if (col - j === 1) {
                        return true
                    }
                }
            }
            break
        }
    }

    // check straights for queen, king, rook
    // -- check up
    // -- check down
    // -- check left
    // -- check right

    // check for knights
    return false
}