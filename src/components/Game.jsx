import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[currentMove];

  useEffect(() => {
    if (!xIsNext) {
      // If it's AI's turn
      const timer = setTimeout(makeAIMove, 10); // Add a delay to make AI move visible
      return () => clearTimeout(timer);
    }
  }, [currentMove, xIsNext]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function makeAIMove() {
    // Implement minimax algorithm to determine AI move
    // For now, let's make a random move
    const availableMoves = currentSquares.reduce((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, []);

    const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const nextSquares = currentSquares.slice();
    nextSquares[randomIndex] = xIsNext ? 'X' : 'O';
    handlePlay(nextSquares);
  }

  const moves = history.map((squares, move) => {
    const description = move ? 'Go to move #' + move : 'Go to game start';
    if(!(squares.map((square)=>{
        return square===null
    }))){
        squares=Array(9).fill(null)
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
