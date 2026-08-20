import { useEffect, useState } from "react";
import BookCard from "../components/BookCard.jsx";
import "./BooksPage.css";

const API_BASE_URL = "http://localhost:5050/api/v1";

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBooks() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/books`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const json = await response.json();

        if (isMounted) {
          setData(json.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            "Could not load books right now. Make sure the backend server is running on port 5000."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="books-page">
      <p className="books-page__eyebrow">Catalog</p>
      <h1 className="books-page__title">All books</h1>
      <p className="books-page__sub">
        Live data from <code>GET /api/v1/books</code>.
      </p>

      {loading && (
        <p className="books-page__status" role="status">
          Loading books…
        </p>
      )}

      {!loading && error && (
        <p className="books-page__status books-page__status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="books-page__status">No books found in the catalog yet.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="books-page__grid">
          {data.map((book) => (
            <BookCard
              key={book.id || book._id || book.isbn}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BooksPage;
