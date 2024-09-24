import React, { useState, useEffect } from "react";
import Logout from "../../Logout";
import axios from "axios";
import "./navBar.css";

export default function NavBarComponent({ heading }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
      setUserInitial(storedUserName.charAt(0).toUpperCase());
    }

    const fetchNotifications = async () => {
      if (!userId) {
        console.error("User ID is null. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/notifications?user=${userId}`
        );
        const fetchedNotifications = response.data;
        setNotifications(fetchedNotifications);
        const unreadCount = fetchedNotifications.filter((n) => !n.read).length;
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".profile-menu") &&
        !event.target.closest(".nav-search-activity") &&
        !event.target.closest(".notification") &&
        !event.target.closest(".search-container") &&
        !event.target.closest(".notification-dropdown") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userId]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prevState) => (prevState === dropdown ? null : dropdown));
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:3001/notifications/${notificationId}`, {
        read: true,
      });

      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        );

        const unreadCount = updatedNotifications.filter((n) => !n.read).length;
        setNotificationCount(unreadCount);
        return updatedNotifications;
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
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
              onClick={() => toggleDropdown("search")}
            ></i>
            <i
              className="bi bi-activity notification-icon"
              onClick={() => toggleDropdown("notification")}
            >
              {notificationCount > 0 && (
                <span className="notification-count">{notificationCount}</span>
              )}
            </i>
          </div>
          <div
            className="profile-menu"
            onClick={() => toggleDropdown("profile")}
          >
            <div className="user-initial">{userInitial}</div>
            <i className="bi bi-caret-down-fill nav-caret-down"></i>
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      {openDropdown === "search" && (
        <div className="search-container">
          <input type="text" placeholder="SEARCH" className="search-bar" />
          <i
            className="bi bi-x search-close-icon"
            onClick={() => setOpenDropdown(null)}
          ></i>
        </div>
      )}

      {/* Notifications Dropdown */}
      {openDropdown === "notification" && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`notification-item ${
                  notification.read ? "read" : "unread"
                }`}
                onClick={() => markAsRead(notification._id)} 
              >
                <p>{notification.title}</p>
              </div>
            ))
          ) : (
            <div>No notifications</div>
          )}
        </div>
      )}

      {/* Profile Dropdown */}
      {openDropdown === "profile" && (
        <div className="dropdown-menu">
          <ul>
            <div className="full-name">{userName}</div>
            <li>View Profile</li>
            <li>Settings</li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
