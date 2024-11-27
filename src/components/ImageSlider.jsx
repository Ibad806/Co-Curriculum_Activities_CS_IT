
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
    'https://media.licdn.com/dms/image/v2/D4D0BAQHBgWvpjFKFoA/company-logo_200_200/company-logo_200_200/0/1701371739326?e=1740614400&v=beta&t=oWycWdM29ZnyWV-jBEdYk2d8hNgvZ_8zbhU6SJ7sKeI',
    'https://th.bing.com/th/id/OIP.hiuKBeYqWj1SftIkeadkkgHaHa?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/OIP.voLVMJX4Uka6I99CIPCv6QHaE8?w=2560&h=1707&rs=1&pid=ImgDetMain',
    'https://live.staticflickr.com/65535/49049007453_c0c4b272ca_o.jpg',
  ]

const ImageSlider = ({ images, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [currentIndex, autoPlayInterval])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          className="object-cover w-full h-64 md:h-96"
          alt={`Slide ${currentIndex + 1}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) {
              handlePrevious()
            } else if (info.offset.x < -100) {
              handleNext()
            }
          }}
        />
      </AnimatePresence>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
        onClick={handlePrevious}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
        onClick={handleNext}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
