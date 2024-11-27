import dottedline from "../assets/dotted.png"
import date from "../assets/date.png"
import bill from "../assets/bill.png"
import events from "../assets/events.png"
import ticket from "../assets/ticket.png"

export default function TicketSteps() {
    return (
        <div className="w-full flex mx-auto p-36 bg-purple-50">
            <div className="max-w-xl mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    4 Easy Steps To Buy a Ticket!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Get Familiar with our 4 easy working process
                </p>
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
                >
                    Buy Ticket
                </button>
            </div>

            <div className="w-full">
                <div className='absolute z-10'>
                    <img
                        src={dottedline}
                        alt=""
                        className='h-72'
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-11 py-1  ">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center pl-7">
                        {/* <div className="w-32 h-32 mb-6 relative"> */}
                            <div className="w-28 h-28 mb-6 relative rounded-full shadow-lg flex items-center justify-center">
                                <img
                                    src={events}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        {/* </div> */}
                        <h3 className="text-xl font-semibold text-gray-900">
                            Choose A Event
                        </h3>
                        <p className="text-gray-600 w-48">
                            You can see event tickets in our website and check which one is good for you.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center pl-3">
                            <div className="w-28 h-28 mb-6 relative rounded-full shadow-lg flex items-center justify-center">
                                <img
                                    src={date}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                        Choose Date & Time
                        </h3>
                        <p className="text-gray-600 w-48">
                        You Can check date and time of your favorite event in our website
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                            <div className="w-28 h-28 mb-6 relative rounded-full shadow-lg flex items-center justify-center">
                                <img
                                    src={bill}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                        Pay Your Bill
                        </h3>
                        <p className="text-gray-600 w-48">
                        After choosing your date and time and your preferred seat you can pay ticket online
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center pr-3">
                            <div className="w-28 h-28 mb-6  relative rounded-full shadow-lg flex items-center justify-center">
                                <img
                                    src={ticket}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                        Download Your Ticket!
                        </h3>
                        <p className="text-gray-600 w-48">
                        After completing checkout process you can download your ticket and get ready for concert
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

