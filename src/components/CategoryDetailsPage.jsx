import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Gamecard from "../components/Gamecard";
import Footer from "../components/Footer";
import BlackNavbar from "../components/BlackNavbar";
import { AppRoutes } from "../constant/constant";

const CategoryDetailsPage = () => {
  const { id: titleParam } = useParams(); // This is the clean title from URL
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('id'); // This is the actual ID for API calls
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState({
    category: true,
    games: true,
    initialLoad: true
  });
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading({ category: true, games: true, initialLoad: true });
        
        // Fetch category details
        const categoryRes = await axios.get(`${AppRoutes.category}/${categoryId}`);
        
        setCategoryDetails(categoryRes.data);
        setLoading(prev => ({ ...prev, category: false }));
        
        // Fetch games for this category
      // 2. Fetch ALL games
      const gamesRes = await axios.get(`${AppRoutes.creategame}`);
      console.log("Games", gamesRes.data);
      
      // 3. Filter games by category ID - SAFE CHECK
      const filteredGames = Array.isArray(gamesRes.data) 
        ? gamesRes.data.filter(game => game.category?._id === categoryId || game.category === categoryId)
        : [];
      
      setGames(filteredGames);
        setLoading(prev => ({ ...prev, games: false }));
        
      } catch (err) {
        console.error("Fetch error:", err);
        // navigate('/smec', { state: { error: "Failed to load category" } });
      } finally {
        setLoading(prev => ({ ...prev, initialLoad: false }));
      }
    };
  
    fetchCategoryData();
  }, [navigate]);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fix the navigation in Gamecard
  const handleGameClick = (game) => {
    navigate(`/smec/${id}/${game.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  if (loading.initialLoad) {
    return (
      <div className="min-h-screen bg-black text-white text-center py-10">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <span className="ml-3 text-xl">Loading category...</span>
        </div>
      </div>
    );
  }

  if (!categoryDetails) {
    return (
      <div className="min-h-screen bg-black text-white text-center py-10">
        Category not found
      </div>
    );
  }

  return (
    <>
      <BlackNavbar />
      <div className="relative w-full">
        <img 
          className="w-full h-[400px] object-cover" 
          src={categoryDetails.bannerImage || categoryDetails.cardImage || "default-banner.jpg"} 
          alt={`${categoryDetails.title} banner`} 
          onError={(e) => {
            e.target.src = "default-banner.jpg";
          }}
        />
        <div className="absolute z-[10] md:top-[43%] top-[35%] md:left-12 left-6 w-[60%] text-white">
          <h1 className="md:pb-10 pb-2 font-bold md:text-[80px] text-[6vw]">
            {categoryDetails.title}
          </h1>
          <p className="md:text-[20px] text-[2vw] leading-[2.5vw]">
            {categoryDetails.description || "Discover our extraordinary events in this category"}
          </p>
        </div>
      </div>
      
      <div className="px-4 md:px-11 w-full bg-black">
        <div className="flex items-center justify-between flex-col md:flex-row w-[100%]">
          <h3 className="py-16 font-bold text-white md:text-[40px] text-[5vw]">
            Currently Available
          </h3>
          <div>
            <input
              type="text"
              placeholder="Search game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-80 bg-[#554f55] md:h-12 w-full h-11 focus:outline-none border-[1.5px] border-gray-400 rounded-[10px] p-2 mb-9 md:mb-0"
            />
          </div>
        </div>
        
        <div className="container mx-auto">
          {loading.games ? (
            <div className="text-white text-center py-10">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
              <p>Loading games...</p>
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {filteredGames.map((game) => (
                <Gamecard
                  key={game._id}
                  id={game._id}
                  title={game.title}
                  price={game.price}
                  gamedesc={game.description}
                  image={game.gameImageUrl}
                  category={game.category}
                  date={game.date}
                  time={game.time}
                  winprice={game.prize}
                  playerslot={game.player}
                  ContactNumber={game.contactNumber}
                  onClick={() => handleGameClick(game)}
                />
              ))}
            </div>
          ) : (
            <div className="text-white text-center py-10">
              No games found in this category
            </div>
          )}
        </div>
      </div>
      
      <Footer footercolor="bg-black" footertext="text-white" />
    </>
  );
};

export default CategoryDetailsPage;