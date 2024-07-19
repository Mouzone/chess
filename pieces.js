// todo: refactor especially queen
class Piece {
    constructor(row, col, color) {
        this.row = row
        this.col = col
        this.color = color
        this.valid_moves = []
    }

    move(row, col, board) {
        this.valid_moves.length = 0
        const piece = board[this.row][this.col]
        board[this.row][this.col] = null
        this.row = row
        this.col = col
        board[this.row][this.col] = piece
    }
}

// todo: en passant
// todo: promotion
export class Pawn extends Piece {
    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    getValidMoves(board){
        if (this.color){
            if (this.bonus_move){
                this.valid_moves.push([this.row + 2, this.col])
            }
            this.valid_moves.push([this.row + 1, this.col])

            //capture enemy piece
            // todo: make sure the logic is different for black and white
            if (this.col-1 > -1 && board[this.row+1][this.col-1] && board[this.row+1][this.col-1].color !== this.color) {
                this.valid_moves.push([this.row+1, this.col-1])
            }
            if (this.col+1 < 8 && board[this.row+1][this.col+1] && board[this.row+1][this.col+1].color !== this.color) {
                this.valid_moves.push([this.row+1, this.col+1])
            }
        } else {
            if (this.bonus_move){
                this.valid_moves.push([this.row - 2, this.col])
            }
            this.valid_moves.push([this.row - 1, this.col])

            //capture enemy piece
            if (this.col-1 > -1 && board[this.row-1][this.col-1] && board[this.row-1][this.col-1].color !== this.color) {
                this.valid_moves.push([this.row+1, this.col-1])
            }
            if (this.col+1 < 8 && board[this.row-1][this.col+1] && board[this.row-1][this.col+1].color !== this.color) {
                this.valid_moves.push([this.row+1, this.col+1])
            }
        }

        return this.valid_moves
    }

    move(row, col, board) {
        super.move(row, col, board)
        this.bonus_move = false
    }
}

export class Rook extends Piece {

    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    getValidMoves(board){
        // go as left as possible
        for (let i = this.col - 1; i > -1; i--){
            if (board[this.row][i]){
                if (board[this.row][i]?.color !== this.color){
                    this.valid_moves.push([this.row, i])
                }
                break
            }
            this.valid_moves.push([this.row, i])
        }

        // go as right as possible
        for (let i = this.col + 1; i < 8; i++){
            if (board[this.row][i]){
                if (board[this.row][i]?.color !== this.color){
                    this.valid_moves.push([this.row, i])
                }
                break
            }
            this.valid_moves.push([this.row, i])
        }

        // go as up as possible
        for (let i = this.row - 1; i > -1; i--){
            if (board[i][this.col]){
                if (board[i][this.col]?.color !== this.color){
                    this.valid_moves.push([i, this.col])
                }
                break
            }
            this.valid_moves.push([i, this.col])
        }

        // go as down as possible
        for (let i = this.row + 1; i < 8; i++){
            if (board[i][this.col]){
                if (board[i][this.col]?.color !== this.color){
                    this.valid_moves.push([i, this.col])
                }
                break
            }
            this.valid_moves.push([i, this.col])
        }
        return this.valid_moves
    }

    move(row, col, board) {
        super.move(row, col, board)
        this.bonus_move = false
    }
}

export class Knight extends Piece {
    getValidMoves(board){
        const d_s = [[-2, -1], [-2, 1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]
        d_s.forEach(([dx, dy]) => {
            if (this.row + dx > -1 && this.row + dx < 8) {
                if (this.col + dy > -1 && this.col + dy < 8) {
                    if (!board[this.row + dx][this.col + dy] || board[this.row + dx][this.col + dy].color !== this.color){
                        this.valid_moves.push([this.row + dx, this.col + dy])
                    }
                }
            }
        })

        return this.valid_moves
    }
}

export class Bishop extends Piece {
    getValidMoves(board){
        // diagonal to top left corner
        let j = this.col - 1
        for (let i = this.row-1; i > -1; i--){
            if (j < 0){
                break
            }
            if (board[i][j]) {
                if (board[i][j].color !== this.color){
                    this.valid_moves.push([i, j])
                }
                break
            }
            this.valid_moves.push([i, j])
            j--
        }

        // diagonal to top right corner
        j = this.col + 1
        for (let i = this.row-1; i > -1; i--){
            if (j > 7){
                break
            }
            if (board[i][j]) {
                if (board[i][j].color !== this.color){
                    this.valid_moves.push([i, j])
                }
                break
            }
            this.valid_moves.push([i, j])
            j++
        }

        // diagonal to bottom left corner
        j = this.col - 1
        for (let i = this.row+1; i < 8; i++){
            if (j < 0){
                break
            }
            if (board[i][j]) {
                if (board[i][j].color !== this.color){
                    this.valid_moves.push([i, j])
                }
                break
            }
            this.valid_moves.push([i, j])
            j--
        }
        // diagonal to bottom right corner
        j = this.col + 1
        for (let i = this.row+1; i < 8; i++){
            if (j > 7){
                break
            }
            if (board[i][j]) {
                if (board[i][j].color !== this.color){
                    this.valid_moves.push([i, j])
                }
                break
            }
            this.valid_moves.push([i, j])
            j++
        }
        return this.valid_moves
    }
}

export class King extends Piece {

    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    getValidMoves(board){
        const d_s = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]]
        d_s.forEach(([dx, dy]) => {
            if (this.row+dx < 8 && this.row+dx > -1 && this.col+dy < 8 && this.col+dy > -1){
                if (!board[this.row + dx][this.col + dy] || (board[this.row + dx][this.col + dy] && board[this.row + dx][this.col + dy].color !== this.color)) {
                    this.valid_moves.push([this.row+dx, this.col+dy])
                }
            }
        })

        // castling requirements:
        // 1. King has not moved (check bonus_move, when moves remove)
        // 2. Rook has not moved (check the two corners for rooks and check for bonus move)
        // 3. The two squares that WILL BE occupied are empty (hard code these squares)
        // 4. The two squares that WILL BE occupied are not under threat (for the two squares backtrack the attack paths and see if there is enemy piece)
        if (this.bonus_move){
            if (board[this.row][7] && board[this.row][7] instanceof Rook && board[this.row][7].bonus_move && board[this.row][7].color === this.color) {
                if (!board[this.row][6] && !board[this.row][5] && !checkThreat(this.row, 6, this.color, board) && !checkThreat(this.row, 5, this.color, board)) {
                    this.valid_moves.push([this.row, 6])
                }
            }
            if (board[this.row][0] && board[this.row][0] instanceof Rook && board[this.row][0].bonus_move && board[this.row][0].color === this.color) {
                if (!board[this.row][1] && !board[this.row][2] && !checkThreat(this.row, 1, this.color, board) && !checkThreat(this.row, 2, this.color, board)) {
                    this.valid_moves.push([this.row, 2])
                }
            }
        }

        return this.valid_moves
    }

    move(row, col, board) {
        if (row === this.row && Math.abs(col-this.col) === 2){
            // MOVE the corresponding rook when castling
            if (col === 6) {
                // get the rook at board[this.row][7]
                // move the rook to board[this.row][5]
                let rook = board[this.row][7]
                rook.move(this.row, 5, board)
                rook.bonus_move = false
            } else {
                let rook = board[this.row][0]
                rook.move(this.row, 3, board)
                rook.bonus_move = false
            }
        }
        super.move(row, col, board)
        this.bonus_move = false
    }
}

export class Queen extends Piece {
    getValidMoves(board) {
        // go as left as possible
        for (let i = this.col - 1; i > -1; i--){
            if (board[this.row][i]){
                break
            }
            this.valid_moves.push([this.row, i])
        }

        // go as right as possible
        for (let i = this.col + 1; i < 8; i++){
            if (board[this.row][i]){
                break
            }
            this.valid_moves.push([this.row, i])
        }

        // go as up as possible
        for (let i = this.row - 1; i > -1; i--){
            if (board[i][this.col]){
                break
            }
            this.valid_moves.push([i, this.col])
        }

        // go as down as possible
        for (let i = this.row + 1; i < 8; i++){
            if (board[i][this.col]){
                break
            }
            this.valid_moves.push([i, this.col])
        }

        let j = this.col - 1
        for (let i = this.row-1; i > -1; i--){
            if (j < 0 || board[i][j]){
                break
            }
            this.valid_moves.push([i, j])
            j--
        }

        // diagonal to top right corner
        j = this.col + 1
        for (let i = this.row-1; i > -1; i--){
            if (j === 8 || board[i][j]){
                break
            }
            this.valid_moves.push([i, j])
            j++
        }

        // diagonal to bottom left corner
        j = this.col - 1
        for (let i = this.row+1; i < 8; i++){
            if (j < 0 || board[i][j]){
                break
            }
            this.valid_moves.push([i, j])
            j--
        }
        // diagonal to bottom right corner
        j = this.col + 1
        for (let i = this.row+1; i < 8; i++){
            if (j === 8 || board[i][j]){
                break
            }
            this.valid_moves.push([i, j])
            j++
        }

        return this.valid_moves
    }
}

function checkThreat(row, col, color, board) {
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
            if (board[i][j].color !== color){
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
        j--
    }

    // diagonal to top right corner
    j = col + 1
    for (let i = row-1; i > -1; i--){
        if (j > 7){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== color){
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
        j--
    }

    // diagonal to bottom left corner
    j = col - 1
    for (let i = row+1; i < 8; i++){
        if (j < 0){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== color){
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
        j--
    }

    // diagonal to bottom right corner
    j = col + 1
    for (let i = row+1; i < 8; i++){
        if (j > 7){
            break
        }
        if (board[i][j]) {
            if (board[i][j].color !== color){
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
        j--
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
                if (board[row + dx][col + dy] && board[row + dx][col + dy].color !== color && board[row + dx][col + dy] instanceof Knight){
                    return true
                }
            }
        }
    })
    return false
}