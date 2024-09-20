
import React, { useState, useEffect } from "react";
import Logout from "../../Logout";
import "./navBar.css";

export default function NavBarComponent({ heading }) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'search', 'notification', 'profile' or null
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
      setUserInitial(storedUserName.charAt(0).toUpperCase());
    }

    // Add event listener to close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".profile-menu") &&
        !event.target.closest(".nav-search-activity") &&
        !event.target.closest(".notification")
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(prevState => prevState === dropdown ? null : dropdown); // Toggle dropdowns
  };

  return (
    <div className="navbar-main">
      <div className="nav-bar-content-container">
        <div className="nav-header-left">
          <div className="dashboard-heading">{heading}</div>
        </div>
        <div className="nav-header-right">
          <div className="nav-search-activity">
            <i
              className="bi bi-search"
              onClick={() => toggleDropdown('search')}
            ></i>
            <i
              className="bi bi-activity"
              onClick={() => toggleDropdown('notification')}
            ></i>
          </div>
          <div className="profile-menu" onClick={() => toggleDropdown('profile')}>
            <div className="user-initial">{userInitial}</div>
            <i className="bi bi-caret-down-fill nav-caret-down"></i>
          </div>
        </div>
      </div>

      {openDropdown === 'search' && (
        <div className="search-container">
          <input type="text" placeholder="SEARCH" className="search-bar" />
          <i
            className="bi bi-x search-close-icon"
            onClick={() => setOpenDropdown(null)}
          ></i>
        </div>
      )}

      {openDropdown === 'notification' && (
        <div className="notification">
          <li>Mike John responded to your email</li>
          <li>You have 5 more tasks</li>
          <li>Your friend Michael is in town</li>
          <li>Another notification</li>
          <li>Another one</li>
        </div>
      )}

      {openDropdown === 'profile' && (
        <div className="dropdown-menu">
          <ul>
            <div className="full-name">{userName}</div>
            <li>View Profile</li>
            <li>Settings</li>
            <li><Logout /></li>
          </ul>
        </div>
      )}
    </div>
  );
}


