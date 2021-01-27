import React from 'react'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      whoWon: null,
      totalWinX: 0,
      totalWinO: 0,
    }
  }

  handleClick = e => {
    let field = this.state.squares
    let clickedItem = +e.target.getAttribute('data-idx')

    if(field[clickedItem] === null){
      field[clickedItem] = this.state.count % 2 === 0 ? 'X' : 'O'
      this.setState({
        squares: field,
        count: this.state.count + 1
      })
    } else {
      alert('ячейка занята!')
    }
    this.isWinner()
    this.isTie()
  }

  isWinner = () => {
    let clickedItem = this.state.count % 2 === 0 ? 'X' : 'O'
    let winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let i = 0; i < 8; i++){
      let line = winnerLines[i]
      if( this.state.squares[line[0]] === clickedItem && 
          this.state.squares[line[1]] === clickedItem &&
          this.state.squares[line[2]] === clickedItem) {
            setTimeout(()=> {
              if(clickedItem === 'X'){
                this.setState({
                  whoWon: clickedItem,
                  totalWinX: this.state.totalWinX + 1
                })
              } else {
                this.setState({
                  whoWon: clickedItem,
                  totalWinO: this.state.totalWinO + 1
                })
              }
            }, 0)
          }
    }
  }

  isTie = () => {
    setTimeout(()=> {
      if(this.state.count === 9 && this.state.whoWon === null){
        this.setState({
          whoWon: 'Tie Game!'
        })
      }
    },100)
  }

  newGame = () => {
    this.setState({
      squares: Array(9).fill(null),
      count: 0,
      whoWon: null
    })
  }

  render() {
    let endGameBlock
    let won
    if(this.state.whoWon){
      endGameBlock = (
        <div className="endGame">
          <button onClick={this.newGame}>New Game</button>
        </div>
      )  
    }
    if(this.state.whoWon){
      won = <div className="won">{this.state.whoWon === 'Tie Game!' ? 'Tie Game!' : this.state.whoWon + ' WON!'}</div>
    }

    return (
      <div className="App">
        <div className="header">
          <h1>Tik-Tak-Toe React</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          {won}
          <div className="total">Total: <br/>X:{this.state.totalWinX} -vs- O:{this.state.totalWinO}</div>
          <ul>
            {endGameBlock}
            {
              this.state.squares.map((sq, idx) => {
                return(
                  <li 
                    key={idx} 
                    data-idx={idx} 
                    onClick={this.handleClick}
                    className="square"
                  > {sq}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
  
}

export default App
