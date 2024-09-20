
import React, { useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEvents } from "./EventContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Agenda = () => {
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const { events } = useEvents(); 
  
  // Function to get all events for a given month
  const getEventsForMonth = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date); //event date is a Date object
      return (
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Function to format the date range as 'MM/DD/YYYY – MM/DD/YYYY'
  const formatDateRange = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = (date) =>
      `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
        date.getDate()
      ).padStart(2, "0")}/${date.getFullYear()}`;
    return `${format(start)} – ${format(end)}`;
  };

  // Function to navigate to the previous month
  const handlePreviousMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(displayMonth.getMonth() - 1);
    setDisplayMonth(newDate);
  };

  // Function to navigate to the next month
  const handleNextMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(displayMonth.getMonth() + 1);
    setDisplayMonth(newDate);
  };

  // Get events for the current display month
  const eventsThisMonth = getEventsForMonth(displayMonth);
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div className="calendar-main">
      <div className="calendar">
        <div className="calendar-header">
         
          <button onClick={handlePreviousMonth}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => setDisplayMonth(new Date())}>Current Month</button>
          <button onClick={handleNextMonth}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="calendar-header-title">
            <h2>{formatDateRange(displayMonth)}</h2>
          </div>
        </div>

        <div className="events-table">
          <div className="events-table-header">
            <div>Date</div>
            <div>Time</div>
            <div>Event</div>
          </div>
          <div className="events-table-body">
            {eventsThisMonth.length > 0 ? (
              eventsThisMonth.map((event, index) => (
                <div key={index} className="event-row">
                  <div>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div>{event.time}</div>
                  <div> {truncate(event.title,20)}</div>
                </div>
              ))
            ) : (
              <div className="no-events">No events for this month</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
