let curr_player_turn = 1
let game_over = false

const players = [new Black(), new White()]
const BOARD_LENGTH = 8
let board_matrix = Array(BOARD_LENGTH).fill().map(() =>
                    Array(BOARD_LENGTH).fill(null));

createBoard(BOARD_LENGTH)
fillBoards(players, board_matrix)


