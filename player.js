import {Pawn, Rook, Knight, Bishop, King, Queen} from "./pieces"

class Player {
    constructor(color) {
        this.color = color
        let front_line = 7
        let back_line = 8
        if (color === 1) {
            front_line = 1
            back_line = 0
        }
        this.pieces = {
            pawns: [
                new Pawn(front_line, 0, 0),
                new Pawn(front_line, 1, 0),
                new Pawn(front_line, 2, 0),
                new Pawn(front_line, 3, 0),
                new Pawn(front_line, 4, 0),
                new Pawn(front_line, 5, 0),
                new Pawn(front_line, 6, 0),
                new Pawn(front_line, 7, 0),
            ],
            rooks: [
                new Rook(back_line, 0, 0),
                new Rook(back_line, 7, 0)
            ],
            knights: [
                new Knight(back_line, 1, 0),
                new Knight(back_line, 6, 0)
            ],
            bishops: [
                new Bishop(back_line, 2, 0),
                new Bishop(back_line, 5, 0)
            ],
            queens: [
                new Queen(back_line, 4, 0)
            ],
            kings: [
                new King(back_line, 3, 0)
            ]
        }
    }
}