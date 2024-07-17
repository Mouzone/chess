// todo: put capture logic for pawns, since pawns can move different if near another piece
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
    getValidMoves(curr_x, curr_y){
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

    move(x, y){
        if (y-this.y_pos === 2){
            this.bonus_move = false
        }
        this.x_pos = x
        this.y_pos = y
    }
}

export class Rook extends Piece {

    move(x, y){
        if (this.y_pos - y === 0) {
            this.x_pos = x
            return true
        } else if (this.x_pos - x === 0) {
            this.y_pos = y
            return true
        }
        console.log("Error: Invalid Move")
        return false
    }
}

export class Knight extends Piece {
    move(x, y){
        if ((Math.abs(this.x_pos-x) === 2 && Math.abs(this.y_pos-y) === 1) ||
            (Math.abs(this.x_pos-x) === 1 && Math.abs(this.y_pos-y) === 2)){

            this.x_pos = x
            this.y_pos = y
            return true
        }
        console.log("Error: Invalid Move")
        return false
    }
}

export class Bishop extends Piece {
    move(x, y){
        if (Math.abs(this.x_pos - x) === Math.abs(this.y_pos - y)){
            this.x_pos = x
            this.y_pos = y
            return true
        }
        console.log("Error: Invalid Move")
        return false
    }
}

export class King extends Piece {
    move(x, y) {
        if (Math.abs(this.x_pos-x) <= 1 && Math.abs(this.y_pos - y) <= 1){
            this.x_pos = x
            this.y_pos = y
            return true
        }
        console.log("Error: Invalid Move")
        return false
    }
}

export class Queen extends Piece {
    move(x, y){
        //bishop move pattern
        if (Math.abs(this.x_pos - x) === Math.abs(this.y_pos - y)){
            this.x_pos = x
            this.y_pos = y
            return true
        } else if (this.y_pos - y === 0) { //rook move pattern
            this.x_pos = x
            return true
        } else if (this.x_pos - x === 0) {
            this.y_pos = y
            return true
        }
        console.log("Error: Invalid Move")
        return false
    }
}