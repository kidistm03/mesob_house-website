import { Link } from "react-router-dom";
import menuJson from "../data/menu.json";
import specialsJson from "../data/specials.json";
import DishCard from "../components/DishCard.jsx";

const dishes = menuJson.data;
const specials = specialsJson.data;
const drinks = dishes.filter((d) => d.category === "Beverages & Tej");

const reviews = [
  {
    quote:
      "The Doro Wat was so reminiscent of my grandmother's cooking in Gondar. The berbere depth and the slow-simmered onion sweet finish are impossible to find elsewhere.",
    name: "Amanuel Mengistu",
    title: "Bole Resident & Food Patron",
  },
  {
    quote:
      "Their Fasting Beyaynetu is unmatched on Wednesdays. 12 vibrant dishes, and the Shiro tagamino came out bubbling in clay. True culinary devotion.",
    name: "Sara Tesfaye",
    title: "Plant-Based Dining Advocate",
  },
  {
    quote:
      "We hosted a 10-person family reunion around their large handcrafted mesobs. The coffee ceremony with fresh frankincense made the evening unforgettable.",
    name: "Dr. Kebede Wolde",
    title: "Diaspora Homecoming Guest",
  },
];

export default function Home() {
  return (
    <div>
      {/* Announcement strip */}
      <div className="bg-forest text-white text-sm text-center py-2 px-4">
        Tsom / Fasting Observance: 12-item Royal Beyaynetu Vegan Platter
        simmered fresh all day. &nbsp;
        <span className="underline">See Fasting Specialities →</span>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-cream-dark text-maroon text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-4">
            TRADITIONAL HABESHA HEARTH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-ink">
            Communal Warmth,
            <br />
            <span className="italic text-maroon">Slow-Cooked Heritage.</span>
          </h1>
          <p className="text-ink-muted mt-4 max-w-lg">
            Handcrafted wats, ancient stone-ground teff injera, and velvety
            kitfo simmered in 72-hour infused niter kibbeh and heirloom
            berbere harvested from the Ethiopian highlands.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/menu"
              className="bg-maroon hover:bg-maroon-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Explore Today's Specials ↓
            </Link>
            <Link
              to="/menu"
              className="bg-cream-dark text-ink font-semibold px-5 py-3 rounded-lg"
            >
              Full Banquet Menu
            </Link>
            <span className="bg-gold-light/60 text-ink font-medium px-4 py-3 rounded-lg text-sm">
              Buna Ceremony 4:00 PM Daily
            </span>
          </div>

          <div className="flex gap-8 mt-8">
            <div>
              <p className="font-serif text-xl text-maroon">100%</p>
              <p className="text-sm text-ink-muted">Brown &amp; White Teff</p>
            </div>
            <div>
              <p className="font-serif text-xl text-gold">6+ Hours</p>
              <p className="text-sm text-ink-muted">Slow Stew Caramels</p>
            </div>
            <div>
              <p className="font-serif text-xl text-forest">Gursha</p>
              <p className="text-sm text-ink-muted">Hospitality Shared</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&q=80"
            alt="Ethiopian feast platter"
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>
      </section>

      {/* Today's Specials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-maroon text-xs font-semibold tracking-wide mb-2">
          FROM THE HEARTH TODAY
        </p>
        <h2 className="font-serif text-3xl text-ink mb-8">Chef's Specials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specials.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* Beverages */}
      <section className="bg-cream-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-maroon text-xs font-semibold tracking-wide mb-2">
            SPIRIT OF GURSHA
          </p>
          <h2 className="font-serif text-3xl text-ink mb-8">Beverages &amp; Tej</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drinks.map((drink) => (
              <div
                key={drink.id}
                className="bg-white rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-serif">{drink.nameEn}</p>
                  <p className="text-xs text-ink-muted">{drink.nameAm}</p>
                </div>
                <div className="text-right">
                  <p className="text-maroon font-semibold">ETB {drink.priceETB}</p>
                  <Link
                    to={`/dish/${drink.slug}`}
                    className="text-xs text-maroon underline"
                  >
                    + Add
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-maroon text-xs font-semibold tracking-wide mb-2 text-center">
          VOICES AROUND THE MESOB
        </p>
        <h2 className="font-serif text-3xl text-ink mb-10 text-center">
          Honored Guest Reflections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className="bg-cream-dark rounded-xl p-6">
              <p className="text-gold mb-3">★★★★★</p>
              <p className="text-ink-muted text-sm mb-4">"{review.quote}"</p>
              <p className="font-semibold text-sm">{review.name}</p>
              <p className="text-xs text-ink-muted">{review.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-maroon rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-gold-light text-xs font-semibold tracking-wide mb-2">
              JOIN OUR TABLE
            </p>
            <h3 className="font-serif text-2xl text-white mb-2">
              Experience Authentic Habesha Warmth Tonight
            </h3>
            <p className="text-white/80 text-sm max-w-lg">
              Whether gathering around our circular mesobs for communal dining
              or ordering freshly baked injera to your home in Addis Ababa.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="bg-gold-light text-ink font-semibold px-5 py-3 rounded-lg">
              Book a Mesob Table
            </button>
            <Link
              to="/menu"
              className="bg-white text-ink font-semibold px-5 py-3 rounded-lg"
            >
              View Complete Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}