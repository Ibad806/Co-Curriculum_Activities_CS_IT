import React, { useEffect } from "react";
import Smeccard from "./Smeccard";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

const Smeccategory = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(AppRoutes.category);
      console.log("Categories", res.data);
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-10">Loading categories...</div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-10">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          EXPLORE CATEGORY
        </h1>
        <p className="text-sm md:text-lg max-w-3xl mx-auto">
          Discover More: Dive Into Our Event Categories
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-6 lg:px-16 mt-10 relative justify-items-center">
        {categories.map((smecgame) => (
          <Smeccard
            key={smecgame._id}
            id={smecgame._id}
            title={smecgame.title}
            image={smecgame.cardImage}
            category={smecgame.title} // This should match your route paths (egames, generalgames, geekgames)
          />
        ))}
      </div>
    </section>
  );
};

export default Smeccategory;

