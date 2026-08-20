import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home">
      <p className="home__eyebrow">Reading Room — College Library</p>
      <h1 className="home__title">
        Every book, every borrower,
        <br />
        one open ledger.
      </h1>
      <p className="home__lede">
        Stackrow Library is a small system for tracking what's on the shelf,
        who has it, and when it's due back — built for the ITUE301
        Library Book Management System exam.
      </p>

      <div className="home__actions">
        <Link to="/books" className="home__btn home__btn--primary">
          Browse the catalog
        </Link>
        <Link to="/borrow" className="home__btn home__btn--secondary">
          Borrow a book
        </Link>
      </div>

      <div className="home__stats">
        <div className="home__stat">
          <span className="home__stat-num">01</span>
          <span className="home__stat-label">Browse titles by category and author</span>
        </div>
        <div className="home__stat">
          <span className="home__stat-num">02</span>
          <span className="home__stat-label">Check real-time availability</span>
        </div>
        <div className="home__stat">
          <span className="home__stat-num">03</span>
          <span className="home__stat-label">Record a borrow with member and dates</span>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
