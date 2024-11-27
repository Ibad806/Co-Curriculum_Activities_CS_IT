import dottedline from "../assets/dotted.png";
import date from "../assets/date.png";
import bill from "../assets/bill.png";
import events from "../assets/events.png";
import ticket from "../assets/ticket.png";

export default function TicketSteps() {
  return (
    <div className="w-full flex mx-auto p-[4vw] bg-purple-50 flex-col md:flex-row">
      {/* Left content */}
      <div className="md:w-[30%] pt-[7vw] w-[100%]">
        <h3>4 Easy Steps to buy a Ticket!</h3>
        <h6 className="py-[2vw]">Get Familiar with our 4 easy working process</h6>
        <button className="button1">Buy Ticket →</button>
      </div>
      {/* right content */}
      <div className="md:w-[70%] py-[10vw] w-[100%] flex items-center justify-center relative gap-[1.5vw]">
        <img
          src={dottedline}
          alt=""
          className="absolute object-cover w-[100%]"
        />
        <div className="w-[20%] flex items-center justify-center flex-col mb-[3vw]">
          <img src={events} className="w-[7vw] object-cover" />
          <p className="text-center text-[1vw] leading-[1.3vw]">
            You can see event tickets in our website and check which one is good
            for you.
          </p>
        </div>
        <div className="w-[20%] flex items-center justify-center flex-col mb-[3vw]">
          <img src={date} className="w-[7vw] object-cover" />
          <p className="text-center text-[1vw] leading-[1.3vw]">
            You can see event tickets in our website and check which one is good
            for you.
          </p>
        </div>
        <div className="w-[20%] flex items-center justify-center flex-col mb-[3vw]">
          <img src={bill} className="w-[7vw] object-cover" />
          <p className="text-center text-[1vw] leading-[1.3vw]">
            You can see event tickets in our website and check which one is good
            for you.
          </p>
        </div>
        <div className="w-[20%] flex items-center justify-center flex-col mb-[3vw]">
          <img src={ticket} className="w-[7vw] object-cover" />
          <p className="text-center text-[1vw] leading-[1.3vw]">
            You can see event tickets in our website and check which one is good
            for you.
          </p>
        </div>
      </div>
    </div>
  );
}
