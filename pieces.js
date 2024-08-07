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
            if (bottom_right.last_piece && bottom_right.last_piece.color !== this.color) {
                this.valid_moves.push([bottom_right.last_piece.row, bottom_right.last_piece.col])
            }

            const bottom_left = checkBottomLeft(this.row, this.col, limit, board)
            if (bottom_left.last_piece && bottom_left.last_piece.color !== this.color) {
                this.valid_moves.push([bottom_left.last_piece.row, bottom_left.last_piece.col])
            }

            if (this.bonus_move) {
                limit = 2
            }
            const straight_down = checkStraightDown(this.row, this.col, limit, board)
            if (!straight_down.last_piece) {
                this.valid_moves = this.valid_moves.concat(straight_down.free)
            } else if (straight_down.free.length === 2) {
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
            } else if (straight_up.free.length === 2) {
                this.valid_moves.push(straight_up.free[0])
            }
        }
        return this.valid_moves
    }

    move(row, col, board) {
        const temp_row = this.row
        super.move(row, col, board)

        if (Math.abs(temp_row - this.row) === 2) {
            if (this.col+1 < 8 && board[this.row][this.col+1] && board[this.row][this.col+1] instanceof Pawn) {
                if (board[this.row][this.col+1].color !== this.color)
                    if (this.color) {
                        board[this.row][this.col+1].valid_moves.push([this.row - 1, this.col])
                    } else {
                        board[this.row][this.col+1].valid_moves.push([this.row + 1, this.col])
                    }
            }
            if (this.col-1 > -1 && board[this.row][this.col-1] && board[this.row][this.col-1] instanceof Pawn) {
                if (board[this.row][this.col-1].color !== this.color){
                    if (this.color) {
                        board[this.row][this.col-1].valid_moves.push([this.row - 1, this.col])
                    } else {
                        board[this.row][this.col-1].valid_moves.push([this.row + 1, this.col])
                    }
                }
            }
        }
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
        for (let i = 0; i < moves.free.length; i++) {
            if (!moves.last_piece[i] || (moves.last_piece[i].color !== this.color)) {
                this.valid_moves.push(moves.free[i])
            }
        }

        return this.valid_moves
    }
}

export class Bishop extends Piece {
    getValidMoves(board) {
        const limit = 0

        const top_left = checkTopLeft(this.row, this.col, limit, board)
        if (!top_left.last_piece) {
            this.valid_moves = this.valid_moves.concat(top_left.free)
        } else {
            this.valid_moves = this.valid_moves.concat(top_left.free.slice(0, -1))
            if (top_left.last_piece.color !== this.color) {
                this.valid_moves.push(top_left.free[top_left.free.length-1])
            }
        }

        const top_right = checkTopRight(this.row, this.col, limit, board)
        if (!top_right.last_piece) {
            this.valid_moves = this.valid_moves.concat(top_right.free)
        } else {
            this.valid_moves = this.valid_moves.concat(top_right.free.slice(0, -1))
            if (top_right.last_piece.color !== this.color) {
                this.valid_moves.push(top_right.free[top_right.free.length-1])
            }
        }

        const bottom_left = checkBottomLeft(this.row, this.col, limit, board)
        if (!bottom_left.last_piece) {
            this.valid_moves = this.valid_moves.concat(bottom_left.free)
        } else {
            this.valid_moves = this.valid_moves.concat(bottom_left.free.slice(0, -1))
            if (bottom_left.last_piece.color !== this.color) {
                this.valid_moves.push(bottom_left.free[bottom_left.free.length-1])
            }
        }

        const bottom_right = checkBottomRight(this.row, this.col, limit, board)
        if (!bottom_right.last_piece) {
            this.valid_moves = this.valid_moves.concat(bottom_right.free)
        } else {
            this.valid_moves = this.valid_moves.concat(bottom_right.free.slice(0, -1))
            if (bottom_right.last_piece.color !== this.color) {
                this.valid_moves.push(bottom_right.free[bottom_right.free.length-1])
            }
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
        super.move(row, col, board)
        this.bonus_move = false
    }
}

export class Queen extends Piece {
    getValidMoves(board) {
        const limit = 0

        const top_left = checkTopLeft(this.row, this.col, limit, board)
        if (!top_left.last_piece) {
            this.valid_moves = this.valid_moves.concat(top_left.free)
        } else {
            this.valid_moves = this.valid_moves.concat(top_left.free.slice(0, -1))
            if (top_left.last_piece.color !== this.color) {
                this.valid_moves.push(top_left.free[top_left.free.length-1])
            }
        }

        const top_right = checkTopRight(this.row, this.col, limit, board)
        if (!top_right.last_piece) {
            this.valid_moves = this.valid_moves.concat(top_right.free)
        } else {
            this.valid_moves = this.valid_moves.concat(top_right.free.slice(0, -1))
            if (top_right.last_piece.color !== this.color) {
                this.valid_moves.push(top_right.free[top_right.free.length-1])
            }
        }

        const bottom_left = checkBottomLeft(this.row, this.col, limit, board)
        if (!bottom_left.last_piece) {
            this.valid_moves = this.valid_moves.concat(bottom_left.free)
        } else {
            this.valid_moves = this.valid_moves.concat(bottom_left.free.slice(0, -1))
            if (bottom_left.last_piece.color !== this.color) {
                this.valid_moves.push(bottom_left.free[bottom_left.free.length-1])
            }
        }

        const bottom_right = checkBottomRight(this.row, this.col, limit, board)
        if (!bottom_right.last_piece) {
            this.valid_moves = this.valid_moves.concat(bottom_right.free)
        } else {
            this.valid_moves = this.valid_moves.concat(bottom_right.free.slice(0, -1))
            if (bottom_right.last_piece.color !== this.color) {
                this.valid_moves.push(bottom_right.free[bottom_right.free.length-1])
            }
        }

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
}

// check if the square/piece is under threat by any pieces close by
function checkThreat(row, col, color, board) {
    const limit = 0

    // if piece is white then only check for black pawn ABOVE it
    const top_left = checkTopLeft(row, col, limit, board)
    if (top_left.last_piece && top_left.last_piece.color !== color) {
        if (top_left.last_piece instanceof Bishop || top_left.last_piece instanceof Queen) {
            return true
        } else if (top_left.free.length === 1) {
            if (top_left.last_piece instanceof King) {
                return true
            } else if (top_left.last_piece instanceof Pawn && color === 0) {
                return true
            }
        }
    }


    const top_right = checkTopRight(row, col, limit, board)
    if (top_right.last_piece && top_right.last_piece.color !== color) {
        if (top_right.last_piece instanceof Bishop || top_right.last_piece instanceof Queen) {
            return true
        } else if (top_right.free.length === 1) {
            if (top_right.last_piece instanceof King) {
                return true
            } else if (top_right.last_piece instanceof Pawn && color === 0) {
                return true
            }
        }
    }

    // if piece is black then only check for white pawn BELOW it else don't check
    const bottom_left = checkBottomLeft(row, col, limit, board)
    if (bottom_left.last_piece && bottom_left.last_piece.color !== color) {
        if (bottom_left.last_piece instanceof Bishop || bottom_left.last_piece instanceof Queen) {
            return true
        } else if (bottom_left.free.length === 1) {
            if (bottom_left.last_piece instanceof King) {
                return true
            } else if (bottom_left.last_piece instanceof Pawn && this.color === 0) {
                return true
            }
        }
    }

    const bottom_right = checkBottomRight(row, col, limit, board)
    if (bottom_right.last_piece && bottom_right.last_piece.color !== color) {
        if (bottom_right.last_piece instanceof Bishop || bottom_right.last_piece instanceof Queen) {
            return true
        } else if (bottom_right.free.length === 1) {
            if (bottom_right.last_piece instanceof King) {
                return true
            } else if (bottom_right.last_piece instanceof Pawn && this.color === 0) {
                return true
            }
        }
    }

    const up = checkStraightUp(row, col, limit, board)
    if (up.last_piece && up.last_piece.color !== color) {
        if (up.last_piece instanceof Rook || up.last_piece instanceof Queen) {
            return true
        } else if (up.free.length === 1 && up.last_piece instanceof King) {
            return true
        }
    }

    const down = checkStraightDown(row, col, limit, board)
    if (down.last_piece && down.last_piece.color !== color) {
        if (down.last_piece instanceof Rook || down.last_piece instanceof Queen) {
            return true
        } else if (down.free.length === 1 && down.last_piece instanceof King) {
            return true
        }
    }

    const left = checkStraightLeft(row, col, limit, board)
    if (left.last_piece && left.last_piece.color !== color) {
        if (left.last_piece instanceof Rook || left.last_piece instanceof Queen) {
            return true
        } else if (left.free.length === 1 && left.last_piece instanceof King) {
            return true
        }
    }

    const right = checkStraightRight(row, col, limit, board)
    if (right.last_piece && right.last_piece.color !== color) {
        if (right.last_piece instanceof Rook || right.last_piece instanceof Queen) {
            return true
        } else if (right.free.length === 1 && right.last_piece instanceof King) {
            return true
        }
    }

    const knight_threats = checkKnight(row, col, board)
    knight_threats.last_piece.forEach(threat => {
        if (threat && threat instanceof Knight) {
            return true
        }
    })

    return false
}


// pathing checks
// return: all unoccupied squares from current position to and including limit, and the last square
// -- ex) {free:[], last_piece:Piece}

function checkTopLeft(row, col, limit, board) {
    const result = {
        free: [],
        last_piece: null
    }

    if (col === 0 || row === 0) {
        return result
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
        if (board[i][j] || j === 0) {
            result["last_piece"] = board[i][j]
            result["free"].push([i, j])
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

    if (col === 7 || row === 0) {
        return result
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
        if (board[i][j] || j === 7) {
            result["last_piece"] = board[i][j]
            result["free"].push([i, j])
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

    if (col === 0 || row === 7) {
        return result
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
        if (board[i][j] || j === 0) {
            result["last_piece"] = board[i][j]
            result["free"].push([i, j])
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

    if (col === 7 || row === 7) {
        return result
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
        if (board[i][j] || j === 7) {
            result["last_piece"] = board[i][j]
            result["free"].push([i, j])
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


