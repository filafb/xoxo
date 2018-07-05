import {Map} from 'immutable'

export default function reducer(state = {turn:'X',board:Map()}, action) {
  // TODO
    // console.log('board: ',state.board)
    // console.log('row: ',state.board['0'])
    // console.log('row: ',state.board['0']['0'])
    // if(state.board.getIn(['0','0'])){

    // }


  switch (action.type){
    // console.log(''action.move)

    case 'move':
      let nextPlayer = ''
      if(action.turn==='X'){nextPlayer='O'}
      else {nextPlayer = 'X'}
    // console.log(state.board.getIn([0,0]))
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
