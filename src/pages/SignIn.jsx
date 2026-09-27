import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: marketing copy, matches the design's left panel */}
        <div className="bg-cream-dark rounded-xl p-8">
          <span className="inline-block bg-white text-maroon text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-4">
            MESOB FEAST CIRCLE &amp; PERKS
          </span>
          <h1 className="font-serif text-3xl text-ink mb-4">
            A table shared is a bond celebrated.
          </h1>
          <p className="text-ink-muted">
            Sign into your culinary sanctuary. Track your seasonal fasting
            platters, express your Jebena preferences, and summon
            traditional Addis feasts straight to your door.
          </p>

          <div className="bg-white rounded-xl p-4 mt-6">
            <p className="font-serif">10 Gursha Points / ETB 100</p>
            <p className="text-sm text-ink-muted">
              Redeem against rare honey tej batches or special communal
              platters.
            </p>
          </div>
        </div>

        {/* Right: the actual sign-in form */}
        <div className="bg-white rounded-xl p-8">
          <p className="text-xs font-semibold text-maroon tracking-wide mb-2">
            MEMBER PORTAL
          </p>
          <h2 className="font-serif text-2xl mb-2">
            Welcome to the Mesob Table
          </h2>
          <p className="text-ink-muted text-sm mb-6">
            Sign in to manage your feasts, Telebirr rewards, and reserved
            dining mesobs.
          </p>

          {submitted ? (
            // Simple "success" message once the form has been submitted.
            <div className="bg-forest/10 border border-forest rounded-lg p-4 text-forest text-sm">
              You're signed in! (This is a demo — no real account was
              created.)
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Ethiopian Mobile Number
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 091 123 4567"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your confidential password"
                  className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-ink-muted">
                <input type="checkbox" />
                Keep me signed in on this device
              </label>

              <button
                type="submit"
                className="w-full bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                Sign In to Mesob House →
              </button>
            </form>
          )}

          <p className="text-sm text-ink-muted mt-6">
            New to our dining family?{" "}
            <Link to="/register" className="text-maroon font-semibold">
              Join the Mesob Table &amp; Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
