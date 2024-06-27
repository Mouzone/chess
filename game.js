// entirely text-based
// when moving check if possible and if only few are possible
// when capturing check if can capture
//      then move piece there
//      then mark that piece as dead (easier than to find specific one to pop

import {Black, White} from "./player.js"
import {valid_move, get_color_of_tile, updateBoard, fillBoards, createBoard} from "./helper.js"

// todo: on drag remove from square
// todo: check square if valid move -> if not return to original square, else move it and change turn
// todo: highlight squares that accept the move
let curr_player_turn = 1
let game_over = false

const players = [new Black(), new White()]
const BOARD_LENGTH = 8
let board_matrix = Array(BOARD_LENGTH).fill().map(() =>
                    Array(BOARD_LENGTH).fill(null));

createBoard(BOARD_LENGTH)
fillBoards(players, board_matrix)


