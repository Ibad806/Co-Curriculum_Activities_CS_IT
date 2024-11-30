import React from "react";
import h from "../assets/h.png";

const Gamecard = ({
  title,
  image,
  gamedesc,
  date,
  time,
  winprice,
  playerslot,
}) => {
  return (
    <>
      <div className="bg-[#313231] md:h-[380px] h-[300px] rounded-[10px]">
        <img
          className="w-full h-[43%] object-cover p-[0.7vw] rounded-[15px]"
          src={image}
          alt="Game Card"
        />
        <div className="text-white px-[0.7vw]">
          <h6 className="py-[0.8vw] text-[1vw]">
            {date}, <span className="text-white">{time}</span>
          </h6>
          <h5 className="text-[1.5vw] font-bold pb-[0.7vw]">{title}</h5>
          <h6 className="pb-[2.5px] text-[1vw] line-clamp-2 overflow-hidden text-ellipsis">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit uhbibulk
            ,nkn jn kj jh jhbjbjbjbkbjhbkjbbjh k iuiu
          </h6>
          <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-[1vw] text-[#141716] text-[1vw]">Win Price</h6>
              <div className="flex items-center justify-between gap-[0.3vw]">
                <img
                  className="w-[2vw]"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHCAcHBwcHBwcHBwoGBwcHCA8ICQcKIBEWFiARExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NFSsZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAATER/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEHBf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANHVBkLtKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAARSAAAAoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKgAAIAAAAABFSKAACgACiCCgIKAgoCCoAAAAAKgAAACiBQAAEAAAAAAikAAAUAFAQEVAAFAABFQAAAABFQBZqLNBaFEEoUUAAQAAAAABUUAAFABQEBFQABQAARUAAAAARUAWaizQWhRBAooAAgAAAAACpFAABQAUBARUAAUAAEVAAAAAEVAFmos0FoUQSi1FAAEAAAAABYEAAAUAFAQEVKAAoAAIqAAAAAIqALNRZoLQoglCigACAAAAAARUigAAoAKAgIqAAKAACKgAAAACKgCzUWaC0KIJQooAAgAAAAALBFAABQAUQQVAAAAAA4cADhwAOHAA4cADhwFCgIJQFAAEAAAAAAVFAABRAFEAUQBRAFEAUQBRAFEAUQBRAFEAVAAABAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFQAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
                  alt=""
                />
                <h6>{winprice}</h6>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-[1vw] text-[#141716] text-[1.2vw]">
                Player Slot
              </h6>
              <div className="flex items-center justify-between gap-[0.3vw]">
                <img
                  className="w-[2vw]"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHCAcHBwcHBwcHBwoGBwcHCA8ICQcKIBEWFiARExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NFSsZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAATER/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEHBf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANHVBkLtKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAARSAAAAoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKgAAIAAAAABFSKAACgACiCCgIKAgoCCoAAAAAKgAAACiBQAAEAAAAAAikAAAUAFAQEVAAFAABFQAAAABFQBZqLNBaFEEoUUAAQAAAAABUUAAFABQEBFQABQAARUAAAAARUAWaizQWhRBAooAAgAAAAACpFAABQAUBARUAAUAAEVAAAAAEVAFmos0FoUQSi1FAAEAAAAABYEAAAUAFAQEVKAAoAAIqAAAAAIqALNRZoLQoglCigACAAAAAARUigAAoAKAgIqAAKAACKgAAAACKgCzUWaC0KIJQooAAgAAAAALBFAABQAUQQVAAAAAA4cADhwAOHAA4cADhwFCgIJQFAAEAAAAAAVFAABRAFEAUQBRAFEAUQBRAFEAUQBRAFEAVAAABAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFQAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
                  alt=""
                />
                <h6>{playerslot}</h6>
              </div>
            </div>
            {/* <div className="w-[3vw] h-[3vw] rounded-full bg-[#6B00D6] flex items-center justify-center">
                <h6>Buy</h6>
            </div> */}
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-[1vw] text-[#141716]">Buy</h6>
              <div className="w-[4vw] h-[4vw] rounded-full bg-[#6B00D6] flex items-center justify-center cursor-pointer">
                <h6>→</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gamecard;
