import {Map} from 'immutable'

const MOVE = 'MOVE'

function turnReducer(turn='X', action){
  if(action.type === MOVE)
    return turn === 'X' ? 'O' : 'X'
  return turn
}


function boardReducer(board= Map(), action){
  if(action.type === MOVE)
    return board.setIn(action.coords, action.turn)
  return board
}

// function checkWinner(winner=undefined, action){
//   if(action.type === 'FINALRESULT'){
//     return {winner: action.winner}
//   }
// }


export default function reducer(state = {}, action) {
  return {
    board : boardReducer(state.board, action),
    turn: turnReducer(state.turn, action),
  }
}

export function move(turn,coords){
  return {
    type:'MOVE',
    turn: turn,
    coords:coords
  }
}

export function streak(board,coords) {
  // TOOD
  const result = board.getIn(coords[0])
  for(let i = 0; i<coords.length;i++ ){
    const currValue = board.getIn(coords[i])
    if(currValue!==result){
      return undefined
    }
  }
  return result
}
