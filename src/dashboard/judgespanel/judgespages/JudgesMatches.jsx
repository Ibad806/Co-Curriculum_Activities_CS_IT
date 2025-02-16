import React, { useState } from 'react';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

const RoundMatchPage = () => {
  // List of players for the first round (30 players)
  const [players, setPlayers] = useState([
    { id: 1, name: 'Ahmed', status: 'Active', round: 1 },
    { id: 2, name: 'Ibad', status: 'Active', round: 1 },
    { id: 3, name: 'Sarah', status: 'Active', round: 1 },
    { id: 4, name: 'Ali', status: 'Active', round: 1 },
    // Add more dummy players here as needed
    { id: 5, name: 'John', status: 'Active', round: 1 },
    { id: 6, name: 'Zara', status: 'Active', round: 1 },
    // Continue adding dummy players till you have 30
  ]);
  
  const [losers, setLosers] = useState([]);  // Players eliminated from round 1 but still in competition for later rounds
  const [round, setRound] = useState(1);

  const eliminatePlayer = (id) => {
    setPlayers(players.map(player => player.id === id ? { ...player, status: 'Eliminated' } : player));
    setLosers([...losers, players.find(player => player.id === id)]);
  };

  const recoverPlayer = (id) => {
    setPlayers(players.map(player => player.id === id ? { ...player, status: 'Active' } : player));
    setLosers(losers.filter(player => player.id !== id));
  };

  const nextRound = () => {
    setRound(round + 1);

    // Logic to move players from 'Active' to the next round or move them back to the losers bracket
    setPlayers(players.filter(player => player.status === 'Active').map(player => ({ ...player, round: round + 1 })));
    
    // Logic for Losers bracket, allowing recovery
    setLosers(losers.filter(player => player.status === 'Eliminated').map(player => ({ ...player, round: round + 1 })));
  };

  const submitFinalResult = () => {
    alert('Final result submitted.');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Round {round} - Match Results</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-4 border rounded-lg ${player.status === 'Eliminated' ? 'bg-gray-300' : 'bg-white'}`}
          >
            <h2 className="font-bold">{player.name}</h2>
            <p>Status: {player.status}</p>
            {player.status === 'Active' && (
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => eliminatePlayer(player.id)}
              >
                Eliminate
              </button>
            )}
            {player.status === 'Eliminated' && (
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                onClick={() => recoverPlayer(player.id)}
              >
                Recover
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <h2 className="text-xl font-semibold">Losers Bracket</h2>
        {losers.map((player) => (
          <div
            key={player.id}
            className="p-4 border rounded-lg bg-gray-200"
          >
            <h2 className="font-bold">{player.name}</h2>
            <p>Status: {player.status}</p>
            {player.status === 'Eliminated' && (
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                onClick={() => recoverPlayer(player.id)}
              >
                Recover
              </button>
            )}
          </div>
        ))}
      </div>

      {players.filter(player => player.status === 'Active').length === 1 && (
        <div className="mt-8">
          <button
            onClick={submitFinalResult}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Submit Final Result
          </button>
        </div>
      )}

      {players.filter(player => player.status === 'Active').length === 0 && (
        <div className="mt-8">
          <button
            onClick={nextRound}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Start Next Round
          </button>
        </div>
      )}
    </div>
  );
};

export default RoundMatchPage;
