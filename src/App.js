import "./App.css";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { UserAuthContextProvider } from "./components/UserAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <UserAuthContextProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </UserAuthContextProvider>
  );
}

export default App;
