import React from "react";
import "./events.css";
import event from "../../data";

const Events = () => {
  return (
    <>
      <div className="bg-blue-500">
        <div className="avlbl-event">
          <h5>Available Eves</h5>
          <h6 className="bg-red-500">Explore Events here</h6>
        </div>
        <div className="cards">
          {event.map((data, index) => {
            return (
              <div key={index} className="card">
                {data.price}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Events;
