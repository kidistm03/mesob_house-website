export default function Footer() {
  return (
    <footer className="bg-cream-dark mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl text-maroon mb-2">Mesob House</h3>
          <p className="text-sm text-ink-muted">
            Sharing traditions from the Ethiopian highlands — one Gursha at a time.
          </p>
          <p className="text-sm text-ink-muted mt-4">
            Traditional Coffee Ceremony daily at 4:00 PM
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink mb-3">HOSPITALITY HOURS</h4>
          <p className="text-sm text-ink-muted">Tuesday – Sunday: 11:30 AM – 11:00 PM</p>
          <p className="text-sm text-ink-muted mt-2">Monday: Reserved for Private Banquets</p>
          <p className="text-sm text-gold font-medium mt-2">
            Jebena Buna &amp; Fresh Roasting All Evening
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink mb-3">DIETARY TRADITIONS</h4>
          <ul className="text-sm text-ink-muted space-y-2">
            <li>Vegan Fasting (Beyaynetu / Tsom)</li>
            <li>Traditional Prime Meat Feasts</li>
            <li>House Tej (Pure Honey Wine)</li>
            <li>Jebena Buna Roasting Ceremony</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink mb-3">ADDIS LOCATION</h4>
          <p className="text-sm text-ink-muted">
            Bole Medhanialem, Addis Ababa &amp; express delivery across town.
          </p>
          <p className="text-sm font-semibold text-maroon mt-2">+251 911 234 567</p>
        </div>
      </div>

      <div className="border-t border-gold-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2 justify-between text-xs text-ink-muted">
          <p>
            © {new Date().getFullYear()} Mesob House Habesha Dining.
            Authentic Ethiopian &amp; Eritrean Heritage.
          </p>
          <div className="flex gap-4">
            <span>Gursha Hospitality</span>
            <span>Privacy Policy</span>
            <span>Terms of Table</span>
          </div>
        </div>
      </div>
    </footer>
  );
}