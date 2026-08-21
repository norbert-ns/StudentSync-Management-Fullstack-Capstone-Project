import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png.webp";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="STUDENTSYNC Logo" className="logo-img" />
          <span className="logo-text">STUDENTSYNC</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link active">
            Home
          </Link>
        </li>
        <li>
          <Link to="/students?add=1" className="nav-link btn-text">
            Add Student
          </Link>
        </li>
        <li>
          <Link to="/students" className="btn-outline">
            All Students
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
