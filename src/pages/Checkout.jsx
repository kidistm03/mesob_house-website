import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const paymentOptions = [
  {
    id: "telebirr",
    label: "Telebirr",
    detail: "Instant SuperApp QR prompt or USSD confirmation",
  },
  {
    id: "cbe",
    label: "CBE Birr / CBE Mobile Banking",
    detail: "Direct settlement via Commercial Bank of Ethiopia",
  },
  {
    id: "cash",
    label: "Cash or Card on Delivery",
    detail: "Rider delivers with wireless POS card terminal",
  },
];

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    neighborhood: "",
    address: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("telebirr");
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 2500);
  }

  const tax = Math.round(subtotal * 0.15);
  const grandTotal = subtotal + tax;

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">✅</p>
        <h1 className="font-serif text-3xl mb-2">Order Confirmed!</h1>
        <p className="text-ink-muted">
          Thank you — your Mesob feast is being prepared. Redirecting you home...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl mb-8">Delivery &amp; Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-serif text-lg mb-4">1. Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Full Name</label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Phone</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 ..."
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium block mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-serif text-lg mb-4">2. Delivery Address</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Neighborhood
                </label>
                <input
                  required
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  placeholder="e.g. Bole, Kazanchis..."
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Address / Landmark
                </label>
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-serif text-lg mb-4">3. Payment Method</h2>
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                    selectedPayment === option.id
                      ? "border-maroon bg-cream-dark"
                      : "border-gold-light/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={selectedPayment === option.id}
                    onChange={() => setSelectedPayment(option.id)}
                  />
                  <div>
                    <p className="font-medium text-sm">{option.label}</p>
                    <p className="text-xs text-ink-muted">{option.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 h-fit sticky top-6">
          <h2 className="font-serif text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.nameEn} × {item.quantity}
                </span>
                <span>ETB {item.priceETB * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gold-light/50 my-4"></div>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink-muted">Items Subtotal</span>
            <span>ETB {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-ink-muted">VAT (15%)</span>
            <span>ETB {tax.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold">Total Amount Due</span>
            <span className="font-serif text-xl text-maroon font-semibold">
              ETB {grandTotal.toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            ✅ Confirm Order &amp; Pay ETB {grandTotal.toLocaleString()}
          </button>
        </div>
      </form>
    </div>
  );
}