// entirely text-based
// when moving check location for opponent piece
//      if opponent piece then kill piece and move selected piece
//      if allied piece then print error and re-ask for input

import {Black, White} from "./player.js"

function valid_move(x, y){
    return ((x >= 0 && x <= 7) && (y >= 0 && x <= 7))
}

function get_color_of_tile(x, y){
    if ((x + y) % 2 === 1) {
        return 1
    }
    return 0
}

function process_move(move){
    if (move.length === 2){
        // just a coordinate and only a pawn
    } else if (move.length === 3){
        // move a piece to an area
    } else if (move.length)
}

function start_game() {
    const black_player = new Black()
    const white_player = new White()
    let curr_player = 1
}

start_game()

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


