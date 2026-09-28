import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

const DELIVERY_FEE = 0;
const TAX_RATE = 0.15;

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

export default function Cart() {

  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const subtotal = useCartStore((state) => state.subtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + DELIVERY_FEE + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-sm font-semibold tracking-wide mb-2 text-red-900">
        COMMUNAL FEASTING
      </p>
      <h1 className="text-3xl sm:text-4xl font-serif mb-8">
        Your Gursha Basket
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border">
          <p className="text-gray-500 mb-4">
            Your basket is empty — no dishes selected yet.
          </p>
          <Link
            to="/menu"
            className="bg-red-900 text-white font-semibold px-5 py-3 rounded-lg inline-block"
          >
            Browse the Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-serif">
                {cartItems.length} handcrafted selection
                {cartItems.length > 1 ? "s" : ""}
              </h2>
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-gray-500 underline"
              >
                Clear Table
              </button>
            </div>

            {cartItems.map((item) => {
              const image =
                item.image ||
                categoryImages[item.category] ||
                defaultImage;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 flex items-center gap-4 border"
                >
                  <img
                    src={image}
                    alt={item.nameEn}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.nameEn}</p>
                    <p className="text-sm text-gray-500">
                      ETB {item.priceETB} each
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-lg"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold text-red-900 w-24 text-right">
                    ETB {(item.priceETB * item.quantity).toLocaleString()}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-700 text-lg"
                    aria-label={`Remove ${item.nameEn}`}
                  >
                    🗑
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: totals */}
          <div className="bg-white rounded-xl p-6 h-fit sticky top-6 border">
            <h2 className="text-xl font-serif mb-4">Basket Ledger</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Items Subtotal ({cartItems.length})
                </span>
                <span>ETB {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-green-700 font-medium">
                  {DELIVERY_FEE === 0 ? "FREE" : `ETB ${DELIVERY_FEE}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">VAT (15%)</span>
                <span>ETB {tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold">GRAND TOTAL</span>
              <span className="text-2xl font-serif font-semibold text-red-900">
                ETB {grandTotal.toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-red-900 hover:bg-red-800 text-white font-semibold px-5 py-3 rounded-lg"
            >
              Proceed to Checkout →
            </Link>

            <Link
              to="/menu"
              className="block text-center text-sm text-gray-500 mt-4"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}