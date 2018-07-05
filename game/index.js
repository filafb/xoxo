import {Map} from 'immutable'

export default function reducer(state = {turn:'X',board:Map()}, action) {
  // TODO
    console.log('action: ',action)
    let nextPlayer = ''
    if(action.turn==='X'){nextPlayer='O'}
    else {nextPlayer = 'X'}

  switch (action.type){
    // console.log(''action.move)

    case 'move':
      return {
        turn: nextPlayer,
        board: state.board.setIn(action.coords,action.turn)}
    default:
      return state
  }
}

export function move(turn,coords){
  return {
    type:'move',
    turn: turn,
    coords:coords
  }
}

