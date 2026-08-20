import { useState } from "react";
import "./BorrowPage.css";

const API_BASE_URL = "http://localhost:5050/api/v1";

const initialForm = {
  memberName: "",
  bookTitle: "",
  borrowDate: "",
  returnDate: "",
};

function BorrowPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/borrowings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitStatus("success");
      setFormData(initialForm);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="borrow-page">
      <p className="borrow-page__eyebrow">New Record</p>
      <h1 className="borrow-page__title">Borrow a book</h1>
      <p className="borrow-page__sub">
        Fill in the slip below. This posts to{" "}
        <code>POST /api/v1/borrowings</code>.
      </p>

      <div className="borrow-page__layout">
        <form className="borrow-form" onSubmit={handleSubmit}>
          <label className="borrow-form__field">
            <span>Member name</span>
            <input
              type="text"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="e.g. Priya Patel"
              required
            />
          </label>

          <label className="borrow-form__field">
            <span>Book title</span>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              placeholder="e.g. Clean Code"
              required
            />
          </label>

          <div className="borrow-form__row">
            <label className="borrow-form__field">
              <span>Borrow date</span>
              <input
                type="date"
                name="borrowDate"
                value={formData.borrowDate}
                onChange={handleChange}
                required
              />
            </label>

            <label className="borrow-form__field">
              <span>Return date</span>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="borrow-form__submit" disabled={submitting}>
            {submitting ? "Recording…" : "Record borrowing"}
          </button>

          {submitStatus === "success" && (
            <p className="borrow-form__status borrow-form__status--success">
              Borrowing recorded successfully.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="borrow-form__status borrow-form__status--error">
              Could not reach the backend. Make sure the server is running on
              port 5000.
            </p>
          )}
        </form>

        <aside className="borrow-slip" aria-label="Live preview of the entered values">
          <p className="borrow-slip__label">Slip preview</p>
          <dl>
            <dt>Member</dt>
            <dd>{formData.memberName || "—"}</dd>

            <dt>Book</dt>
            <dd>{formData.bookTitle || "—"}</dd>

            <dt>Borrowed on</dt>
            <dd>{formData.borrowDate || "—"}</dd>

            <dt>Due back</dt>
            <dd>{formData.returnDate || "—"}</dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default BorrowPage;
