import React, { Component } from 'react';
import './App.css';

import Status from './components/Status';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: null,
      winner: null,
      board : Array(9).fill(null)
    }
  }
checkWinner() {
  let winLines = 
  [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ]
    for (let index = 0; index < winLines.length; index++) {
      const [a,b,c] = winLines[index];
      if (this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[a] === this.state.board[c]) {
        alert('you won');
        this.setState({
          winner: this.state.player
        })
      }
    }
  }

  handleClick(index) {
    if(this.state.player && !this.state.winner) {
      let newBoard = this.state.board
      if(this.state.board[index] === null ) {
        newBoard[index] = this.state.player
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "0" : "X"
      })
      this.checkWinner()
    }
  }
}
setPlayer(player) {
  this.setState({ player })
}

renderBoxes() {
  return this.state.board.map(
    (box,index) => 
      <div className="box" key={index} 
        onClick={() => this.handleClick(index)}>
        {box} </div>
  )
}

reset() {
  this.setState ({
    player: null,
    winner: null,
    board : Array(9).fill(null)

  })
}

  //using {Box} means calling the value of Box 
  render () {
     
      return (
        <div className="container">
          <h1>Tic Tac Toe App</h1>
          <Status 
            player={this.state.player} 
            setPlayer={(e)=> { this.setPlayer(e) }}
            winner={this.state.winner}
          />
          <div className="board">
            {this.renderBoxes()}
          </div>
          <button disabled={!this.state.winner} onClick={() => this.reset()}>Reset</button>
        </div>
    );
  }
  }

export default App;
