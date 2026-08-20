import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import BorrowPage from "./pages/BorrowPage.jsx";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/borrow" element={<BorrowPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
