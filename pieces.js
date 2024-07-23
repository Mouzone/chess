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
            if (!bottom_right.piece || (bottom_right.piece && bottom_right.color !== this.color)) {
                this.valid_moves.push(bottom_right.position)
            }

            const bottom_left = checkBottomLeft(this.row, this.col, limit, board)
            if (!bottom_left.piece || (bottom_left.piece && bottom_left.color !== this.color)) {
                this.valid_moves.push(bottom_left.position)
            }

            if (this.bonus_move) {
                limit = 2
            }
            const straight_down = checkStraightDown(this.row, this.col, limit, board)
            if (!straight_down.piece || (straight_down.piece && straight_down.color !== this.color)) {
                for (let i = 0; i <= straight_down.position[1]; i++) {
                    this.valid_moves.push([i, bottom_left.position[1]])
                }
            }
        } else {
            const top_right = checkTopRight(this.row, this.col, limit, board)
            if (!top_right.piece || (top_right.piece && top_right.color !== this.color)) {
                this.valid_moves.push(top_right.position)
            }

            const top_left = checkTopLeft(this.row, this.col, limit, board)
            if (!top_left.piece || (top_left.piece && top_left.color !== this.color)) {
                this.valid_moves.push(top_left.position)
            }

            if (this.bonus_move) {
                limit = 2
            }
            const straight_up = checkStraightUp(this.row, this.col, limit, board)
            if (!straight_up.piece || (straight_up.piece && straight_up.color !== this.color)) {
                for (let i = 0; i <= straight_up.position[1]; i++) {
                    this.valid_moves.push([i, straight_up.position[1]])
                }
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
        const up = checkStraightUp(this.row, this.col, board)
        for (let i = this.row - 1; i > up.position[0]; i--) {
            this.valid_moves.push([i, up.position[1]])
        }
        if (up.piece.color !== this.color) {
            this.valid_moves.push(up.position)
        }

        const down = checkStraightDown(this.row, this.col, board)
        for (let i = this.row + 1; i < down.position[0]; i++) {
            this.valid_moves.push([i, down.position[1]])
        }
        if (down.piece.color !== this.color) {
            this.valid_moves.push(down.position)
        }

        const left = checkStraightLeft(this.row, this.col, board)
        for (let j = this.row - 1; j > left.position[1]; j--) {
            this.valid_moves.push([left.position[0], j])
        }
        if (left.piece.color !== this.color) {
            this.valid_moves.push(left.position)
        }

        const right = checkStraightRight(this.row, this.col, board)
        for (let j = this.row + 1; j < left.position[1]; j++) {
            this.valid_moves.push([right.position[0], j])
        }
        if (right.piece.color !== this.color) {
            this.valid_moves.push(right.position)
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
        last_piece: Piece
    }

    if (limit) {
        if (checkValidPosititon(row - 1) && checkValidPosititon(col-1)) {
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
        } else {
            result["free"].push([i, j])
        }
        j--
    }

    return result
}

// -check top right
function checkTopRight(row, col, limit=0, board) {
    let j = col + 1
    const result = {
        free: [],
        last_piece: Piece
    }
    limit = Math.min(7, col + limit)
    for (let i = row-1; i > -1; i--){
        if (board[i][j] || i === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
        }
        j++
    }

    return result
}

// -check bottom left
function checkBottomLeft(row, col, limit=0, board) {
    let j = col - 1
    const result = {
        free: [],
        last_piece: Piece
    }

    limit = Math.max(0, col - limit)
    for (let i = row+1; i < 8; i++){
        if (board[i][j] || i === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
        }
        j--
    }

    return result
}

// -check bottom right
function checkBottomRight(row, col, limit=0, board) {
    let j = col + 1
    const result = {
        free: [],
        last_piece: Piece
    }
    limit = Math.min(7, col + limit)
    for (let i = row+1; i < 8; i++){
        if (board[i][j] || i === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
        }
        j--
    }

    return result
}

// -check straight up
function checkStraightUp(row, col, limit=0, board) {
    const result = {
        free: [],
        last_piece: Piece
    }
    limit = Math.max(0, row-limit)
    for (let i = row - 1; i > -1; i--) {
        if (board[i][j] || i === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
        }
    }

    return result
}

// -check straight down
function checkStraightDown(row, col, limit=0, board) {
    const result = {
        free: [],
        last_piece: Piece
    }
    limit = Math.min(7, row + limit)
    for (let i = row + 1; i < 8; i++){
        if (board[i][j] || i === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
        }
    }

    return result
}

// -check straight left
function checkStraightLeft(row, col, limit=0, board) {
    const result = {
        free: [],
        last_piece: Piece
    }
    limit = Math.max(0, col - limit)
    for (let i = col - 1; i > -1; i--){
        if (board[row][j] || j === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
        }
    }

    return result
}

// -check straight right
function checkStraightRight(row, col, limit=0, board) {
    const result = {
        free: [],
        last_piece: Piece
    }
    limit = Math.min(7, col + limit)
    for (let i = col + 1; i < 8; i++) {
        if (board[i][j] || j === limit) {
            result["last_piece"] = board[i][j]
        } else {
            result["free"].push([i, j])
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

function checkValidPosititon(value) {
    return value >= 0 && value <= 7
}


