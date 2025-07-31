import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrophy, FaCrown, FaMedal, FaCheck, FaSpinner } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../constant/constant';
import { toast } from 'react-toastify';

const JudgePlayerlist = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [gameTitle, setGameTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [runnerUp, setRunnerUp] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (location.state?.gameTitle) {
          setGameTitle(location.state.gameTitle);
        }
        
        const playersRes = await axios.get(
          `${AppRoutes.judgePanel}/games/${gameId}/players`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setPlayers(playersRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        toast.error('Failed to load player data');
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId, location.state]);

  const handleSetWinner = (playerId) => {
    if (winner === playerId) {
      setWinner(null);
    } else {
      setWinner(playerId);
    }
  };

  const handleSetRunnerUp = (playerId) => {
    if (runnerUp === playerId) {
      setRunnerUp(null);
    } else {
      setRunnerUp(playerId);
    }
  };

  const handleSubmitResults = async () => {
    if (!winner) {
      toast.error('Please select a winner');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${AppRoutes.judgePanel}/games/${gameId}/results`, 
        { winner, runnerUp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Results announced successfully!');
      navigate('/judgespanel/judge-dashboard');
    } catch (error) {
      console.error('Error announcing results:', error);
      toast.error(error.response?.data?.message || 'Failed to announce results');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/judgespanel/judge-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {gameTitle || 'Game'} Players
            </h1>
            <p className="mt-2 text-xl text-purple-600">
              Select winners for the tournament
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/judgespanel/judge-dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <FaSpinner className="animate-spin text-4xl text-purple-600" />
            </div>
          ) : players.length > 0 ? (
            players.map((player) => (
              <div 
                key={player._id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 ${
                  winner === player._id 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : runnerUp === player._id 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-white'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                      <p className="text-gray-600 mt-1">{player.email || 'No email provided'}</p>
                    </div>
                    <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-600">
                        {player.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">CNIC</p>
                      <p className="font-medium">{player.cnic}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{player.phone}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => handleSetWinner(player._id)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center ${
                        winner === player._id
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FaTrophy className="mr-2" />
                      Winner
                    </button>
                    <button
                      onClick={() => handleSetRunnerUp(player._id)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center ${
                        runnerUp === player._id
                          ? 'bg-gray-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FaMedal className="mr-2" />
                      Runner Up
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600">No players registered for this game</p>
            </div>
          )}
        </div>

        {players.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Winners</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${winner ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50'}`}>
                <div className="flex items-center">
                  <FaCrown className={`text-2xl mr-3 ${winner ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <h3 className="text-lg font-bold">Winner</h3>
                </div>
                {winner ? (
                  <div className="mt-2 ml-9">
                    <p className="font-bold text-xl">
                      {players.find(p => p._id === winner)?.name}
                    </p>
                    <p className="text-gray-600">
                      {players.find(p => p._id === winner)?.cnic}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 ml-9 text-gray-500">Not selected yet</p>
                )}
              </div>
              
              <div className={`p-4 rounded-lg ${runnerUp ? 'bg-gray-100 border-2 border-gray-300' : 'bg-gray-50'}`}>
                <div className="flex items-center">
                  <FaMedal className={`text-2xl mr-3 ${runnerUp ? 'text-gray-500' : 'text-gray-400'}`} />
                  <h3 className="text-lg font-bold">Runner Up</h3>
                </div>
                {runnerUp ? (
                  <div className="mt-2 ml-9">
                    <p className="font-bold text-xl">
                      {players.find(p => p._id === runnerUp)?.name}
                    </p>
                    <p className="text-gray-600">
                      {players.find(p => p._id === runnerUp)?.cnic}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 ml-9 text-gray-500">Not selected yet</p>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowConfirmation(true)}
                disabled={!winner}
                className={`px-8 py-3 rounded-lg font-bold text-lg flex items-center ${
                  winner 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105 transition duration-300' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaCheck className="mr-2" />
                Announce Results
              </button>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Results</h3>
              
              <div className="mb-6">
                <p className="font-bold text-purple-700 mb-2">Winner:</p>
                <p className="text-xl font-bold">
                  {players.find(p => p._id === winner)?.name}
                </p>
              </div>
              
              {runnerUp && (
                <div className="mb-6">
                  <p className="font-bold text-gray-700 mb-2">Runner Up:</p>
                  <p className="text-lg">
                    {players.find(p => p._id === runnerUp)?.name}
                  </p>
                </div>
              )}
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to announce these results? This action cannot be undone.
              </p>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitResults}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center transition"
                >
                  <FaCheck className="mr-2" />
                  Confirm Announcement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgePlayerlist;