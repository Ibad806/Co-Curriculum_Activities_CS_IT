import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Star } from 'lucide-react';

const AnimatedEventCard = ({ imageUrl, title, location, date, price, onBuyNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-500 hover:scale-105 hover:shadow-xl relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <motion.img
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBuyNow}
              >
                Buy Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="absolute top-2 right-2 z-10"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Star
          className={`w-6 h-6 cursor-pointer ${
            isFavorite ? 'text-yellow-400 fill-current' : 'text-white'
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        />
      </motion.div>
      <div className="px-6 py-4">
        <motion.div
          className="font-bold text-xl mb-2 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.div>
        <motion.p
          className="text-gray-600 text-base flex items-center mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <MapPin className="h-5 w-5 mr-2 text-red-500" />
          {location}
        </motion.p>
        <motion.p
          className="text-gray-600 text-base flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          {date}
        </motion.p>
        <motion.p
          className="text-gray-600 text-base flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          {price}
        </motion.p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <motion.div
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-center text-sm text-gray-600 mt-2">70% tickets sold</p>
      </div>
    </motion.div>
  );
};

export default AnimatedEventCard;
