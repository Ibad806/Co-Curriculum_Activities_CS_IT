import React, { useEffect, useState } from "react";
import smec_banner from "../assets/smecbanner.png";
import watch from "../assets/stopwatch-start.png";
import rightarrow from "../assets/rightarrow.png";
import { Link } from "react-router-dom";
import { AppRoutes } from "../constant/constant";
import axios from "axios";

const Availableevents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(AppRoutes.event);
        
        const eventsData = Array.isArray(response.data?.events) 
          ? response.data.events 
          : Array.isArray(response.data)
          ? response.data
          : [];
          
        setEvents(eventsData);
        
        const now = new Date();
        const upcomingEvents = eventsData.filter(event => 
          new Date(event.startdate) > now
        );
        
        const sortedEvents = [...upcomingEvents].sort((a, b) => 
          new Date(a.startdate) - new Date(b.startdate)
        );
        
        const nextUpcomingEvent = sortedEvents[0] || null;
        setNextEvent(nextUpcomingEvent);
        
        if (nextUpcomingEvent) {
          const diffTime = new Date(nextUpcomingEvent.startdate) - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysLeft(diffDays < 0 ? 0 : diffDays);
        }
      } catch (err) {
        setError("Failed to fetch events");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  console.log("Next Event:", nextEvent);
  
  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!nextEvent) return <div>No upcoming events found</div>;

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col relative py-[50px] rounded-[10px]">
        <h1 className="md:text-[40px] text-[20px]">Time is Running Out!</h1>
        <h2 className="md:text-[25px] text-[15px] py-[10px]">
          Explore event here.
        </h2>
        <div className="md:w-[75%] w-[90%] h-[400px] rounded-[25px] relative border">
          <img
            className="w-[100%] h-[100%] object-cover rounded-[10px]"
            src={nextEvent.bannerImage || smec_banner}
            alt="Event banner"
          />
          <div className="flex items-center justify-center absolute top-0 right-0 z-[10] bg-yellow-500 md:w-[30%] w-[40%] h-[12%] rounded-bl-[15px] md:p-4 p-1 text-white">
            <img className="w-[30px] px-1" src={watch} alt="timer" />
            <h6 className="md:text-[10px] text-[6px] font-bold">Time to start</h6>
            <h6 className="md:text-[10px] text-[6px] md:px-[8px] px-[3px] font-bold">:</h6>
            <h6 className="md:text-[10px] text-[6px] font-bold">{daysLeft} days</h6>
          </div>
          <div className="flex items-center absolute bottom-[-8%] z-[10] bg-[#EBEBF9] md:w-[68%] w-[100%] h-[15%] rounded-r-[100px] md:p-4 p-1">
            <h3 className="md:text-[25px] text-[12px] font-bold">{nextEvent.title}</h3>
            <h3 className="px-[10px] font-bold">|</h3>
            <div className="flex items-center justify-center flex-col gap-1">
              <h6 className="md:text-[15px] text-[6px] font-bold">Start Date</h6>
              <h6 className="md:text-[15px] text-[6px] font-bold">
                {new Date(nextEvent.startdate).toLocaleDateString()}
              </h6>
            </div>
            <h6 className="md:px-[10px] px-[6px] font-bold">→</h6>
            <div className="flex items-center justify-center flex-col gap-1">
              <h6 className="md:text-[15px] text-[6px] font-bold">End Date</h6>
              <h6 className="md:text-[15px] text-[6px] font-bold">
                {new Date(nextEvent.enddate).toLocaleDateString()}
              </h6>
            </div>
            <h3 className="md:px-[8px] px-[4px] font-bold">|</h3>
            {nextEvent.category === "Event" ? (
              <div className="flex items-center justify-center flex-col gap-1">
                <h6 className="md:text-[15px] text-[6px] font-bold">Registration Deadline</h6>
                <h6 className="md:text-[15px] text-[6px] font-bold">
                  {new Date(nextEvent.registrationDeadline).toLocaleDateString()}
                </h6>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col gap-1">
                <h6 className="md:text-[15px] text-[6px] font-bold">Category</h6>
                <h6 className="md:text-[15px] text-[6px] font-bold">{nextEvent.category}</h6>
              </div>
            )}            

            <div className="w-[50px] h-[50px] flex items-center justify-center absolute right-[5%]">
              <Link to={`/events/${nextEvent.customRoute || nextEvent._id}`} className="flex items-center justify-center">
                <div className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] flex items-center justify-center bg-black rounded-[50%]">
                  <img className="w-[20px] h-[20px]" src={rightarrow} alt="view event" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Availableevents;