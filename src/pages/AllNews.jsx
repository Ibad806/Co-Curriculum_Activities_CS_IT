import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(AppRoutes.news);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        setLoading(false);
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white text-black py-10 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">All News</h1>
            <p>Loading news...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white text-black py-10 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">All News</h1>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">All News</h1>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No news available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Link to={`/all-news/${item._id}`} key={item._id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {item.image && (
                      <img
                        src={`${AppRoutes.BASE_URL}${item.image}`}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                        }}
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {item.content}
                      </p>
                      <div className="mt-4 text-sm text-gray-400">
                        <p>{formatDate(item.date)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllNews;