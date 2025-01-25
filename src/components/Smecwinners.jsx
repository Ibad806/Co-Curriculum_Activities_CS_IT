import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { egameWinners, geekWinners, generalGameWinners } from '../data';
import SmecWinnerCard from "./Smecwinnercard";

const SmecWinners = () => {
  const [activeCategory, setActiveCategory] = useState('E-GAMING');
  const categories = {
    'E-GAMING': egameWinners,
    'GEEKS': geekWinners,
    'GENERAL GAMES': generalGameWinners
  };

  return (
    <section className="py-12 bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-wider">
          WINNERS '24
        </h2>
        <p className="text-sm sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          Hall of Fame: Celebrating Our Past Champions
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`py-2 px-4 text-lg sm:text-xl font-semibold rounded-lg ${activeCategory === category ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-yellow-400'}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <TransitionGroup>
        <CSSTransition key={activeCategory} timeout={500} classNames="fade">
          <SmecWinnerCard title={activeCategory} winners={categories[activeCategory]} />
        </CSSTransition>
      </TransitionGroup>
    </section>
  );
};

export default SmecWinners;
