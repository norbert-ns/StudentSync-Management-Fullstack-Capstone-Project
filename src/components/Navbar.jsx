import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png.webp';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="STUDENTSYNC Logo" className="logo-img" />
        <span className="logo-text">STUDENTSYNC</span>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#home" className="nav-link green-text">Home</a>
        </li>
        <li>
          <a href="#add-student" className="nav-link">Add Student</a>
        </li>
        <li>
          <a href="#all-students" className="nav-link active">All Students</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;