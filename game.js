// entirely text-based
// when moving check location for opponent piece
//      if opponent piece then kill piece and move selected piece
//      if allied piece then print error and re-ask for input

import {Black, White} from "player.js"

function valid_move(x, y){
    return ((x >= 0 && x <= 7) && (y >= 0 && x <= 7))
}

function take(x, y){

}

function get_color_of_tile(x, y){
    if ((x + y) % 2 === 1) {
        return 1
    }
    return 0
}

function translate_notation(){
    // make notation to numeric coordinates
}

function start_game() {
    const black_player = new Black()
    const white_player = new White()
    let curr_player = 1 // white = 1
    while (true) {
        // Input format of Piece to Position i.e. e3 or Nf3
        // pawns, bishops, knights cannot intersect with each other
        // rooks can intersect (clarify using file)
    }
}

start_game()
