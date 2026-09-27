import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { totalItems, subtotal } = useCart();

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-maroon text-white" : "text-ink hover:bg-cream-dark"
    }`;

  return (
    <header className="bg-cream border-b border-gold-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <Link to="/" className="font-serif text-2xl leading-tight text-maroon">
          Mesob
          <br />
          House
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/menu" className={navLinkClasses}>Menu</NavLink>
          <NavLink to="/menu" className={navLinkClasses}>Featured Dish</NavLink>
          <NavLink to="/cart" className={navLinkClasses}>Order &amp; Cart</NavLink>
          <NavLink to="/checkout" className={navLinkClasses}>Delivery &amp; Checkout</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-white border border-gold-light rounded-lg px-3 py-2"
          >
            <span className="bg-forest text-white text-xs font-semibold rounded-full px-2 py-1">
              {totalItems} items
            </span>
            <span className="text-forest font-semibold text-sm">
              ETB {subtotal.toLocaleString()}
            </span>
          </Link>

          <Link to="/sign-in" className="text-sm font-medium text-ink hover:text-maroon">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-cream-dark text-ink text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}