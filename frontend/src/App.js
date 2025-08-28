import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadPage from "./pages/Upload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import Account from "./pages/Account";

// Helper to protect routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("skimly_token");
  return token ? children : <Login />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
