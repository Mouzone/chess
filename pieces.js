// todo: refactor especially queen
class Piece {
    constructor(row, col, color) {
        this.row = row
        this.col = col
        this.color = color
        this.alive = true
    }

    move(row, col) {
        this.row = row
        this.col = col
    }
}

export class Pawn extends Piece {
    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    // return array of squares can move to and highlight them
    // todo: moment it moves set bonus_move to false
    // todo: put capture logic for pawns, since pawns can move different if near another piece
    // todo: pawns also have another special move
    getValidMoves(board){
        const valid_moves = []
        if (this.color){
            if (this.bonus_move){
                valid_moves.push([this.row + 2, this.col])
            }
            valid_moves.push([this.row + 1, this.col])
        } else {
            if (this.bonus_move){
                valid_moves.push([this.row - 2, this.col])
            }
            valid_moves.push([this.row - 1, this.col])
        }
        return valid_moves
    }

    move(row, col) {
        this.row = row
        this.col = col
        this.bonus_move = false
    }
}

export class Rook extends Piece {
    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    getValidMoves(board){
        const valid_moves = []
        // go as left as possible
        for (let i = this.col - 1; i > -1; i--){
            if (board[this.row][i]){
                if (board[this.row][i]?.color !== this.color){
                    valid_moves.push([this.row, i])
                }
                break
            }
            valid_moves.push([this.row, i])
        }

        // go as right as possible
        for (let i = this.col + 1; i < 8; i++){
            if (board[this.row][i]){
                if (board[this.row][i]?.color !== this.color){
                    valid_moves.push([this.row, i])
                }
                break
            }
            valid_moves.push([this.row, i])
        }

        // go as up as possible
        for (let i = this.row - 1; i > -1; i--){
            if (board[i][this.col]){
                if (board[i][this.col]?.color !== this.color){
                    valid_moves.push([i, this.col])
                }
                break
            }
            valid_moves.push([i, this.col])
        }

        // go as down as possible
        for (let i = this.row + 1; i < 8; i++){
            if (board[i][this.col]){
                if (board[i][this.col]?.color !== this.color){
                    valid_moves.push([i, this.col])
                }
                break
            }
            valid_moves.push([i, this.col])
        }
        return valid_moves
    }

    move(row, col) {
        this.row = row
        this.col = col
        this.bonus_move = false
    }
}

export class Knight extends Piece {
    getValidMoves(board){
        const valid_moves = []
        const d_s = [[-2, -1], [-2, 1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]
        d_s.forEach(([dx, dy]) => {
            if (this.row + dx > -1 && this.row + dx < 8) {
                if (this.col + dy > -1 && this.col + dy < 8) {
                    if (!board[this.row + dx][this.col + dy] || board[this.row + dx][this.col + dy].color !== this.color){
                        valid_moves.push([this.row + dx, this.col + dy])
                    }
                }
            }
        })

        return valid_moves
    }
}

//todo: combine top left and top right into one, combine bottom left and bottom right into one
export class Bishop extends Piece {
    getValidMoves(board){
        const valid_moves = []

        // diagonal to top left corner
        let j = this.col - 1
        for (let i = this.row-1; i > -1; i--){
            if (j < 0){
                break
            }
            if (board[i][j]) {
                if (board[i][j].color !== this.color){
                    valid_moves.push([i, j])
                }
                break
            }
            valid_moves.push([i, j])
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
                    valid_moves.push([i, j])
                }
                break
            }
            valid_moves.push([i, j])
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
                    valid_moves.push([i, j])
                }
                break
            }
            valid_moves.push([i, j])
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
                    valid_moves.push([i, j])
                }
                break
            }
            valid_moves.push([i, j])
            j++
        }
        return valid_moves
    }
}

export class King extends Piece {
    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    getValidMoves(board){
        const valid_moves = []
        const d_s = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]]
        d_s.forEach(([dx, dy]) => {
            if (!board[this.row + dx][this.col + dy] || board[this.row + dx][this.col + dy].color !== this.color) {
                valid_moves.push([this.row+dx, this.col+dy])
            }
        })

        // castling requirements:
        // 1. King has not moved (check bonus_move, when moves remove)
        // 2. Rook has not moved (check the two corners for rooks and check for bonus move)
        // 3. The two squares that WILL BE occupied are empty (hard code these squares)
        // 4. The two squares that WILL BE occupied are not under threat (for the two squares backtrack the attack paths and see if there is enemy piece)
        return valid_moves
    }

    move(row, col) {
        this.row = row
        this.col = col
        this.bonus_move = false
    }
}

export class Queen extends Piece {
    getValidMoves(board) {
        const valid_moves = []
        // go as left as possible
        for (let i = this.col - 1; i > -1; i--){
            if (board[this.row][i]){
                break
            }
            valid_moves.push([this.row, i])
        }

        // go as right as possible
        for (let i = this.col + 1; i < 8; i++){
            if (board[this.row][i]){
                break
            }
            valid_moves.push([this.row, i])
        }

        // go as up as possible
        for (let i = this.row - 1; i > -1; i--){
            if (board[i][this.col]){
                break
            }
            valid_moves.push([i, this.col])
        }

        // go as down as possible
        for (let i = this.row + 1; i < 8; i++){
            if (board[i][this.col]){
                break
            }
            valid_moves.push([i, this.col])
        }

        let j = this.col - 1
        for (let i = this.row-1; i > -1; i--){
            if (j < 0 || board[i][j]){
                break
            }
            valid_moves.push([i, j])
            j--
        }

        // diagonal to top right corner
        j = this.col + 1
        for (let i = this.row-1; i > -1; i--){
            if (j === 8 || board[i][j]){
                break
            }
            valid_moves.push([i, j])
            j++
        }

        // diagonal to bottom left corner
        j = this.col - 1
        for (let i = this.row+1; i < 8; i++){
            if (j < 0 || board[i][j]){
                break
            }
            valid_moves.push([i, j])
            j--
        }
        // diagonal to bottom right corner
        j = this.col + 1
        for (let i = this.row+1; i < 8; i++){
            if (j === 8 || board[i][j]){
                break
            }
            valid_moves.push([i, j])
            j++
        }

        return valid_moves
    }
}