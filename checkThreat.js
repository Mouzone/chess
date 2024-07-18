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
                    if (Math.abs(col - j) === 1) {
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
                    if (Math.abs(col - j) === 1) {
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
                    if (Math.abs(col - j) === 1) {
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
                    if (Math.abs(col - j) === 1) {
                        return true
                    }
                }
            }
            break
        }
    }

    // check straights for queen, king, rook
    // go as left as possible
    for (let i = col - 1; i > -1; i--){
        if (board[row][i]){
            if (board[row][i]?.color !== color){
                if (board[row][i] instanceof Queen || board[row][i] instanceof Rook) {
                    return true
                }
                if (Math.abs(i-col) === 1 && board[row][i] instanceof King) {
                    return true
                }
            }
            break
        }
    }

    // go as right as possible
    for (let i = col + 1; i < 8; i++){
        if (board[row][i]){
            if (board[row][i]?.color !== color){
                if (board[row][i] instanceof Queen || board[row][i] instanceof Rook) {
                    return true
                }
                if (Math.abs(i-col) === 1 && board[row][i] instanceof King) {
                    return true
                }
            }
            break
        }
    }

    // go as up as possible
    for (let i = row - 1; i > -1; i--){
        if (board[i][col]){
            if (board[i][col]?.color !== color){
                if (board[i][col] instanceof Queen || board[i][col] instanceof Rook) {
                    return true
                }
                if (Math.abs(i-col) === 1 && board[i][col] instanceof King) {
                    return true
                }
            }
            break
        }
    }

    // go as down as possible
    for (let i = row + 1; i < 8; i++){
        if (board[i][col]){
            if (board[i][col]?.color !== color){
                if (board[i][col] instanceof Queen || board[i][col] instanceof Rook) {
                    return true
                }
                if (Math.abs(i-col) === 1 && board[i][col] instanceof King) {
                    return true
                }
            }
            break
        }
    }

    // check for knights
    const d_s = [[-2, -1], [-2, 1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]
    d_s.forEach(([dx, dy]) => {
        if (row + dx > -1 && row + dx < 8) {
            if (col + dy > -1 && col + dy < 8) {
                if (board[row + dx][col + dy] && board[row + dx][col + dy].color !== board[row][col].color && board[row + dx][col + dy] instanceof Knight){
                    return true
                }
            }
        }
    })
    return false
}