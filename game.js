import Player from "./player.js"
import {King, Pawn, Bishop, Rook, Queen, Knight} from "./pieces.js";

// todo: iterate over pieces and crop it appropriately
function generateBoardDisplay(){
    const board = document.querySelector("div#board")
    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){
            const square = document.createElement("div")
            board.insertAdjacentElement("beforeend", square)
            // sX for square number X
            square.classList.add("square")
            square.dataset.row = `${row}`
            square.dataset.col = `${col}`
            if ((row + col) % 2) {
                square.classList.add("black")
            } else {
                square.classList.add("white")
            }
        }
    }
}

function placePieces() {
    players.forEach(player => {
        Object.entries(player.pieces).forEach(([type_of_piece, pieces]) => {
            pieces.forEach(piece => {
                const target_square = document.querySelector(`[data-row='${piece.row}'][data-col='${piece.col}']`)
                const piece_icon = new Image()
                piece_icon.draggable = true
                piece_icon.classList.add("piece")
                if (piece.color === BLACK) {
                    // slice to remove plural "s" from pieces keys
                    piece_icon.src = `./pieces/black-${type_of_piece.slice(0,-1)}.svg`
                    piece_icon.classList.add("black-piece")
                } else {
                    piece_icon.src = `./pieces/white-${type_of_piece.slice(0,-1)}.svg`
                    piece_icon.classList.add("white-piece")
                }
                board[piece.row][piece.col] = piece
                target_square.appendChild(piece_icon)
            })
        })
    })
}

function makePiecesInteractive(curr_player) {
    let color_to_select = "black-piece"
    if (curr_player === WHITE){
        color_to_select = "white-piece"
    }
    const pieces = document.querySelectorAll(`.${color_to_select}.piece`)
    pieces.forEach(piece => {
        piece.addEventListener("dragstart", handleDragStart)
    })
}

function handleDragStart(event) {
    removePossibleMoves()

    const prev_element = document.getElementById("target")
    if (prev_element) {
        prev_element.id = ""
    }
    const curr_square = event.currentTarget.parentElement
    event.currentTarget.parentElement.id = "target"

    const curr_row = parseInt(curr_square.dataset.row)
    const curr_col = parseInt(curr_square.dataset.col)
    const valid_moves = board[curr_row][curr_col].getValidMoves(board)
    valid_moves.forEach(valid_move => {
        makeMoveSquareInteractive(valid_move)
    })
}

function removePossibleMoves() {
    const curr_active = document.querySelectorAll("div.possible-move")
    curr_active?.forEach(square => {
        square.classList.remove("possible-move")
        square.removeEventListener("dragover", handleDragOver);
        square.removeEventListener("drop", movePieceOnBoard)
    })
}

function makeMoveSquareInteractive(valid_move) {
    const move_square = document.querySelector(`[data-row='${valid_move[0]}'][data-col='${valid_move[1]}']`)
    move_square.classList.add("possible-move")
    move_square.addEventListener("dragover", handleDragOver)
    move_square.addEventListener("drop", movePieceOnBoard)
}

function movePieceOnBoard(event) {
    const move_square = event.currentTarget
    const occupied = board[move_square.dataset.row][move_square.dataset.col]
    captureSquare(move_square)
    const target = document.querySelector("#target")
    move_square.appendChild(target.children[0])
    target.innerHTML = ""

    // logic to modify display and board upon castling
    if (board[target.dataset.row][target.dataset.col] instanceof King && Math.abs(move_square.dataset.col - target.dataset.col) === 2){
        castle(board[target.dataset.row][target.dataset.col], target, move_square)
    } else {
        board[target.dataset.row][target.dataset.col].move(parseInt(move_square.dataset.row), parseInt(move_square.dataset.col), board)
    }

    // logic to modify display and board upon pawnPromotion
    if (board[move_square.dataset.row][move_square.dataset.col] instanceof Pawn) {
        if (parseInt(move_square.dataset.row) === 0 || parseInt(move_square.dataset.row) === 7) {
            pawnPromotion(parseInt(move_square.dataset.row), parseInt(move_square.dataset.col), board[move_square.dataset.row][move_square.dataset.col].color)
        }
    }

    if (board[move_square.dataset.row][move_square.dataset.col] instanceof Pawn && (Math.abs(move_square.dataset.row - target.dataset.row) === 2)) {
        if (parseInt(move_square.dataset.col) + 1 < 8) {
            if (board[move_square.dataset.row][parseInt(move_square.dataset.col) + 1] instanceof Pawn && board[move_square.dataset.row][parseInt(move_square.dataset.col) + 1].color !== board[move_square.dataset.row][move_square.dataset.col].color) {
                const right_square = document.querySelector(`[data-row='${move_square.dataset.row}'][data-col='${parseInt(move_square.dataset.col) + 1}']`)
                right_square.classList.add("canEnPassant")
            }
        }
        if (parseInt(move_square.dataset.col) - 1 > -1) {
            if (board[move_square.dataset.row][parseInt(move_square.dataset.col) - 1] instanceof Pawn && board[move_square.dataset.row][parseInt(move_square.dataset.col) - 1].color !== board[move_square.dataset.row][move_square.dataset.col].color) {
                const left_square = document.querySelector(`[data-row='${move_square.dataset.row}'][data-col='${parseInt(move_square.dataset.col) - 1}']`)
                left_square.classList.add("canEnPassant")
            }
        }
    }

    // logic for enPassant
    const color_to_remove = board[move_square.dataset.row][move_square.dataset.col].color
    if (board[move_square.dataset.row][move_square.dataset.col] instanceof Pawn && (Math.abs(move_square.dataset.col - target.dataset.col) === 1)) {
        if (!occupied){
            // if square moving to is not occupied and moving diagonally, move the pawn near it
            enPassant(parseInt(move_square.dataset.row), parseInt(move_square.dataset.col))
        }
    }

    removeEnPassant(color_to_remove)
    removePossibleMoves()
    removePiecesInteractive(color_to_remove)
    makePiecesInteractive((color_to_remove + 1) % 2)
    target.id = ""

    if (occupied && occupied instanceof King) {
        endGame()
    }
}

function endGame() {
    // todo: produce popup that says who wins
    // todo: resets the game state
}

function removePiecesInteractive(color) {
    let color_to_select = "black-piece"
    if (color === WHITE){
        color_to_select = "white-piece"
    }
    const pieces = document.querySelectorAll(`.${color_to_select}.piece`)
    pieces.forEach(piece => {
        piece.removeEventListener("dragstart", handleDragStart)
    })
}

function castle(king, curr_square, move_square) {
    king.move(parseInt(move_square.dataset.row), parseInt(move_square.dataset.col), board)

    // move rook on board_display and move rook on board
    let rook_element = document.querySelector(`[data-row='${curr_square.dataset.row}'][data-col='${0}']`)
    let rook = board[curr_square.dataset.row][0]
    let endSquare = document.querySelector(`[data-row='${curr_square.dataset.row}'][data-col='${3}']`)
    let col = 3

    if (parseInt(move_square.dataset.col) === 6) {
        rook_element = document.querySelector(`[data-row='${curr_square.dataset.row}'][data-col='${7}']`)
        rook = board[curr_square.dataset.row][7]
        endSquare = document.querySelector(`[data-row='${curr_square.dataset.row}'][data-col='${5}']`)
        col = 5
    }

    rook.move(curr_square.dataset.row, col, board)
    rook.bonus_move = false

    endSquare.appendChild(rook_element.children[0])
    rook_element.innerHTML = ""
}

function captureSquare(square) {
    square.innerHTML = ""
    board[square.dataset.row][square.dataset.col] = null
}

function enPassant(row, col) {
    // (row, col) is a pawn
    let pawn_to_be_captured = document.querySelector(`[data-row='${row+1}'][data-col='${col}']`)
    if (board[row][col].color) {
        board[row-1][col] = null
        pawn_to_be_captured = document.querySelector(`[data-row='${row-1}'][data-col='${col}']`)
    } else {
        board[row+1][col] = null
    }
    pawn_to_be_captured.innerHTML = ""
}

function removeEnPassant(color) {
    let pieces_color = "black-piece"
    if (color === WHITE) {
        pieces_color = "white-piece"
    }
    const pieces_to_be_cleaned = document.querySelectorAll(`.${pieces_color}.canEnPassant`)
    pieces_to_be_cleaned.forEach(element => {
        if (board[element.dataset.row][element.dataset.col]) {
            board[element.dataset.row][element.dataset.col].valid_moves.length = 0
        }
        element.classList.remove("canEnPassant")
    })
}

function pawnPromotion(row, col, color) {
    const valid_pieces = ["rook", "queen", "knight", "bishop"]

    let promote_to = prompt("Enter piece to promote to (Queen, Rook, Bishop, Knight): ")
    promote_to = promote_to.trim()
    let promote_to_cleaned = promote_to.slice(0, promote_to.length).toLowerCase()

    while (!valid_pieces.includes(promote_to_cleaned)) {
        promote_to = prompt("Enter piece to promote to (Queen, Rook, Bishop, Knight): ")
        promote_to = promote_to.trim()
        promote_to_cleaned = promote_to.slice(0, promote_to.length).toLowerCase()
    }

    if (promote_to_cleaned === "rook") {
        board[row][col] = new Rook(row, col, color)
    } else if (promote_to_cleaned === "queen") {
        board[row][col] = new Queen(row, col, color)
    } else if (promote_to_cleaned === "bishop") {
        board[row][col] = new Bishop(row, col, color)
    } else {
        board[row][col] = new Knight(row, col, color)
    }

    const to_be_promoted = document.querySelector(`[data-row='${row}'][data-col='${col}']`)
    to_be_promoted.innerHTML = ""
    const new_piece = new Image()
    new_piece.draggable = true
    new_piece.classList.add("piece")
    if (color === BLACK) {
        // slice to remove plural "s" from pieces keys
        new_piece.src = `./pieces/black-${promote_to_cleaned}.svg`
        new_piece.classList.add("black-piece")
    } else {
        new_piece.src = `./pieces/white-${promote_to_cleaned}.svg`
        new_piece.classList.add("white-piece")
    }
    to_be_promoted.appendChild(new_piece)
    new_piece.addEventListener("dragstart", handleDragStart)
}

// prevent default to allow drop
function handleDragOver(event) {
    event.preventDefault();
}

function initializeGame(){
    generateBoardDisplay()
    placePieces()
    makePiecesInteractive(curr_player)
}

const board = Array.from({ length: 8 }, () => Array(8).fill(null))
const WHITE = 0
const BLACK = 1
let curr_player = WHITE
const players = [new Player(WHITE), new Player(BLACK)]
initializeGame()