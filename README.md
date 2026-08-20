# Stackrow Library — Library Book Management System

ITUE301 — Advanced Web Development Frameworks — Open-Book Practical Exam (Set B)

A small library management system built with **React**, **Express.js**, and
**MongoDB (Mongoose)**.

> ⚠️ Before submitting: replace every `[your-roll-number]` / `[batch]`
> placeholder, rename this repository to
> `itue301-exam-[your-roll-number]-[batch]`, and update the GitHub URL below.

## 1. Project structure

```
itue301-exam-[roll-number]-[batch]/
├── frontend/        React app (Vite + React Router)
├── backend/          Express API + Mongoose models
├── .env.example
├── .gitignore
└── README.md
```

## 2. Frontend setup and run

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

Pages:
- `/` — Home
- `/books` — Book catalog, fetched live from the Express API (Task 4)
- `/borrow` — Borrowing form (Task 2)

> The frontend expects the backend to be running at `http://localhost:5000`
> (see `API_BASE_URL` in `src/pages/BooksPage.jsx` and `src/pages/BorrowPage.jsx`).

## 3. Backend setup and run

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI
npm start               # or: node server.js
```

The API runs at **http://localhost:5000**.

### REST endpoints (Task 3 — in-memory data)

| Method | Endpoint                | Purpose                        |
|--------|--------------------------|---------------------------------|
| GET    | `/api/v1/books`          | Return all books                |
| GET    | `/api/v1/borrowings`     | Return all borrowing records    |
| POST   | `/api/v1/borrowings`     | Create a new borrowing record   |

Every request is logged by a custom `requestLogger` middleware in the format:

```
[METHOD] [PATH] [TIMESTAMP]
```

A global error-handling middleware (`middleware/errorHandler.js`) is registered
last and returns structured JSON instead of a raw stack trace.

### Mongoose schemas (Task 5)

`backend/models/` contains `Book.js`, `Member.js`, and `Borrowing.js`, matching
the field requirements in the exam brief, including the `status` enum
(`borrowed | returned | overdue`, default `borrowed`) and references from
`Borrowing.memberId → Member` and `Borrowing.bookId → Book`.

To demonstrate the schemas working end-to-end (valid inserts, a populated
reference query, a validation-failure error, and a duplicate-key error), run:

```bash
cd backend
npm run seed:mongo
# equivalent to: node mongoDemo.js
```

This prints the created documents and two clean JSON error responses
(instead of raw Mongoose error objects) to the console — screenshot this
output (or the resulting documents in Compass/Atlas) for the report.

## 4. MongoDB setup

1. Use either a local MongoDB instance or a free MongoDB Atlas cluster.
2. Copy the connection string into `backend/.env` as `MONGO_URI`.
3. Run `npm run seed:mongo` from `backend/` to create sample `Book`, `Member`,
   and `Borrowing` documents and verify the connection.

## 5. Required environment variables

Set these in `backend/.env` (see `backend/.env.example`):

| Variable    | Description                                   |
|-------------|------------------------------------------------|
| `PORT`      | Port for the Express server (default `5000`)   |
| `MONGO_URI` | MongoDB connection string (used by Task 5)      |

`.env` is git-ignored — only `.env.example` is committed.

## 6. Notes on task mapping

| Task | Where it lives |
|------|-----------------|
| Task 1 — Component architecture | `frontend/src/pages/*`, `frontend/src/components/*` |
| Task 2 — Routing & state | `frontend/src/App.jsx`, `frontend/src/components/Navbar.jsx`, `frontend/src/pages/BorrowPage.jsx` |
| Task 3 — Express API + middleware | `backend/server.js`, `backend/routes/*`, `backend/middleware/*` |
| Task 4 — API consumption in React | `frontend/src/pages/BooksPage.jsx` |
| Task 5 — Mongoose schemas & validation | `backend/models/*`, `backend/mongoDemo.js`, `backend/utils/formatMongooseError.js` |
# itue301-exam-24dce116-B
