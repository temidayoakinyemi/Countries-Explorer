import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  return (
    <nav>
      <div className="nav-content">
        <h1 className="navbar-h1">Where in the world?</h1>
        <ul>
          <li onClick={() => setDark(!dark)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="moon-icon"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
