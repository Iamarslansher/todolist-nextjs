// components/Navbar.js
import Link from "next/link";
import { FaHome, FaInfoCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="profile">
        <img
          src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
          alt="User Profile"
          className="profilePic"
        />
      </div>
      <ul className="navLinks">
        <li>
          <a className="navLink">
            <FaHome /> <span>Home</span>
          </a>
        </li>
        <li>
          <a className="navLink">
            <FaInfoCircle /> <span>About</span>
          </a>
        </li>
        <li>
          <a className="navLink">
            <FaCog /> <span>Settings</span>
          </a>
        </li>
        <li>
          <a className="navLink">
            <FaSignOutAlt /> <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
