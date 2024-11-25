import React from "react";
import "./navbar.css";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";
import logo from "../media/download.jpeg";

const Navbar = () => {
  return (      
    <>                       
      <nav>
        <div className="navbar-main">
          <div className="logo">
            {/* <img
              src={logo}
            /> */}
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
              {/* <img src={logo} className="search-img"  alt="Search" /> */}
              <CiSearch className="search-icon" />
            </ul>
          </div>
          <div className="nav-right">
            <div className="notifications">
              <Link to="/">
                <GrFavorite className="wishlist-icon" />
              </Link>
            </div>
            <div className="wishlist">
              <Link to="/">
                <IoNotifications className="notifications-icon" />
              </Link>
            </div>
            <div className="profile">
              <Link to="/">
                <CgProfile className="profile-icon" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;  