import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import menuJson from "../data/menu.json";
import { useCartStore } from "../store/cartStore.js";

const dishes = menuJson.data;

const categoryImages = {
  "Traditional Stews & Wat":
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
  "Tibs & Grills":
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  "Raw & Cured Delicacies / Kitfo":
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80",
  "Fasting & Vegan / Tsom":
    "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&q=80",
  "Beverages & Tej":
    "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&q=80",
};
const defaultImage =
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80";

function getDishBySlug(slug) {
  return dishes.find((d) => d.slug === slug);
}

const heatLevels = ["Mild", "Traditional (Recommended)", "Fiery Awaze"];

export default function ProductDetail() {
  const { slug } = useParams();
  const dish = getDishBySlug(slug);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [selectedHeat, setSelectedHeat] = useState(heatLevels[1]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!dish) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl mb-4">Dish not found</h1>
        <p className="text-ink-muted mb-6">
          We couldn't find that dish on our menu.
        </p>
        <Link to="/menu" className="text-maroon underline">
          Back to the Menu
        </Link>
      </div>
    );
  }

  const image = dish.image || categoryImages[dish.category] || defaultImage;
  const pairings = dishes.filter((d) => d.id !== dish.id).slice(0, 3);

  function handleAddToOrder() {
    addToCart(dish, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-sm text-ink-muted mb-6">
        <Link to="/">Home</Link> &gt; <Link to="/menu">Menu</Link> &gt;{" "}
        <span className="text-ink">{dish.nameEn}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img
            src={image}
            alt={dish.nameEn}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        <div>
          <span className="inline-block bg-cream-dark text-maroon text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {dish.category}
          </span>
          <h1 className="font-serif text-3xl text-ink mb-1">{dish.nameEn}</h1>
          {dish.nameAm && (
            <p className="text-ink-muted mb-4">{dish.nameAm}</p>
          )}
          <p className="font-serif text-2xl text-maroon font-semibold mb-4">
            ETB {dish.priceETB}
          </p>
          <p className="text-ink-muted mb-6">{dish.description}</p>

          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Ingredients</p>
              <p className="text-sm text-ink-muted">
                {dish.ingredients.join(" · ")}
              </p>
            </div>
          )}

          {dish.servings && (
            <p className="text-sm text-ink-muted mb-6">{dish.servings}</p>
          )}

          {/* Heat level */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Preferred Heat</p>
            <div className="flex flex-wrap gap-2">
              {heatLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedHeat(level)}
                  className={`text-sm px-3 py-2 rounded-lg border ${selectedHeat === level
                      ? "bg-maroon text-white border-maroon"
                      : "bg-white border-gold-light/50"
                    }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gold-light/50 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToOrder}
              className="flex-1 bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Add to Order · ETB {dish.priceETB * quantity}
            </button>
          </div>

          {justAdded && (
            <p className="text-forest text-sm font-medium mt-3">
              Added {quantity} × {dish.nameEn} to your basket!
            </p>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8 text-sm">
            <div>
              <p className="text-ink-muted uppercase text-xs">Category</p>
              <p className="font-medium">{dish.category}</p>
            </div>
            <div>
              <p className="text-ink-muted uppercase text-xs">Spice Level</p>
              <p className="font-medium">{dish.spiceLevel}</p>
            </div>
            <div>
              <p className="text-ink-muted uppercase text-xs">Dietary</p>
              <p className="font-medium">
                {dish.isFasting ? "Fasting / Vegan" : "Contains Meat"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pairings */}
      <div className="mt-16">
        <h2 className="font-serif text-2xl text-ink mb-6">
          Pairs Wonderfully With {dish.nameEn}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pairings.map((pairing) => {
            const pImage =
              pairing.image ||
              categoryImages[pairing.category] ||
              defaultImage;
            return (
              <Link
                key={pairing.id}
                to={`/dish/${pairing.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-gold-light/40 block"
              >
                <img
                  src={pImage}
                  alt={pairing.nameEn}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="font-serif">{pairing.nameEn}</p>
                  <p className="text-maroon font-semibold text-sm mt-1">
                    ETB {pairing.priceETB}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}