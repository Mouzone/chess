import {Pawn, Rook, Knight, Bishop, King, Queen} from "./pieces"

class Black {
    constructor() {
        this.pieces = {
            pawns: [
                new Pawn(0, 1, 0),
                new Pawn(1, 1, 0),
                new Pawn(2, 1, 0),
                new Pawn(3, 1, 0),
                new Pawn(4, 1, 0),
                new Pawn(5, 1, 0),
                new Pawn(6, 1, 0),
                new Pawn(7, 1, 0),
                ],
            rooks: [
                new Rook(0, 0, 0),
                new Rook(7, 0, 0)
            ],
            knights: [
                new Knight(1, 0, 0),
                new Knight(6, 0, 0)
            ],
            bishops: [
                new Bishop(2, 0, 0),
                new Bishop(5, 0, 0)
            ],
            queen: [
                new Queen(3, 0, 0),
            ],
            king: [
                new King(4, 0, 0)
            ]
        }
    }
}

class White {
    constructor() {
        this.pieces = {
            pawns: [
                new Pawn(0, 6, 1),
                new Pawn(1, 6, 1),
                new Pawn(2, 6, 1),
                new Pawn(3, 6, 1),
                new Pawn(4, 6, 1),
                new Pawn(5, 6, 1),
                new Pawn(6, 6, 1),
                new Pawn(7, 6, 1),
            ],
            rooks: [
                new Rook(0, 7, 1),
                new Rook(7, 7, 1)
            ],
            knights: [
                new Knight(1, 7, 1),
                new Knight(6, 7, 1)
            ],
            bishops: [
                new Bishop(2, 7, 1),
                new Bishop(5, 7, 1)
            ],
            queen: [
                new Queen(3, 7, 1)
            ],
            king: [
                new King(4, 7, 1)
            ]
        }
    }
}