import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

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
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } =
    useCart();

  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + DELIVERY_FEE + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-maroon text-xs font-semibold tracking-wide mb-2">
        COMMUNAL FEASTING
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-8">
        Your Gursha Basket
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          <p className="text-ink-muted mb-4">
            Your basket is empty — no dishes selected yet.
          </p>
          <Link
            to="/menu"
            className="bg-maroon text-white font-semibold px-5 py-3 rounded-lg inline-block"
          >
            Browse the Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl">
                Clay Pot Stews &amp; Provisions ({cartItems.length} selections)
              </h2>
              <button
                onClick={clearCart}
                className="text-sm text-ink-muted underline"
              >
                Clear Table
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => {
                const image =
                  item.image ||
                  categoryImages[item.category] ||
                  defaultImage;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 flex items-center gap-4"
                  >
                    <img
                      src={image}
                      alt={item.nameEn}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-serif font-medium">{item.nameEn}</p>
                      <p className="text-sm text-ink-muted">
                        ETB {item.priceETB} each
                      </p>
                    </div>

                    <div className="flex items-center border border-gold-light/50 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-maroon w-24 text-right">
                      ETB {(item.priceETB * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-ink-muted hover:text-maroon text-sm"
                      aria-label={`Remove ${item.nameEn}`}
                    >
                      🗑
                    </button>
                  </div>
                );
              })}
            </div>
          </div>


          <div className="bg-white rounded-xl p-6 h-fit sticky top-6">
            <h2 className="font-serif text-xl mb-4">Basket Ledger</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">
                  Items Subtotal ({cartItems.length} items)
                </span>
                <span>ETB {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Delivery Fee</span>
                <span className="text-forest font-medium">
                  {DELIVERY_FEE === 0 ? "FREE" : `ETB ${DELIVERY_FEE}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">City VAT &amp; Levy (15%)</span>
                <span>ETB {tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-gold-light/50 my-4"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold">
                GRAND TOTAL
                <span className="block text-xs text-ink-muted font-normal">
                  Taxes included
                </span>
              </span>
              <span className="font-serif text-2xl text-maroon font-semibold">
                ETB {grandTotal.toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Proceed to Delivery Checkout →
            </Link>
            <Link
              to="/menu"
              className="block text-center text-sm text-ink-muted mt-4"
            >
               Explore more dishes from our Menu
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}