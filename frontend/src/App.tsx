import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/login";
import { SignupPage } from "pages/signup";
import { Navbar } from "components/navbar/navbar";
import GuardedRoute from "guards/guarded-route";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<GuardedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<>About</>} />
      </Routes>
    </Router>
  );
}

export default App;
