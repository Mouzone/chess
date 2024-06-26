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

function translate_position(position) {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (let i = 0; i < alphabet.length; i++){
        if (position.at(0) === alphabet[i]) {
            return {"file": i, "rank": parseInt(position.at(1))}
        }
    }
}

function process_move(move){
    const pieces = ["K", "Q", "R", "N", "B"]
    if (!(move.at(0) in pieces)) {
        
    }
}

const black_player = new Black()
const white_player = new White()
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


