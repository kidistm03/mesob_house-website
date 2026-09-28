import { useState } from "react";
import { Link } from "react-router-dom";
import { signInSchema, zodErrorsToObject } from "../schemas/authSchemas.js";

export default function SignIn() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      setErrors(zodErrorsToObject(result.error));
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: marketing copy */}
        <div className="bg-cream-dark rounded-xl p-8">
          <span className="inline-block bg-white text-maroon text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-4">
            ⭐ WELCOME BACK
          </span>
          <h1 className="font-serif text-3xl text-ink mb-4">
            Sign In to Your Table
          </h1>
          <p className="text-ink-muted mb-6">
            Continue your journey of highland hospitality. Access your loyalty
            points, saved addresses, and exclusive Mesob offers.
          </p>

          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="font-serif">🍷 Member Benefits</p>
            <p className="text-sm text-ink-muted">
              Track Gursha points, get fasting calendar alerts, and enjoy
              priority seating for banquet bookings.
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li>
              <p className="font-medium">🏆 Communal Gursha Points</p>
              <p className="text-ink-muted">
                Redeem points for pure Teff injera and prime Siga Tibs.
              </p>
            </li>
            <li>
              <p className="font-medium">📍 Saved Delivery Addresses</p>
              <p className="text-ink-muted">
                Faster checkout with your favorite neighborhoods saved.
              </p>
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-xl border border-gold-light/40 p-8">
          <h2 className="font-serif text-2xl text-ink mb-6">Sign In</h2>

          {submitted ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">✅</p>
              <h3 className="font-serif text-xl mb-2">Welcome back!</h3>
              <p className="text-ink-muted mb-6">
                You are signed in. Enjoy your next Mesob feast.
              </p>
              <Link
                to="/menu"
                className="inline-block bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg"
              >
                Browse the Menu
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="text-sm font-medium block mb-1 text-ink">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912345678"
                  className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-maroon ${
                    errors.phone ? "border-red-500" : "border-gold-light/50"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-ink">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-maroon ${
                    errors.password ? "border-red-500" : "border-gold-light/50"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          <p className="text-sm text-ink-muted mt-6 text-center">
            New to Mesob House?{" "}
            <Link to="/register" className="text-maroon font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
