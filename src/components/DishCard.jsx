import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

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

export default function DishCard({ dish }) {
  const { addToCart } = useCart();
  const image = dish.image || categoryImages[dish.category] || defaultImage;
  const tag = dish.isSpecial ? "Chef's Special" : dish.category;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gold-light/40 flex flex-col">
      <div className="relative">
        <img
          src={image}
          alt={dish.nameEn}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-maroon text-white text-xs font-semibold px-2 py-1 rounded">
          {tag}
        </span>
        {dish.isFasting && (
          <span className="absolute top-3 right-3 bg-forest text-white text-xs font-medium px-2 py-1 rounded">
            Fasting
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-white/90 text-ink text-xs font-medium px-2 py-1 rounded">
          {dish.spiceLevel}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-ink">{dish.nameEn}</h3>
        {dish.nameAm && (
          <p className="text-xs text-ink-muted">{dish.nameAm}</p>
        )}
        <p className="text-sm text-ink-muted mt-1 flex-1 line-clamp-3">
          {dish.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-serif text-lg text-maroon font-semibold">
            ETB {dish.priceETB}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/dish/${dish.slug}`}
              className="text-sm font-medium text-ink hover:text-maroon px-2 py-2"
            >
              View Details
            </Link>
            <button
              onClick={() => addToCart(dish, 1)}
              className="bg-maroon hover:bg-maroon-dark text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}