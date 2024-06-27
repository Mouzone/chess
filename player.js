import {Pawn, Rook, Knight, Bishop, King, Queen} from "./pieces.js"

// white is on the bottom of the board representation
// file is x, rank is y
export class Black {
    constructor() {
        this.pieces = {
            pawns: [
                new Pawn(1, 0, 0),
                new Pawn(1, 1, 0),
                new Pawn(1, 2, 0),
                new Pawn(1, 3, 0),
                new Pawn(1, 4, 0),
                new Pawn(1, 5, 0),
                new Pawn(1, 6, 0),
                new Pawn(1, 7, 0),
                ],
            rooks: [
                new Rook(0, 0, 0),
                new Rook(0, 7, 0)
            ],
            knights: [
                new Knight(0, 1, 0),
                new Knight(0, 6, 0)
            ],
            bishops: [
                new Bishop(0, 2, 0),
                new Bishop(0, 5, 0)
            ],
            queens: [
                new Queen(0, 3, 0),
            ],
            kings: [
                new King(0, 4, 0)
            ]
        }
    }
}

export class White {
    constructor() {
        this.pieces = {
            pawns: [
                new Pawn(6, 0, 1),
                new Pawn(6, 1, 1),
                new Pawn(6, 2, 1),
                new Pawn(6, 3, 1),
                new Pawn(6, 4, 1),
                new Pawn(6, 5, 1),
                new Pawn(6, 6, 1),
                new Pawn(6, 7, 1),
            ],
            rooks: [
                new Rook(7, 0, 1),
                new Rook(7, 7, 1)
            ],
            knights: [
                new Knight(7, 1, 1),
                new Knight(7, 6, 1)
            ],
            bishops: [
                new Bishop(7, 2, 1),
                new Bishop(7, 5, 1)
            ],
            queens: [
                new Queen(7, 3, 1)
            ],
            kings: [
                new King(7, 4, 1)
            ]
        }
    }
}