import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { UserAuthContextProvider } from "./components/UserAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserNav";
import UserProfile from "./pages/UserProfile";
import UserPreferences from "./pages/UserPrefernces";
import UserNewsFeed from "./pages/UserNewsFeed";

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/userpage"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userpreferences"
            element={
              <ProtectedRoute>
                <UserPreferences />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usernewsfeed"
            element={
              <ProtectedRoute>
                <UserNewsFeed />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
