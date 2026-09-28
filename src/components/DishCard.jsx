import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

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
  const addToCart = useCartStore((state) => state.addToCart);
  
  const image = dish.image || categoryImages[dish.category] || defaultImage;
  const tag = dish.isSpecial ? "Chef's Special" : dish.category;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col">
      {/* Photo */}
      <div className="relative">
        <img
          src={image}
          alt={dish.nameEn}
          className="w-full h-44 object-cover"
        />
        <span className="absolute top-2 left-2 bg-red-900 text-white text-xs font-semibold px-2 py-1 rounded">
          {tag}
        </span>
        {dish.isFasting && (
          <span className="absolute top-2 right-2 bg-green-800 text-white text-xs px-2 py-1 rounded">
            Fasting
          </span>
        )}
        <span className="absolute bottom-2 right-2 bg-white text-xs px-2 py-1 rounded">
          {dish.spiceLevel}
        </span>
      </div>

      {/* Text */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{dish.nameEn}</h3>
        {dish.nameAm && (
          <p className="text-xs text-gray-500">{dish.nameAm}</p>
        )}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {dish.description}
        </p>

        {/* PRICE + ADD BUTTON */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-red-900">
            ETB {dish.priceETB}
          </span>

          <div className="flex gap-2">
            <Link
              to={`/dish/${dish.slug}`}
              className="text-sm px-2 py-2 text-gray-700 hover:text-red-900"
            >
              View
            </Link>

            <button
              type="button"
              onClick={() => addToCart(dish, 1)}
              className="bg-red-900 hover:bg-red-800 text-white text-sm font-semibold px-3 py-2 rounded-lg"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}