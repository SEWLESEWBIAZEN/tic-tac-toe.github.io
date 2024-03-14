import React from 'react'
import Square from './Square';
import calculateWinner from './CalculateWinner';
const Board=({xIsNext, squares, onPlay})=> {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares)
	}
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = 'Winner: ' + winner;
  }else{
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }
	console.log(squares);
	return (
		<>
      <div className="status">{status}</div>
			<div className="board-row">
				<Square value={squares[0]} onClick={() => handleClick(0)} />
				<Square value={squares[1]} onClick={() => handleClick(1)} />
				<Square value={squares[2]} onClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onClick={() => handleClick(3)} />
				<Square value={squares[4]} onClick={() => handleClick(4)} />
				<Square value={squares[5]} onClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onClick={() => handleClick(6)} />
				<Square value={squares[7]} onClick={() => handleClick(7)} />
				<Square value={squares[8]} onClick={() => handleClick(8)} />
			</div>
		</>
	);
}
export default Board