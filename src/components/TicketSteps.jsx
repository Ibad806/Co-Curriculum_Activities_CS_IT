import dottedline from "../assets/dotted.png";
import date from "../assets/date.png";
import bill from "../assets/bill.png";
import events from "../assets/events.png";
import ticket from "../assets/ticket.png";

export default function TicketSteps() {
  return (
    <div className="w-full flex mx-auto md:p-10 p-5 bg-purple-50 flex-col md:flex-row">
      {/* Left content */}
      <div className="md:w-[30%] pt-5 w-[100%]">
        <h3 className="md:text-[30px] text-[18px]">4 Easy Steps to buy a Ticket!</h3>
        <h6 className="md:py-8 py-5 text-[15px] leading-[18px]">Get Familiar with our 4 easy working process</h6>
        <button className="button1">Buy Ticket →</button>
      </div>
      {/* right content */}
      <div className="md:w-[70%] py-7 w-[100%] flex items-center justify-center relative gap-[19px]">
        <img
          src={dottedline}
          alt=""
          className="absolute object-cover w-[100%]"
        />
        <div className="w-[20%] flex items-center justify-center flex-col mb-[3vw]">
          <img src={events} className="md:w-[85px] w-[30px] object-cover" />
          <p className="text-center md:text-[13px] text-[5px] md:leading-[18px] leading-[7px]">
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
