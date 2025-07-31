import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrophy, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaSpinner, FaGamepad } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../constant/constant';

const JudgesHome = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/judgespanel/judge-login');
  };

  const handleViewPlayers = (gameId, gameTitle) => {
    navigate(`/judgespanel/playerlist/${gameId}`, { 
      state: { gameTitle } 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-purple-600 mx-auto mb-4" />
          <p className="text-xl text-purple-800 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Judge Dashboard
            </h1>
            <p className="mt-2 text-xl text-purple-700 max-w-2xl">
              Welcome to your tournament management hub. Manage your assigned games and players.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center"
          >
            Logout
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{games.length}</p>
                <p className="opacity-80 mt-1">Assigned Games</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FaGamepad className="text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">
                  {games.reduce((total, game) => total + (game.game?.participants?.length || 0), 0)}
                </p>
                <p className="opacity-80 mt-1">Total Players</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FaUsers className="text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">
                  {games.filter(g => g.status === 'completed').length}
                </p>
                <p className="opacity-80 mt-1">Completed Events</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FaTrophy className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mt-12">
          {games.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <FaGamepad className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No games assigned yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                You haven't been assigned to any games. Please contact the administrator for assignments.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaGamepad className="mr-3 text-purple-600" />
                Your Assigned Games
              </h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {games.map((assignment, index) => (
                  <div 
                    key={index} 
                    className={`bg-white overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border-l-4 ${
                      assignment.status === 'completed' 
                        ? 'border-green-500 hover:-translate-y-1' 
                        : 'border-purple-500 hover:-translate-y-2'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {assignment.game.title}
                          </h3>
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            assignment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {assignment.status === 'completed' ? 'Completed' : 'Active'}
                          </span>
                        </div>
                        <div className="bg-purple-100 text-purple-800 p-2 rounded-lg">
                          <span className="font-bold">
                            {assignment.game.participants?.length || 0}
                          </span> players
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-gray-600">
                          <FaCalendarAlt className="mr-3 text-purple-500 min-w-[16px]" />
                          <span>{assignment.game.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-3 text-purple-500 min-w-[16px]" />
                          <span>{assignment.game.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-3 text-purple-500 min-w-[16px]" />
                          <span className="truncate">{assignment.game.venue}</span>
                        </div>
                      </div>
                      
                      {assignment.status === 'completed' && assignment.result && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Results</h4>
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <FaTrophy className="text-yellow-500 mr-2" />
                              <span className="text-sm font-medium">Winner: {assignment.result.winner}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <button
                          onClick={() => handleViewPlayers(assignment.game._id, assignment.game.title)}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transform hover:scale-[1.02] transition duration-300"
                        >
                          View Players & Announce Results
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Tournament Management System</p>
          <p className="mt-1 text-sm">Designed exclusively for tournament judges</p>
        </div>
      </div>
    </div>
  );
};

export default JudgesHome;