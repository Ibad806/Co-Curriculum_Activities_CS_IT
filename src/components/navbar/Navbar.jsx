import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../media/download.jpeg";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="navbar-main">
          <div className="logo">
            {/* <img src={logo} alt="" /> */}
            <h1>LOGO</h1>
          </div>
          <div className="nav-menu">
            <ul className="nav-ul">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/">EVENTS</Link>
              </li>
              <li>
                <Link to="/">MY TICKETS</Link>
              </li>
              <li>
                <Link to="/">GALLERY</Link>
              </li>
              <li>
                <Link to="/">MEMBERS</Link>
              </li>
              <li>
                <Link to="/">ABOUT US</Link>
              </li>
              <img src={logo} className="search-img"  alt="Search" />
            </ul>
          </div>
          <div className="nav-right">
            <div className="notifications">
              <img src={logo} alt="" />
            </div>
            <div className="wishlist">
              <img src={logo} alt="" />
            </div>
            <div className="profile">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
