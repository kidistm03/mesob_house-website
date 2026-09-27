import { useState } from "react";
import { Link } from "react-router-dom";

const diningPreferences = [
  "All Heritage Delicacies",
  "Fasting & Vegan (Tsom)",
  "Halal Certified Meat",
  "100% Pure Teff (Gluten-Free)",
];

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [preference, setPreference] = useState(diningPreferences[0]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: marketing copy */}
        <div className="bg-cream-dark rounded-xl p-8">
          <span className="inline-block bg-white text-maroon text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-4">
            ⭐ MEMBER CIRCLE
          </span>
          <h1 className="font-serif text-3xl text-ink mb-4">
            Become an Honored Table Guest
          </h1>
          <p className="text-ink-muted mb-6">
            Immerse yourself in authentic highland hospitality, where every
            shared meal honors community, connection, and craft.
          </p>

          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="font-serif">🍷 Welcome Gift: Pure Tej or Buna</p>
            <p className="text-sm text-ink-muted">
              Enjoy a complimentary flask of house-fermented Tej or a
              personalized Jebena Buna coffee ceremony with your inaugural
              banquet booking.
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li>
              <p className="font-medium">🏆 Communal Gursha Points</p>
              <p className="text-ink-muted">
                Earn generous loyalty points redeemable for hand-poured
                pure Teff injera, prime Siga Tibs, and bespoke banquet
                upgrades.
              </p>
            </li>
            <li>
              <p className="font-medium">🔔 Fasting Calendar Alerts</p>
              <p className="text-ink-muted">
                Timely seasonal notifications for Tsom fasting periods.
              </p>
            </li>
            <li>
              <p className="font-medium">🚚 Express Addis Delivery</p>
              <p className="text-ink-muted">
                Save Bole, Kazanchis, or Old Airport drop-offs for fast
                delivery straight to your doorstep.
              </p>
            </li>
          </ul>
        </div>

        {/* Right: the registration form */}
        <div className="bg-white rounded-xl p-8">
          <h2 className="font-serif text-2xl mb-2">
            Create Your Mesob House Account
          </h2>
          <p className="text-ink-muted text-sm mb-6">
            Join our culinary heritage circle in less than a minute.
          </p>

          {submitted ? (
            <div className="bg-forest/10 border border-forest rounded-lg p-4 text-forest text-sm">
              Welcome to Mesob House! (This is a demo — no real account was
              created.)
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Abebe Bikila or Genet Tadesse"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Ethiopian Mobile Number
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 911 234 567"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="guest@mesobhouse.com"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    minLength={8}
                    className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    minLength={8}
                    className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                  />
                </div>
              </div>

              {/* Dining preference picker, built from the array above */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Primary Dining Preference (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {diningPreferences.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setPreference(option)}
                      className={`text-sm px-3 py-2 rounded-lg border ${
                        preference === option
                          ? "bg-maroon text-white border-maroon"
                          : "bg-white border-gold-light/50 text-ink"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-ink-muted">
                <input
                  required
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                I agree to the Mesob House Hospitality Terms and Privacy
                Guidelines.
              </label>

              <button
                type="submit"
                className="w-full bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                Create Account &amp; Receive Welcome Gursha →
              </button>
            </form>
          )}

          <p className="text-sm text-ink-muted mt-6 text-center">
            Already part of our dining family?{" "}
            <Link to="/sign-in" className="text-maroon font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}