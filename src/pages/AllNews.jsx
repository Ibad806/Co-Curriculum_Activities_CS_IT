import React from "react";
import { newsData } from "../data";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AllNews = () => {
    console.log(newsData);
    
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white text-black py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">All News</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{news.description}</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>{news.author}</p>
                  <p>{news.date} • {news.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AllNews;
