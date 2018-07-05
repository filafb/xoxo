import inquirer from 'inquirer'

import gameReducer, {move, streak} from './game'
import {createStore} from 'redux'
let counter = -1

const printBoard = () => {

  if (winner()){

  console.log(winner(),'- Won!')}
  // console.log('counter: ',counter)
  const {board} = game.getState()
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], '_'))
    }
    process.stdout.write('\n')
  }
}

const winner = () =>{
  if (counter === 9){
    return 'Computer'
  }else{
  counter+= 1}
  // console.log('counter: ',counter)
  const {board} = game.getState()
  //streak(board,[0,0],coords) coords = [[0,1],[0,2]]
  // let firstCoord = [0,0]
  //|============== Row Check ==============|
  for(let row = 0;row<3;row++){
    let arrCoords = []
    for(let col = 0;col<3;col++){
      arrCoords.push([row,col])
    }
    const resultWinner = streak(board,arrCoords)
    if(resultWinner!==undefined){
      return resultWinner
    }
  }
  //|============== Column Check ==============|
  for(let col = 0;col<3;col++){
    let arrCoords = []
    for(let row = 0;row<3;row++){
      arrCoords.push([row,col])
    }
    const resultWinner = streak(board,arrCoords)
    if(resultWinner!==undefined){
      return resultWinner
    }
  }
  //|============== backward slash ==============|
    const bSlashRes = streak(board,[[0,0],[1,1],[2,2]])
    if(bSlashRes){
      return bSlashRes
    }
  //|============== forward slash ==============|
    const fSlashRes = streak(board,[[2,0],[1,1],[0,2]])
    if(fSlashRes){
      return fSlashRes
    }


}

const getInput = player => async () => {
  const {turn} = game.getState()
  if (turn !== player) return
  const ans = await inquirer.prompt([{
    type: 'input',
    name: 'coord',
    message: `${turn}'s move (row,col):`
  }])
  const [row=0, col=0] = ans.coord.split(/[,\s+]/).map(x => +x)
  game.dispatch(move(turn, [row, col]))
}

// Create the store
const game = createStore(gameReducer)

// Debug: Print the state
// game.subscribe(() => console.log(game.getState()))

game.subscribe(printBoard)
game.subscribe(getInput('X'))
game.subscribe(getInput('O'))

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: 'START' })
