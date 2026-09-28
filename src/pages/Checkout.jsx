import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

const paymentOptions = [
  {
    id: "telebirr",
    label: "Telebirr",
    detail: "Instant SuperApp QR or USSD",
  },
  {
    id: "cbe",
    label: "CBE Birr / Mobile Banking",
    detail: "Commercial Bank of Ethiopia",
  },
  {
    id: "cash",
    label: "Cash or Card on Delivery",
    detail: "Pay when the rider arrives",
  },
];

export default function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const subtotal = useCartStore((state) => state.subtotal());
  const clearCart =useCartStore((state) => state.clearCart);
  
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

  const tax = Math.round(subtotal * 0.15);
  const grandTotal = subtotal + tax;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 2500);
  }

  // Success screen after submit
  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">✅</p>
        <h1 className="text-3xl font-serif mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you — your Mesob feast is being prepared.
          Redirecting you home...
        </p>
      </div>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">Your basket is empty</h1>
        <p className="text-gray-500 mb-6">
          Add some dishes from the menu before checking out.
        </p>
        <Link
          to="/menu"
          className="bg-red-900 text-white font-semibold px-5 py-3 rounded-lg inline-block"
        >
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-serif mb-8">Delivery &amp; Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-xl p-6 border">
            <h2 className="text-lg font-serif mb-4">1. Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Name
                </label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-red-900"
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
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-red-900"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium block mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-red-900"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-6 border">
            <h2 className="text-lg font-serif mb-4">2. Delivery Address</h2>
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
                  placeholder="e.g. Bole, Kazanchis"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-red-900"
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
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-red-900"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl p-6 border">
            <h2 className="text-lg font-serif mb-4">3. Payment Method</h2>
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                    selectedPayment === option.id
                      ? "border-red-900 bg-red-50"
                      : "border-gray-200"
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
                    <p className="text-xs text-gray-500">{option.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: order summary + submit */}
        <div className="bg-white rounded-xl p-6 h-fit sticky top-6 border">
          <h2 className="text-lg font-serif mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.nameEn} × {item.quantity}
                </span>
                <span>
                  ETB {(item.priceETB * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Items Subtotal</span>
            <span>ETB {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">VAT (15%)</span>
            <span>ETB {tax.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold">Total Amount Due</span>
            <span className="text-xl font-serif font-semibold text-red-900">
              ETB {grandTotal.toLocaleString()}
            </span>
          </div>

          {/* THIS is the submit button */}
          <button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 text-white font-semibold px-5 py-3 rounded-lg"
          >
            Confirm Order &amp; Pay ETB {grandTotal.toLocaleString()}
          </button>
        </div>
      </form>
    </div>
  );
}