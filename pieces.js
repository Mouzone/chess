// todo: write getValidMoves function for each class and inside it call each check_function
// todo: white pawn movement
// todo: pawns check for collision
// todo: queen capture enemy pieces

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

export class Pawn extends Piece {
    constructor(row, col, color) {
        super(row, col, color)
        this.bonus_move = true
    }

    getValidMoves(board){
        let limit = 1
        if (this.color) {
            const bottom_right = checkBottomRight(this.row, this.col, limit, board)
            if (bottom_right.last_piece && bottom_right.color !== this.color) {
                this.valid_moves.push([bottom_right.last_piece.row, bottom_right.last_piece.col])
            }

            const bottom_left = checkBottomLeft(this.row, this.col, limit, board)
            if (bottom_left.last_piece && bottom_left.color !== this.color) {
                this.valid_moves.push([bottom_left.last_piece.row, bottom_left.last_piece.col])
            }

            if (this.bonus_move) {
                limit = 2
            }
            const straight_down = checkStraightDown(this.row, this.col, limit, board)
            if (!straight_down.last_piece) {
                this.valid_moves = this.valid_moves.concat(straight_down.free)
            } else if (straight_down.length === 2) {
                this.valid_moves.push(straight_down.free[0])
            }
        } else {
            const top_right = checkTopRight(this.row, this.col, limit, board)
            if (top_right.last_piece && top_right.last_piece.color !== this.color) {
                this.valid_moves.push([top_right.last_piece.row, top_right.last_piece.col])
            }

            const top_left = checkTopLeft(this.row, this.col, limit, board)
            if (top_left.last_piece && top_left.last_piece.color !== this.color) {
                this.valid_moves.push([top_left.last_piece.row, top_left.last_piece.col])
            }

            if (this.bonus_move) {
                limit = 2
            }
            const straight_up = checkStraightUp(this.row, this.col, limit, board)
            if (!straight_up.last_piece) {
                this.valid_moves = this.valid_moves.concat(straight_up.free)
            } else if (straight_up.length === 2) {
                this.valid_moves.push(straight_up.free[0])
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
        const limit = 0

        const up = checkStraightUp(this.row, this.col, limit, board)
        if (!up.last_piece) {
            this.valid_moves = this.valid_moves.concat(up.free)
        } else {
            up.free.forEach(([move_row, move_col])=> {
                if (move_row === up.last_piece.row && move_col === up.last_piece.col) {
                    if (up.last_piece.color !== this.color) {
                        this.valid_moves.push([move_row, move_col])
                    }
                } else {
                    this.valid_moves.push([move_row, move_col])
                }
            })
        }

        const down = checkStraightDown(this.row, this.col, limit, board)
        if (!down.last_piece) {
            this.valid_moves = this.valid_moves.concat(down.free)
        } else {
            down.free.forEach(([move_row, move_col])=> {
                if (move_row === down.last_piece.row && move_col === down.last_piece.col) {
                    if (down.last_piece.color !== this.color) {
                        this.valid_moves.push([move_row, move_col])
                    }
                } else {
                    this.valid_moves.push([move_row, move_col])
                }
            })
        }

        const left = checkStraightLeft(this.row, this.col, limit, board)
        if (!left.last_piece) {
            this.valid_moves = this.valid_moves.concat(left.free)
        } else {
            left.free.forEach(([move_row, move_col])=> {
                if (move_row === left.last_piece.row && move_col === left.last_piece.col) {
                    if (left.last_piece.color !== this.color) {
                        this.valid_moves.push([move_row, move_col])
                    }
                } else {
                    this.valid_moves.push([move_row, move_col])
                }
            })
        }

        const right = checkStraightRight(this.row, this.col, limit, board)
        if (!right.last_piece) {
            this.valid_moves = this.valid_moves.concat(right.free)
        } else {
            right.free.forEach(([move_row, move_col])=> {
                if (move_row === right.last_piece.row && move_col === right.last_piece.col) {
                    if (right.last_piece.color !== this.color) {
                        this.valid_moves.push([move_row, move_col])
                    }
                } else {
                    this.valid_moves.push([move_row, move_col])
                }
            })
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
        const moves = checkKnight(this.row, this.col, board)
        moves.forEach(move => {
            if (!move.piece || (move.piece && move.piece.color !== this.color)) {
                this.valid_moves.push(move.position)
            }
        })

        return this.valid_moves
    }
}

export class Bishop extends Piece {
    getValidMoves(board) {
        const top_left = checkTopLeft(this.row, this.col, board)
        const top_right = checkTopRight(this.row, this.col, board)
        const bottom_left = checkBottomLeft(this.row, this.col, board)
        const bottom_right = checkBottomRight(this.row, this.col, board)

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

    // todo: only move the king and remove the rook move logic here
    // -- keep the bonus_move logic here
    move(row, col, board) {
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

// check if the square/piece is under threat by any pieces close by
function checkThreat(row, col, color, board) {
//     checkTopLeft
    // checkTopRight
    // checkBottomLeft
    // checkBottomRight
    // checkStraightUp
    // checkStraightDown
    // checkStraightLeft
    // checkStraightRight
    // checkKnight
}


// pathing checks
// return: all unoccupied squares from current position to and including limit, and the last square
// -- ex) {free:[], last_piece:Piece}
// --- if piece exists we use its position and color

// -check top left
// todo: check over all values of check functions
function checkTopLeft(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (limit) {
        if (checkValidPosition(row - 1) && checkValidPosition(col-1)) {
            if (!board[row-1][col-1]) {
                result.free.push([row-1, col-1])
            }
            result.last_piece = board[row-1][col-1]
        }
        return result
    }

    let j = col - 1
    for (let i = row-1; i > -1; i--){
        if (board[i][j]) {
            result["last_piece"] = board[i][j]
            break
        } else {
            result["free"].push([i, j])
        }
        j--
    }

    return result
}

// -check top right
function checkTopRight(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (limit) {
        if (checkValidPosition(row - 1) && checkValidPosition(col + 1)) {
            if (!board[row-1][col+1]) {
                result.free.push([row-1, col+1])
            }
            result.last_piece = board[row-1][col+1]
        }
        return result
    }

    let j = col + 1
    for (let i = row-1; i > -1; i--){
        if (board[i][j]) {
            result["last_piece"] = board[i][j]
            break
        } else {
            result["free"].push([i, j])
        }

        j++
    }

    return result
}

// -check bottom left
function checkBottomLeft(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (limit) {
        if (checkValidPosition(row + 1) && checkValidPosition(col - 1)) {
            if (!board[row+1][col-1]) {
                result.free.push([row+1, col-1])
            }
            result.last_piece = board[row+1][col-1]
        }
        return result
    }

    let j = col - 1
    for (let i = row+1; i < 8; i++){
        if (board[i][j]) {
            result["last_piece"] = board[i][j]
            break
        } else {
            result["free"].push([i, j])
        }
        j--
    }

    return result
}

// -check bottom right
function checkBottomRight(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (limit) {
        if (checkValidPosition(row + 1) && checkValidPosition(col + 1)) {
            if (!board[row+1][col+1]) {
                result.free.push([row+1, col+1])
            }
            result.last_piece = board[row+1][col+1]
        }
        return result
    }

    let j = col + 1
    for (let i = row+1; i < 8; i++){
        if (board[i][j]) {
            result["last_piece"] = board[i][j]
            break
        } else {
            result["free"].push([i, j])
        }
        j++
    }

    return result
}

// -check straight up
// limit can be 0, 1 or 2

function checkStraightUp(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (limit) {
        limit = Math.max(0, row - limit)
    }

    for (let i = row - 1; i >= limit; i--) {
        if (board[i][col]) {
            result["last_piece"] = board[i][col]
            result["free"].push([i, col])
            break
        } else {
            result["free"].push([i, col])
        }
    }

    return result
}

// -check straight down
function checkStraightDown(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }


    if (limit) {
        limit = Math.min(7, row + limit)
    } else {
        limit = 7
    }

    for (let i = row + 1; i <= limit; i++){
        if (board[i][col]) {
            result["last_piece"] = board[i][col]
            result["free"].push([i, col])
            break
        } else {
            result["free"].push([i, col])
        }
    }

    return result
}

// -check straight left
function checkStraightLeft(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    // either 1 or 0
    if (limit) {
        limit = Math.max(0, col - limit)
    }

    for (let i = col - 1; i >= limit; i--){
        if (board[row][i]) {
            result["last_piece"] = board[row][i]
            result["free"].push([row, i])
            break
        } else {
            result["free"].push([row, i])
        }
    }

    return result
}

// -check straight right
function checkStraightRight(row, col, limit=0, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (limit) {
        limit = Math.min(7, col + limit)
    } else {
        limit = 7
    }

    for (let i = col + 1; i <= limit; i++) {
        if (board[row][i]) {
            result["last_piece"] = board[row][i]
            result["free"].push([row, i])
            break
        } else {
            result["free"].push([row, i])
        }
    }

    return result
}

// -check knight
// return associated piece with the associated move to check later
function checkKnight(row, col, board) {
    const d_s = [[-2, -1], [-2, 1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]
    const result = {
        free: [],
        last_piece: []
    }

    d_s.forEach(([dx, dy]) => {
        if (row + dx > -1 && row + dx < 8) {
            if (col + dy > -1 && col + dy < 8) {
                result["last_piece"].push(board[row+dx][col+dy])
                result["free"].push([row+dx, col+dy])
            }
        }
    })

    return result
}

function checkValidPosition(value) {
    return value >= 0 && value <= 7
}


