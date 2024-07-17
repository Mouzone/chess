// todo: correct all move functions to stop before friendly piece, but if enemy piece include it
class Piece {
    constructor(row, col, color) {
        this.row = row
        this.col = col
        this.color = color
        this.alive = true
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
}

export class Rook extends Piece {
    getValidMoves(board){
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
        return valid_moves
    }
}

export class Knight extends Piece {
    getValidMoves(board){
        const valid_moves = []
        const d_s = [[-2, -1], [-2, 1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]
        d_s.forEach(([dx, dy]) => {
            if (this.row + dx > -1 && this.row + dx < 8) {
                if (this.col + dy > -1 && this.col + dy < 8) {
                    if (!board[this.row + dx][this.col + dy]){
                        valid_moves.push([this.row + dx, this.col + dy])
                    }
                }
            }
        })

        return valid_moves
    }
}

export class Bishop extends Piece {
    getValidMoves(board){
        const valid_moves = []

        // diagonal to top left corner
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

// write castling move
export class King extends Piece {
    getValidMoves(board){
        const valid_moves = []
        const d_s = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]]
        d_s.forEach(([dx, dy]) => {
            if (!board[this.row + dx][this.col + dy]) {
                valid_moves.push([this.row+dx, this.col+dy])
            }
        })
        return valid_moves
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