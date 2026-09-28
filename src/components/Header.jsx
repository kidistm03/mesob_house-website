import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export default function Header() {
  
  const totalItems =useCartStore((state) => state.totalItems());
  const subtotal = useCartStore((state) => state.subtotal());

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-red-900 text-white" : "text-gray-800 hover:bg-gray-100"
    }`;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl leading-tight text-red-900">
          Mesob
          <br />
          House
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/menu" className={navLinkClasses}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={navLinkClasses}>
            Order &amp; Cart
          </NavLink>
          <NavLink to="/checkout" className={navLinkClasses}>
            Delivery &amp; Checkout
          </NavLink>
        </nav>

        {/* Cart + Auth */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
          >
            <span className="bg-green-800 text-white text-xs font-semibold rounded-full px-2 py-1">
              {totalItems} items
            </span>
            <span className="font-semibold text-sm">
              ETB {subtotal.toLocaleString()}
            </span>
          </Link>

          <Link to="/sign-in" className="text-sm font-medium hover:underline">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-gray-100 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}