import "./App.css";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { UserAuthContextProvider } from "./components/UserAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <UserAuthContextProvider>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/userpage"
          element={
            <ProtectedRoute>
              <UserPage/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
    </UserAuthContextProvider>
  );
}

export default App;
