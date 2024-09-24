
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEvents } from "./EventContext";
import { useNavigate } from "react-router-dom"; 

const MonthView = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { events } = useEvents();
  const navigate = useNavigate(); 

  // Create an array of months for the current year
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return {
      name: date.toLocaleString("default", { month: "long" }),
      index: i,
    };
  });

  // Get months with events
  const getMonthsWithEvents = () => {
    const monthsWithEvents = new Set();
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      if (eventDate.getFullYear() === currentYear) {
        monthsWithEvents.add(eventDate.getMonth());
      }
    });
    return Array.from(monthsWithEvents);
  };

  // Handle clicking a month to navigate to detailed month view
  const handleMonthClick = (monthIndex) => {
    navigate(`/home/month/${monthIndex}`); 
  };

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const formatDateRange = (year) => `${year}`;

  return (
    <div className="calendar-main">
      <div className="calendar">
        <div className="calendar-header">
        
          <button onClick={handlePreviousYear}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => setCurrentYear(new Date().getFullYear())}>
            Current Year
          </button>
          <button onClick={handleNextYear}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="calendar-header-title">
            <h2>{formatDateRange(currentYear)}</h2>
          </div>
        </div>

        <div className="month-view">
          <div className="months">
            {months
              .filter((month) => getMonthsWithEvents().includes(month.index))
              .map((month) => (
                <div
                  key={month.index}
                  className="month-item"
                  onClick={() => handleMonthClick(month.index)}
                >
                  {month.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthView;
