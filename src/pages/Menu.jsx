import { useState } from "react";
import menuJson from "../data/menu.json";
import DishCard from "../components/DishCard.jsx";

const dishes = menuJson.data;
const categories = [
  "All Dishes",
  ...new Set(dishes.map((d) => d.category)),
];

export default function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      activeCategory === "All Dishes" || dish.category === activeCategory;
    const matchesSearch = dish.nameEn
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <span className="inline-block bg-cream-dark text-maroon text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-4">
        HANDCRAFTED GONDAR &amp; ADDIS SPICES
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-2">
        Our Complete Culinary Heritage
      </h1>
      <p className="text-ink-muted max-w-2xl mb-8">
        Every dish is prepared daily from scratch using sun-dried spices,
        stone-ground legume flours, and clarified herbal butter sourced
        directly from highland farm cooperatives.
      </p>

      <div className="bg-white border border-gold-light/50 rounded-xl p-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs, Doro Wat)..."
          className="w-full px-3 py-2 outline-none bg-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          const count =
            category === "All Dishes"
              ? dishes.length
              : dishes.filter((d) => d.category === category).length;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive
                ? "bg-maroon text-white"
                : "bg-white border border-gold-light/50 text-ink hover:bg-cream-dark"
                }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-ink-muted">
          No dishes match "{searchTerm}". Try a different search term.
        </div>
      )}
    </div>
  );
}