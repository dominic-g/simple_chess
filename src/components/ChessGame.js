import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [fen, setFen] = useState('start');
  const [game, setGame] = useState(null);

  useEffect(() => {
    setGame(new Chess());
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move != null) {
        console.log(move);
        setFen(game.fen());

        // Make computer move
        setTimeout(() => {
          const moves = game.moves();
          if (moves.length > 0) {
            const aiMove = moves[Math.floor(Math.random() * moves.length)];
            game.move(aiMove);
            setFen(game.fen());
          }
        }, 300); // Add a delay for better user experience
      }
    } catch (error) {
      console.error('Invalid move:', error.message);
      // Handle the error here, such as displaying a message to the user
    }
  };

  return game ? (
    <Chessboard position={fen} onDrop={onDrop} />
  ) : (
    <div>Loading...</div>
  );
};

export default ChessGame;

