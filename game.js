import Player from "./player.js"
import {King} from "./pieces.js";

// todo: remove event listener after dropping
// todo: add logic for capturing squares
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
                // todo: drag and drop on legal move squares
                // ---to make droppable is to remove child from prev square and add it to curr square
                // dropping nonvalid square clears everything
                piece_icon.addEventListener("dragstart", event => {
                    const curr_square = event.currentTarget.parentElement

                    event.currentTarget.parentElement.id = "target"
                    const curr_row = parseInt(curr_square.dataset.row)
                    const curr_col = parseInt(curr_square.dataset.col)

                    // make all these squares droppable, and once dropped remove droppability
                    const curr_active = document.querySelectorAll("div.possible-move")
                    curr_active?.forEach(square => {
                        square.classList.remove("possible-move")
                    })

                    // select all squares that have possible-move class then add drop event
                    // remove piece from the curr_square (or maybe mark the origin square with a class)
                    // add it to the square that is dropped
                    // move it on the board getting the drop square's data elements
                    // remove possible-move from all squares

                    const valid_moves = board[curr_row][curr_col].getValidMoves(board)
                    valid_moves.forEach(valid_move => {
                        const move_square = document.querySelector(`[data-row='${valid_move[0]}'][data-col='${valid_move[1]}']`)
                        move_square.classList.add("possible-move")
                        move_square.addEventListener("dragover", event => {
                                // prevent default to allow drop
                                event.preventDefault()
                            }
                        )
                        move_square.addEventListener("drop", event => {
                            const target = document.querySelector("#target")
                            move_square.appendChild(target.children[0])
                            target.innerHTML = ""
                            const is_king = board[target.dataset.row][target.dataset.col] instanceof King
                            board[target.dataset.row][target.dataset.col].move(parseInt(move_square.dataset.row), parseInt(move_square.dataset.col), board)
                            if (Math.abs(move_square.dataset.col - target.dataset.col) === 2 && is_king) {
                                // grab nearest rook
                                // move it inside
                                if (parseInt(move_square.dataset.col) === 6) {
                                    let rook = document.querySelector(`[data-row='${target.dataset.row}'][data-col='${7}']`)
                                    let endSquare = document.querySelector(`[data-row='${target.dataset.row}'][data-col='${5}']`)
                                    endSquare.appendChild(rook.children[0])
                                    rook.innerHTML = ""
                                } else {
                                    let rook = document.querySelector(`[data-row='${target.dataset.row}'][data-col='${0}']`)
                                    let endSquare = document.querySelector(`[data-row='${target.dataset.row}'][data-col='${3}']`)
                                    endSquare.appendChild(rook.children[0])
                                    rook.innerHTML = ""
                                }
                            }
                            const curr_active = document.querySelectorAll("div.possible-move")
                            curr_active.forEach(square => {
                                square.classList.remove("possible-move")
                                // remove dragover event listener here too
                            })
                            const curr_target = document.querySelector("#target")
                            curr_target.id = ""
                            console.log(board)
                        })
                    })


                })

                if (piece.color === BLACK) {
                    // slice to remove plural "s" from pieces keys
                    piece_icon.src = `./pieces/black-${type_of_piece.slice(0,-1)}.svg`
                } else {
                    piece_icon.src = `./pieces/white-${type_of_piece.slice(0,-1)}.svg`
                }
                board[piece.row][piece.col] = piece
                target_square.appendChild(piece_icon)
            })
        })
    })
}

function initializeGame(){
    generateBoardDisplay()
    placePieces()
}

const board = Array.from({ length: 8 }, () => Array(8).fill(null))
const WHITE = 0
const BLACK = 1
const players = [new Player(WHITE), new Player(BLACK)]
initializeGame()