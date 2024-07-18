import {Pawn, Rook, Knight, Bishop, King, Queen} from "./pieces.js"

const BLACK = 1

export default class Player {
    constructor(color) {
        this.color = color

        let front_line = 6
        let back_line = 7
        if (color === BLACK) {
            front_line = 1
            back_line = 0
        }
        this.pieces = {
            pawns: [
                new Pawn(front_line, 0, color),
                new Pawn(front_line, 1, color),
                new Pawn(front_line, 2, color),
                new Pawn(front_line, 3, color),
                new Pawn(front_line, 4, color),
                new Pawn(front_line, 5, color),
                new Pawn(front_line, 6, color),
                new Pawn(front_line, 7, color),
            ],
            rooks: [
                new Rook(back_line, 0, color),
                new Rook(back_line, 7, color)
            ],
            knights: [
                new Knight(back_line, 1, color),
                new Knight(back_line, 6, color)
            ],
            bishops: [
                new Bishop(back_line, 2, color),
                new Bishop(back_line, 5, color)
            ],
            queens: [
                new Queen(back_line, 3, color)
            ],
            kings: [
                new King(back_line, 4, color)
            ]
        }
    }
}