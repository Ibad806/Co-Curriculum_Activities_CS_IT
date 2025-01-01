import dottedline from "../assets/dotted.png";
import date from "../assets/date.png";
import bill from "../assets/bill.png";
import events from "../assets/events.png";
import ticket from "../assets/ticket.png";

export default function TicketSteps() {
  return (
    <div className="w-full flex mx-auto md:p-10 p-5 bg-purple-50 flex-col md:flex-row my-[70px]">
      {/* Left content */}
      <div className="md:w-[30%] pt-5 w-[100%]">
        <h2 className="md:text-[30px] text-[18px]">4 Easy Steps to buy a Ticket!</h2>
        <h6 className="md:py-8 py-5 text-[15px] leading-[18px]">Get Familiar with our 4 easy working process</h6>
        <button className="button1">Buy Ticket →</button>
      </div>
      {/* Right content */}
      <div className="md:w-[70%] py-7 w-[100%] flex md:flex-row flex-col items-center justify-center relative gap-[10px] md:gap-[19px]">
        {/* Dotted Line - Hidden on mobile */}
        <img
          src={dottedline}
          alt=""
          className="absolute object-cover w-[100%] hidden md:block"
        />
        {/* Step 1 */}
        <div className="w-full md:w-[20%] flex items-center justify-center flex-col mb-5">
          <img src={date} className="w-[50%] md:w-[7vw] object-cover" />
          <p className="text-center text-[14px] md:text-[1vw] leading-[1.5]">
            You can see event tickets on our website and check which one is good
            for you.
          </p>
        </div>
        {/* Step 2 */}
        <div className="w-full md:w-[20%] flex items-center justify-center flex-col mb-5">
          <img src={events} className="w-[50%] md:w-[7vw] object-cover" />
          <p className="text-center text-[14px] md:text-[1vw] leading-[1.5]">
            You can see event tickets on our website and check which one is good
            for you.
          </p>
        </div>
        {/* Step 3 */}
        <div className="w-full md:w-[20%] flex items-center justify-center flex-col mb-5">
          <img src={bill} className="w-[50%] md:w-[7vw] object-cover" />
          <p className="text-center text-[14px] md:text-[1vw] leading-[1.5]">
            You can see event tickets on our website and check which one is good
            for you.
          </p>
        </div>
        {/* Step 4 */}
        <div className="w-full md:w-[20%] flex items-center justify-center flex-col mb-5">
          <img src={ticket} className="w-[50%] md:w-[7vw] object-cover" />
          <p className="text-center text-[14px] md:text-[1vw] leading-[1.5]">
            You can see event tickets on our website and check which one is good
            for you.
          </p>
        </div>
      </div>
    </div>
  );
}
