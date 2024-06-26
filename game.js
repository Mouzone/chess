// entirely text-based
// when moving check if possible and if only few are possible
// when capturing check if can capture
//      then move piece there
//      then mark that piece as dead (easier than to find specific one to pop

import {Black, White} from "./player.js"
import {valid_move, get_color_of_tile, translate_position} from "./helper"

function process_move(move){
    const types = {"K":"king", "Q":"queen", "R":"rooks", "N":"knights", "B":"bishops"}
    if (!(move.at(0) in Object.keys(types))) {
        // must be a pawn
        // if typo will check move and run
        if (!("x" in move)) {
            let specification = null
            if (move.length === 3) {
                specification = move.at(1)
            }
            let counter = 0
            const next_pos = translate_position(move.slice(-2))
            // fix this
            const piece_to_move = players[curr_player_turn].pieces["pawns"].forEach(pawn => {
                if (pawn.check_valid_move(next_pos["file"], next_pos["rank"])){
                    counter++
                    return pawn
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
        }
    } else {
        if (!("x" in move)) {
            let counter = 0
            let specification = null
            if (move.length > 3) {
                specification = move.at(1)
            }
            const next_pos= translate_position(move.slice(-2))
            const type_of_piece = types[`${move.at(0)}`]
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
            // capture logic
        }
    }
    curr_player_turn = !curr_player_turn
}

const players = [new Black(), new White()]
let curr_player_turn = 1
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


