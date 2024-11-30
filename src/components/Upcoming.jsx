import React from 'react';
import AnimatedEventCard from './AnimatedEventCard';

function Upcoming() {
  const handleBuyNow = () => {
    alert('Buy Now clicked!');
  };

  const events = [
    {
      imageUrl: "https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0",
      title: "Summer Music Festival",
      location: "Central Park, New York",
      date: "August 15-17, 2023",
      price: "100$",
    },
    {
      imageUrl: "https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0",
      title: "Tech Innovation Conference",
      location: "Silicon Valley, California",
      date: "September 5-7, 2023",
      price: "134$",
    },
    {
      imageUrl: "https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0",
      title: "International Food Expo",
      location: "Paris, France",
      date: "October 10-12, 2023",
      price: "167$",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <AnimatedEventCard
              key={index}
              imageUrl={event.imageUrl}
              title={event.title}
              location={event.location}
              date={event.date}
              price={event.price}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
