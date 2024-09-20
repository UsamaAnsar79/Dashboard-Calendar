
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEvents } from "./EventContext";
import ViewList from "./ViewList";
// Utility function to generate unique IDs
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
const Week = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupEvent, setPopupEvent] = useState({
    title: "",
    description: "",
    time: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  useEffect(() => {
    console.log("Current Events:", events);
  }, [events]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the start and end dates of the current week
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  // Function to format the current week range
  const formatWeekRange = () => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const startMonth = startOfWeek.toLocaleDateString("en-US", { month: "short" });
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" });

    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();

    return startMonth === endMonth
      ? `${startMonth} ${startDay} - ${endDay}`
      : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setPopupEvent({ title: "", description: "", time: "" });
    setEditingEvent(null);
    setPopup(true);
  };


  const handleTimeSlotClick = (date, hour) => {
    const eventDate = new Date(date);
    eventDate.setHours(hour, 0, 0, 0); 

    setSelectedDate(eventDate);
    setPopupEvent({
      title: "",
      description: "",
      time: `${hour.toString().padStart(2, "0")}:00`,
    });
    setEditingEvent(null); 
    setPopup(true);
};


  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const formatHour = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjustedHour}:00 ${suffix}`;
  };

  const hours = Array.from({ length: 24 }, (_, i) => i); // Array of hours from 0 to 23

  // Highlight the current date and time
  const today = new Date().toDateString();
  const currentHour = new Date().getHours();

  const handleEditClick = (event) => {
    setPopupEvent(event);
    setSelectedDate(new Date(event.date));
    setEditingEvent(event);
    setPopup(true);
  };
  const handleDeleteClick = (eventId) => {
    if (eventId) {
      deleteEvent(eventId);
    } else {
      console.error("Event ID is undefined");
    }
  };

  const popupSave = () => {
    if (popupEvent.title && selectedDate) {
      const eventDate = new Date(selectedDate);
      eventDate.setHours(parseInt(popupEvent.time.split(":")[0], 10), 0, 0, 0); // Set correct time

      const newEvent = {
        id: editingEvent ? editingEvent._id : generateUniqueId(),
        ...popupEvent,
        date: eventDate.toISOString(), 
      };

      if (editingEvent) {
        updateEvent(editingEvent._id, newEvent);
        setEditingEvent(null);
      } else {
        addEvent(newEvent);
      }

      setPopup(false);
    }
  };

  const popupClose = () => {
    setPopup(false);
    setPopupEvent({ title: "", description: "", time: "" });
    setEditingEvent(null);
  };
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
          
          <button onClick={handlePreviousWeek}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => setCurrentDate(new Date())}>Current Week</button>
          <button onClick={handleNextWeek}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="calendar-header-title">
            <h2>{formatWeekRange()}</h2>
          </div>
        </div>

        {/* Week Header */}
        <div className="week-calendar-header">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`week-calendar-day-header ${
                today === date.toDateString() ? "current-date" : ""
              }`}
            >
              <div>{daysOfWeek[date.getDay()]}</div>
              <div>{date.toLocaleDateString("en-US", { day: "2-digit" })}</div>
            </div>
          ))}
        </div>

        {/* Event Details Box */}
        {selectedDate && (
          <div className="event-details-box">
            <h3>Events for {selectedDate.toDateString()}</h3>
            <table className="event-detail-table">
              <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Time</th>
                <th>Description</th>
                <th>Edit & Delete</th>
              </tr>
              </thead>
           <tbody>
             {events
              .filter(
                (event) =>
                  new Date(event.date).toDateString() === selectedDate.toDateString()
              )
              .map((event, idx) => (
                <tr key={idx} className="event-details">
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>  {truncate(event.title,30)}</td>
                  <td>{event.time}</td>
                  <td>{event.description}</td>
                  <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(event)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="trash-btn"
                  onClick={() => handleDeleteClick(event._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
                </tr>
              ))}
              </tbody>
              </table>
            <i className="bi bi-x  close-btn" onClick={() => setSelectedDate(null)}></i>
          
          </div>
        )}

        {/* Time Grid */}
        <div className="week-calendar-body">
          <div className="week-calendar-time-grid">
            <div className="week-calendar-time-grid-body">
              {hours.map((hour) => (
                <div key={hour} className="week-calendar-time-row">
                  <div className="week-calendar-time">{formatHour(hour)}</div>
                  {dates.map((date, index) => (
                    <div
                      key={index}
                      className={`week-calendar-time-cell ${
                        selectedDate &&
                        selectedDate.toDateString() === date.toDateString()
                          ? "selected"
                          : ""
                      } ${hour === currentHour ? "current-hour" : ""}`}
                      onClick={() => handleTimeSlotClick(date, hour)}
                    >
                      {/* Display events for this date and time */}
                      {events
                        .filter(
                          (event) =>
                            new Date(event.date).toDateString() === date.toDateString() &&
                            parseInt(event.time.split(":")[0], 10) === hour
                        )
                        .map((event, idx) => (
                          <ViewList
                          key={idx}
                          event={event}
                          onEditClick={handleEditClick}
                          onDeleteClick={() => handleDeleteClick(event._id)}
                        />
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popup for adding/editing events */}
        {popup && (
          <div className="popup">
            <div className="popup-content">
              <h3>
                {editingEvent ? "Edit Event" : "Add an Event"} on{" "}
                {selectedDate ? selectedDate.toDateString() : ""}
              </h3>
              <input
                type="text"
                placeholder="Title"
                value={popupEvent.title}
                onChange={(e) =>
                  setPopupEvent({ ...popupEvent, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={popupEvent.description}
                onChange={(e) =>
                  setPopupEvent({ ...popupEvent, description: e.target.value })
                }
              />
              <input
                type="time"
                value={popupEvent.time}
                onChange={(e) =>
                  setPopupEvent({ ...popupEvent, time: e.target.value })
                }
              />
              <div className="popup-buttons">
                <button onClick={popupClose}>Cancel</button>
                <button onClick={popupSave}>
                  {editingEvent ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Week;
