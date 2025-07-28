import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';
import { FaTrophy, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JudgesHome = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [winner, setWinner] = useState('');
  const [runnerUp, setRunnerUp] = useState('');
  const [loading, setLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/judgespanel/judge-login');
      return;
    }

    const fetchAssignedGames = async () => {
      try {
        const response = await axios.get(`${AppRoutes.judgePanel}/assigned-games`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setGames(response.data.games || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        if (error.response?.status === 401) {
          navigate('/judgespanel/judge-login');
        } else {
          setError('Failed to load games. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchAssignedGames();
  }, [navigate]);

  const handleAnnounceResult = (game) => {
    setSelectedGame(game);
    setShowResultModal(true);
  };

  const submitResult = async () => {
    if (!winner || !runnerUp) {
      setError('Both winner and runner up are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${AppRoutes.judgePanel}/announce-result/${selectedGame.game._id}`, 
        { winner, runnerUp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setGames(games.map(game => 
        game.game._id === selectedGame.game._id 
          ? { 
              ...game, 
              status: 'completed',
              result: { winner, runnerUp, announcedAt: new Date() }
            } 
          : game
      ));

      setShowResultModal(false);
      setWinner('');
      setRunnerUp('');
      setError('');
    } catch (error) {
      console.error('Error announcing result:', error);
      setError(error.response?.data?.message || 'Failed to announce result');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/judgespanel/judge-login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Judge Dashboard
            </h1>
            <p className="mt-2 text-xl text-gray-600">
              Manage your assigned games and announce results
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mt-12">
          {games.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No games assigned</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't been assigned to any games yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((assignment, index) => (
                <div 
                  key={index} 
                  className="bg-white overflow-hidden shadow rounded-lg transition-all hover:shadow-xl"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {assignment.game.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        assignment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2 text-purple-500" />
                        <span>{assignment.game.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-2 text-purple-500" />
                        <span>{assignment.game.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2 text-purple-500" />
                        <span>{assignment.game.venue}</span>
                      </div>
                    </div>
                    
                    {assignment.status === 'completed' && assignment.result && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Results</h4>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <FaTrophy className="text-yellow-500 mr-2" />
                            <span className="text-sm">Winner: {assignment.result.winner}</span>
                          </div>
                          <div className="text-sm">Runner Up: {assignment.result.runnerUp}</div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Announced at: {new Date(assignment.result.announcedAt).toLocaleString()}
                        </div>
                      </div>
                    )}
                    
                    {assignment.status === 'pending' && (
                      <button
                        onClick={() => handleAnnounceResult(assignment)}
                        className="mt-6 w-full bg-purple-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Announce Result
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result Announcement Modal */}
      {showResultModal && selectedGame && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Announce Result for {selectedGame.game.title}
                </h3>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="winner" className="block text-sm font-medium text-gray-700">
                      Winner
                    </label>
                    <input
                      type="text"
                      id="winner"
                      value={winner}
                      onChange={(e) => setWinner(e.target.value)}
                      className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="Enter winner name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="runnerUp" className="block text-sm font-medium text-gray-700">
                      Runner Up
                    </label>
                    <input
                      type="text"
                      id="runnerUp"
                      value={runnerUp}
                      onChange={(e) => setRunnerUp(e.target.value)}
                      className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="Enter runner up name"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={submitResult}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit Result
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResultModal(false);
                    setError('');
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgesHome;