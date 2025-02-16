import React, { useState } from 'react';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

const KnockoutGamePage = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Ahmed', status: 'Active' },
    { id: 2, name: 'Ibad', status: 'Active' },
    { id: 3, name: 'Sara', status: 'Active' },
    { id: 4, name: 'Ali', status: 'Active' },
    { id: 5, name: 'Khan', status: 'Active' },
    { id: 6, name: 'Zara', status: 'Active' },
    { id: 7, name: 'Usman', status: 'Active' },
    { id: 8, name: 'Faizan', status: 'Active' },
    { id: 9, name: 'Tariq', status: 'Active' },
    { id: 10, name: 'Ayesha', status: 'Active' },
    { id: 11, name: 'Bilal', status: 'Active' },
    { id: 12, name: 'Hassan', status: 'Active' },
    { id: 13, name: 'Samreen', status: 'Active' },
    { id: 14, name: 'Muneeb', status: 'Active' },
    { id: 15, name: 'Asim', status: 'Active' },
    { id: 16, name: 'Nashit', status: 'Active' },
    { id: 17, name: 'Hamza', status: 'Active' },
    { id: 18, name: 'Nazia', status: 'Active' },
    { id: 19, name: 'Sana', status: 'Active' },
    { id: 20, name: 'Shoaib', status: 'Active' },
    { id: 21, name: 'Rida', status: 'Active' },
    { id: 22, name: 'Ahmed', status: 'Active' },
    { id: 23, name: 'Mariam', status: 'Active' },
    { id: 24, name: 'Arslan', status: 'Active' },
    { id: 25, name: 'Bilal', status: 'Active' },
    { id: 26, name: 'Fahad', status: 'Active' },
    { id: 27, name: 'Hassan', status: 'Active' },
    { id: 28, name: 'Areeba', status: 'Active' },
    { id: 29, name: 'Sahab', status: 'Active' },
    { id: 30, name: 'Rashid', status: 'Active' },
  ]);

  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const eliminatePlayer = (id) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    const eliminatedPlayer = players.find((player) => player.id === id);
    setEliminatedPlayers((prev) => [...prev, eliminatedPlayer]);
    setPlayers(updatedPlayers);
  };

  const recoverPlayer = (id) => {
    const recoveredPlayer = eliminatedPlayers.find((player) => player.id === id);
    const updatedEliminatedPlayers = eliminatedPlayers.filter((player) => player.id !== id);
    setEliminatedPlayers(updatedEliminatedPlayers);
    setPlayers((prev) => [...prev, recoveredPlayer]);
  };

  const submitFinalResult = () => {
    const winner = players[0];
    const runnerUp = eliminatedPlayers[eliminatedPlayers.length - 1];
    setFinalResult({ winner, runnerUp });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Knockout Game</h1>
      
      {/* Players */}
      <div className="grid grid-cols-2 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-4 border rounded-lg flex justify-between items-center ${player.status === 'Active' ? 'bg-green-100' : 'bg-gray-200'}`}
          >
            <span>{player.name}</span>
            {players.length > 1 && player.status === 'Active' && (
              <button
                className="text-red-500"
                onClick={() => eliminatePlayer(player.id)}
              >
                Eliminate
              </button>
            )}
            {finalResult && player.id === players[0].id && (
              <span className="ml-2 text-lg font-bold text-green-600">Winner</span>
            )}
          </div>
        ))}
      </div>

      {/* Eliminated Players */}
      <h2 className="text-lg font-semibold mt-6">Eliminated Players</h2>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {eliminatedPlayers.map((player) => (
          <div
            key={player.id}
            className="p-4 border rounded-lg flex justify-between items-center bg-gray-200"
          >
            <span>{player.name}</span>
            <button
              className="text-blue-500"
              onClick={() => recoverPlayer(player.id)}
            >
              Recover
            </button>
            {eliminatedPlayers.length === players.length - 1 && player.status !== 'Active' && (
              <span className="ml-2 text-lg font-bold text-yellow-600">Runner Up</span>
            )}
          </div>
        ))}
      </div>

      {/* Submit Final Result Button */}
      {players.length === 1 && (
        <button
          className="mt-6 p-2 bg-blue-500 text-white rounded-lg"
          onClick={submitFinalResult}
        >
          Submit Final Result
        </button>
      )}

      {/* Final Result Modal */}
      {finalResult && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Final Result</h2>
            <p className="text-lg">
              <span className="font-semibold">Winner: </span>{finalResult.winner.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Runner-up: </span>{finalResult.runnerUp.name}
            </p>
            <button
              className="mt-4 p-2 bg-green-500 text-white rounded-lg"
              onClick={() => setFinalResult(null)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnockoutGamePage;
