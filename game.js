// entirely text-based
// when moving check location for opponent piece
//      if opponent piece then kill piece and move selected piece
//      if allied piece then print error and re-ask for input

import {Black, White} from "./player.js"
import {valid_move, get_color_of_tile, translate_position} from "./helper"

function process_move(move){
    const pieces = ["K", "Q", "R", "N", "B"]
    if (!(move.at(0) in pieces)) {
        // must be a pawn
        // if typo will check move and run
        if (!("x" in move)){
            let counter = 0
            const next_pos = translate_position(move)
            const piece_to_move = players[curr_player_turn].pieces.pawns.forEach(pawn => {
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

        }
    } else {

    }
    curr_player_turn = !curr_player_turn
}

const players = [new Black(), new White()]
let curr_player_turn = 1

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


