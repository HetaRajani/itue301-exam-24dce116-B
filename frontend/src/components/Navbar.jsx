import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-mark">§</span>
          Stackrow<span className="navbar__brand-accent">Library</span>
        </NavLink>

        <nav aria-label="Primary" className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/borrow"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Borrow
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
