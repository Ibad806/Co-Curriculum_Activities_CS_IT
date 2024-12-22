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
      <div className="bg-[#313231] md:h-[390px] h-[380px] rounded-[10px] w-80">
        <img
          className="w-full h-[48%] object-cover p-2 rounded-[15px]"
          src={h}
          alt="Game Card"
        />
        <div className="text-white px-3">
          <h6 className="py-3 text-sm">
            {date}, <span className="text-white">{time}</span>
          </h6>
          <h5 className="py-1 text-lg font-bold">{title}</h5>
          <h6 className="pb-1 text-sm line-clamp-2 overflow-hidden text-ellipsis">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit uhb lkajsdhfl ljksdhlkjh lkjdh
          </h6>
          <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-2 text-[#141716] text-sm">Win Price</h6>
              <div className="flex items-center justify-between gap-[0.3vw]">
                <img
                  className="w-8"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHCAcHBwcHBwcHBwoGBwcHCA8ICQcKIBEWFiARExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NFSsZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAATER/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEHBf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANHVBkLtKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAARSAAAAoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKgAAIAAAAABFSKAACgACiCCgIKAgoCCoAAAAAKgAAACiBQAAEAAAAAAikAAAUAFAQEVAAFAABFQAAAABFQBZqLNBaFEEoUUAAQAAAAABUUAAFABQEBFQABQAARUAAAAARUAWaizQWhRBAooAAgAAAAACpFAABQAUBARUAAUAAEVAAAAAEVAFmos0FoUQSi1FAAEAAAAABYEAAAUAFAQEVKAAoAAIqAAAAAIqALNRZoLQoglCigACAAAAAARUigAAoAKAgIqAAKAACKgAAAACKgCzUWaC0KIJQooAAgAAAAALBFAABQAUQQVAAAAAA4cADhwAOHAA4cADhwFCgIJQFAAEAAAAAAVFAABRAFEAUQBRAFEAUQBRAFEAUQBRAFEAVAAABAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFQAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
                  alt=""
                />
                <h6>{winprice}</h6>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-2 text-[#141716] text-sm">
                Player Slot
              </h6>
              <div className="flex items-center justify-between gap-1">
                <img
                  className="w-8"
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
              <h6 className="pt-2 text-sm">Buy</h6>
              <div className="w-9 h-9 rounded-full bg-[#6B00D6] flex items-center justify-center cursor-pointer">
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