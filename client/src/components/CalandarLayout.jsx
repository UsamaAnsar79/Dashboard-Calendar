
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const CalendarLayout = () => {

  return (
    <div>
      <div className="links-main-div">
        <nav className="links-nav">
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "calendar-link active" : "calendar-link"
                }
              >
                month
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/home/week"
                className={({ isActive }) =>
                  isActive ? "calendar-link active" : "calendar-link"
                }
              >
                week
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/day"
                className={({ isActive }) =>
                  isActive ? "calendar-link active" : "calendar-link"
                }
              >
                day
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/agenda"
                className={({ isActive }) =>
                  isActive ? "calendar-link active" : "calendar-link"
                }
              >
                agenda
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/monthview"
                className={({ isActive }) =>
                  isActive ? "calendar-link active" : "calendar-link"
                }
              >
                month-view
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet /> 
    </div>
  );
};

export default CalendarLayout;
