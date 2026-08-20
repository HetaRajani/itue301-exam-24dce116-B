import "./BookCard.css";

/**
 * BookCard
 * Reusable, presentational component. Receives all data via props from its
 * parent (BooksPage) — it does not fetch or hold its own data.
 *
 * Props:
 *  - title: string
 *  - author: string
 *  - category: string
 *  - available: boolean
 */
function BookCard({ title, author, category, available }) {
  return (
    <article className="book-card">
      <div className="book-card__ledger-line" aria-hidden="true" />

      <div className="book-card__body">
        <p className="book-card__category">{category}</p>
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">by {author}</p>
      </div>

      <div
        className={
          "book-card__stamp " +
          (available ? "book-card__stamp--available" : "book-card__stamp--unavailable")
        }
      >
        {available ? "Available" : "Not Available"}
      </div>
    </article>
  );
}

export default BookCard;
