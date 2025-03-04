import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectGame } from "../redux/gameSlice";
import trophy from "../assets/trophy.png";
import vs from "../assets/vs.png";
import arrow from "../assets/Buy Arrow.png";

const Gamecard = ({
  title,
  image,
  gamedesc,
  date,
  time,
  price,
  playerslot,
  category,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(
      selectGame({
        title,
        image,
        gamedesc,
        date,
        time,
        price,
        playerslot,
      })
    );
    navigate(`/smec/${category}/${title}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#313231] w-full max-w-[90%] md:max-w-[400px] lg:max-w-[500px] rounded-[15px] h-auto mx-auto shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
    >
      {/* Game Image */}
      <div className="p-2">
        <img
          className="w-full h-[200px] md:h-[220px] object-cover rounded-[10px]"
          src={image}
          alt={title}
        />
      </div>

      {/* Game Details */}
      <div className="text-white px-4 py-2">
        <p className="text-sm text-[#9A9A9A]">
          {date}, <span>{time}</span>
        </p>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <p className="text-sm text-[#9A9A9A] mt-2 line-clamp-2 overflow-hidden">
          {gamedesc}
        </p>
        <hr className="my-3 border-[#555]" />

        {/* Game Meta Info */}
        <div className="flex items-center justify-between py-3">
          {/* Win Price */}
          <div className="text-center">
            <p className="text-sm text-[#9A9A9A]">Win Price</p>
            <div className="flex items-center gap-2 mt-1">
              <img src={trophy} alt="Trophy" className="w-6" />
              <span className="font-medium">{price}</span>
            </div>
          </div>

          {/* Player Slot */}
          <div className="text-center">
            <p className="text-sm text-[#9A9A9A]">Player Slot</p>
            <div className="flex items-center gap-2 mt-1">
              <img src={vs} alt="Player Slot" className="w-6" />
              <span className="font-medium">{playerslot}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-2 rounded-full bg-[#211D70] hover:bg-[#E0AE59] transition-colors duration-300">
            <img src={arrow} alt="Navigate" className="w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamecard;
