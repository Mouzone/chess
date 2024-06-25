class Piece {
    constructor(x_start_pos, y_start_pos, color) {
        this.x_pos = x_start_pos
        this.y_pos = y_start_pos
        this.color = color
        this.alive = true
    }
}

export class Pawn extends Piece {
    constructor() {
        super()
        this.bonus_move = true
    }

    move(x, y){
        if (this.y_pos === y) {
            if (this.bonus_move) {
                if (this.x_pos - x <= 2) {
                    this.x_pos = x
                    return true
                }
            } else {
                if (this.x_pos - x === 1) {
                    this.x_pos = x
                    return true
                }
            }
        }
        console.log("Error: Invalid Move")
        return false
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