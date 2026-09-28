import { useState } from "react";
import { Link } from "react-router-dom";
import { registerSchema, zodErrorsToObject } from "../schemas/authSchemas.js";
import { useUserStore } from "../store/userStore.js";
import { useNavigate } from "react-router-dom";

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
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error while the user is typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate form fields with Zod
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(zodErrorsToObject(result.error));
      return;
    }

    // Terms checkbox is separate (not in the schema)
    if (!agreedToTerms) {
      setErrors((prev) => ({
        ...prev,
        agreedToTerms: "You must agree to the terms to continue",
      }));
      return;
    }

    // Validation passed → save the user and go to home page
    setErrors({});
    login({
      name: formData.fullName,
      phone: formData.phone,
    });
    navigate("/"); // go to homepage

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
                Earn generous loyalty points redeemable for hand-poured pure
                Teff injera, prime Siga Tibs, and bespoke banquet upgrades.
              </p>
            </li>
            <li>
              <p className="font-medium">🔔 Fasting Calendar Alerts</p>
              <p className="text-ink-muted">
                Timely seasonal notifications for Tsom fasting menus and
                special holiday platters.
              </p>
            </li>
          </ul>
        </div>

        {/* Right: registration form */}
        <div className="bg-white rounded-xl p-8">
          <h2 className="font-serif text-2xl mb-2">
            Create Your Mesob House Account
          </h2>
          <p className="text-ink-muted text-sm mb-6">
            Join our culinary heritage circle in less than a minute.
          </p>

          {submitted ? (
            <div className="bg-forest/10 border border-forest rounded-lg p-4 text-forest text-sm">
              Welcome to Mesob House!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Abebe Bikila or Genet Tadesse"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Ethiopian Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912345678 or +251912345678"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Email Address{" "}
                  <span className="text-ink-muted font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="guest@mesobhouse.com"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Dining preference */}
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
                      className={`text-sm px-3 py-2 rounded-lg border ${preference === option
                        ? "bg-maroon text-white border-maroon"
                        : "bg-white border-gold-light/50 text-ink"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2 text-sm text-ink-muted">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (errors.agreedToTerms) {
                        setErrors((prev) => ({
                          ...prev,
                          agreedToTerms: undefined,
                        }));
                      }
                    }}
                    className="mt-1"
                  />
                  I agree to the Mesob House Hospitality Terms and Privacy
                  Guidelines.
                </label>
                {errors.agreedToTerms && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.agreedToTerms}
                  </p>
                )}
              </div>

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