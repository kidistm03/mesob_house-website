import { Link } from "react-router-dom";
import menuJson from "../data/menu.json";

const dishes = menuJson.data;
const suggestions = dishes.slice(0, 3);

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

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="text-6xl mb-6">🍽️</div>
      <p className="font-serif text-6xl text-gold mb-2">404</p>
      <p className="text-xs font-semibold tracking-wide text-ink-muted mb-6">
        TABLE NOT SET · ERROR
      </p>
      <p className="text-lg text-ink mb-6">
        Looks like this dish has already been enjoyed or never made it to the kitchen!
      </p>
      <p className="text-ink-muted max-w-xl mx-auto mb-8">
        Even the best Gursha sometimes slips! Don't let your appetite wait —
        our Addis kitchen has hot clay pot wats and freshly rolled teff injera
        ready for your table right now.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        <Link
          to="/menu"
          className="bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
        >
          Return to Today's Specials
        </Link>
        <Link
          to="/menu"
          className="bg-cream-dark text-ink font-semibold px-5 py-3 rounded-lg"
        >
          Explore Full Menu
        </Link>
        <Link
          to="/cart"
          className="bg-white border border-gold-light/50 text-ink font-semibold px-5 py-3 rounded-lg"
        >
          Check Current Order
        </Link>
      </div>

      <h2 className="font-serif text-2xl mb-6">
        Hungry? Here's What Our Guests Love Today
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        {suggestions.map((dish) => {
          const image =
            dish.image || categoryImages[dish.category] || defaultImage;
          return (
            <Link
              key={dish.id}
              to={`/dish/${dish.slug}`}
              className="bg-white rounded-xl overflow-hidden border border-gold-light/40 block"
            >
              <img
                src={image}
                alt={dish.nameEn}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-serif">{dish.nameEn}</p>
                <p className="text-maroon font-semibold text-sm mt-1">
                  ETB {dish.priceETB}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}