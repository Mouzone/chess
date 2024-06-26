// entirely text-based
// when moving check if possible and if only few are possible
// when capturing check if can capture
//      then move piece there
//      then mark that piece as dead (easier than to find specific one to pop

import {Black, White} from "./player.js"
import {valid_move, get_color_of_tile, translate_position, updateBoard, fillBoard} from "./helper"

function process_move(move){
    const types = {"K":"kings", "Q":"queens", "R":"rooks", "N":"knights", "B":"bishops"}
    let type_of_piece = "pawns"
    if (move.at(0) in Object.keys(types)){
        type_of_piece = types[move.at(0)]
    }
    
    if (!("x" in move)) {
        let counter = 0
        let specification = null
        if (move.length > 3) {
            specification = move.at(1)
        }
        const next_pos= translate_position(move.slice(-2))
        let piece_to_move = ""
        players[curr_player_turn].pieces[type_of_piece].forEach(piece => {
            if (!piece.alive) {
                return
            }
            if (specification) {
                if (typeof specification === "number") {
                    if (piece.y_pos !== specification) {
                        return
                    }
                } else if (typeof specification === "string") {
                    if (piece.x_pos !== specification) {
                        // figure out logic to check between letter and x_pos which is int
                        return
                    }
                }
            }
            if (piece.check_valid_move(next_pos["file"], next_pos["rank"])){
                counter++
                piece_to_move = piece
            }
        })
        if (counter === 0) {
            console.error("Illegal Move")
        } else if (counter === 1) {
            piece_to_move.move(next_pos["file"], next_pos["rank"])
        } else {
            console.error("Not Specific Enough")
        }
    } else {
        // split it at the "x"
        // if something to the left of x we find specific pawn, else iterate through all and check valid
        let capture_info = move.split("x")
        if (capture_info.length === 1) {
            const next_pos = translate_position(capture_info[0])
            let counter = 0
            const piece_to_move = players[curr_player_turn].pieces[type_of_piece].forEach(pawn => {
                if (pawn.check_valid_move(next_pos["file"], next_pos["rank"])){
                    counter++
                    return pawn
                }
            })
        }
    }
    curr_player_turn = !curr_player_turn
}

const players = [new Black(), new White()]
const BOARD_LENGTH = 8
const board = Array(BOARD_LENGTH).fill().map(() =>
                    Array(BOARD_LENGTH).fill(null));
let curr_player_turn = 1
fillBoard(players, board)
// update this with the take logic
// also will need to create checkmate logic
let game_over = false

const form = document.querySelector("#move-input")
const input = document.querySelector("#move")
const moves = document.querySelector("#moves")
form.addEventListener("submit", event => {
    event.preventDefault()
    const move = input.value
    input.value = ""
    moves.insertAdjacentHTML("beforeend", `<div> ${move}</div>`)
    process_move(move)
})


