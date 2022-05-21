import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/login";
import { SignupPage } from "pages/signup";
import { Navbar } from "components/navbar/navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<>About</>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
