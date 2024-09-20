
import React, { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { HiOutlineChartPie } from "react-icons/hi2";
import { BsAlarm } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { SiPolywork } from "react-icons/si";
import { IoAccessibilityOutline } from "react-icons/io5";
import "./sideBar.css";
import { Link, useLocation } from "react-router-dom";

const SideBarComponent = ({ isOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [barBtnClicked, setBarBtnClicked] = useState(false);
  const [activeItem, setActiveItem] = useState(""); 
  const location = useLocation(); 

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (!barBtnClicked) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!barBtnClicked) {
      setIsExpanded(false);
    }
  };

  const handleBarBtn = () => {
    setBarBtnClicked(!barBtnClicked);
    setIsExpanded(!isExpanded);
    toggleSidebar(!isOpen);
  };

  const menuItems = [
    {
      path: "/dashboard",
      icon: <HiOutlineChartPie className="sidebar-icon" />,
      label: "Dashboard",
    },
    {
      path: "/home",
      icon: <BsAlarm className="sidebar-icon" />,
      label: "Event Manager",
    },
    {
      path: "/roles",
      icon: <SiPolywork className="sidebar-icon" />,
      label: "Roles",
    },
    {
      path: "/permissions",
      icon: <IoAccessibilityOutline className="sidebar-icon" />,
      label: "Permissions",
    },
    {
      path: "/userTab",
      icon: <LuUser className="sidebar-icon" />,
      label: "Users",
    },
  ];

  return (
    <>
      <i className="bi bi-list-ul nav-sidebar-icon" onClick={handleBarBtn}></i>
      <div
        className={`sidebar ${isExpanded ? "expanded" : "collapsed"} ${isOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-header">
          <FaReact className="react-icon" />
          {isExpanded && <h5>CREATIVE TIM</h5>}
        </div>
        <ul className="dropdown-ul">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`sidebar-links ${activeItem === item.path ? "active" : ""}`}
              onClick={() => setActiveItem(item.path)}
            >
              {item.icon}
              <span className="notdropdown">{item.label}</span>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBarComponent;
