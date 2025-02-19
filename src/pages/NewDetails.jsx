import React from "react";
import { useParams } from "react-router-dom";
import { newsData } from "../data";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = newsData.find((news) => news.id === parseInt(id));

  if (!newsItem) {
    return <div>News not found!</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-900 py-16 px-6 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* News Image */}
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-96 object-cover"
            />

            {/* News Content */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{newsItem.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{newsItem.description}</p>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Full Story</h2>
                <p className="text-base text-gray-700 mt-4">{newsItem.description}</p>
              </div>

              {/* Author Info */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                    <span className="text-lg font-bold text-gray-800">
                      {newsItem.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{newsItem.author}</p>
                    <p className="text-sm text-gray-500">{newsItem.date} • {newsItem.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
