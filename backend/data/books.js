// data/books.js
// Small hardcoded in-memory books list used by Task 3's REST API.
// (This is separate from the Mongoose/MongoDB implementation in Task 5.)

let books = [
  {
    id: "b1",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "9780132350884",
    available: true,
  },
  {
    id: "b2",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    category: "Computer Science",
    isbn: "9780262033848",
    available: false,
  },
  {
    id: "b3",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Web Development",
    isbn: "9781593279509",
    available: true,
  },
  {
    id: "b4",
    title: "Database System Concepts",
    author: "Silberschatz, Korth, Sudarshan",
    category: "Databases",
    isbn: "9780078022159",
    available: true,
  },
];

module.exports = books;
