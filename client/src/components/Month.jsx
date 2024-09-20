

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEvents } from "./EventContext";
import EventIconContainer from "./EventIconContainer"; 
import ViewList from "./ViewList";
import Select from "react-select";
import axios from "axios";

function Month() {
  const { monthIndex } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [selectDate, setSelectDate] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupEvent, setPopupEvent] = useState({
    title: "",
    description: "",
    time: "",
    user: null,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (monthIndex !== undefined) {
      const month = Number(monthIndex);
      if (!isNaN(month)) {
        setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
      }
    }
  }, [monthIndex]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const dates = [];

  for (let i = lastDayOfPreviousMonth - firstDayOfWeek + 1; i <= lastDayOfPreviousMonth; i++) {
    dates.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i), isOtherMonth: true });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    dates.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i), isOtherMonth: false });
  }

  const totalCells = firstDayOfWeek + lastDayOfMonth.getDate();
  const isLastRowComplete = totalCells % 7 === 0;

  if (!isLastRowComplete) {
    const remainingCells = 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
      dates.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i), isOtherMonth: true });
    }
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleDateClick = (date, isOtherMonth) => {
    if (isOtherMonth) return; 
    if (selectDate && selectDate.toDateString() === date.toDateString()) {
      setSelectDate(null);
    } else {
      setSelectDate(date);
    }
  };

  const handleAddEventClick = (date) => {
    setSelectDate(date);
    setPopupEvent({ title: "", description: "", time: getCurrentTimeString(), user: null });
    setEditingEvent(null);
    setPopup(true);
  };

  const handleEditClick = (event) => {
    setPopupEvent(event);
    setSelectDate(new Date(event.date));
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

  const popupSave = async () => {
    if (popupEvent.title && selectDate && popupEvent.user) {
      const eventDate = new Date(selectDate);
      eventDate.setHours(0, 0, 0, 0);

      const newEvent = {
        title: popupEvent.title,
        description: popupEvent.description,
        time: popupEvent.time,
        date: eventDate.toISOString(),
        user: popupEvent.user,
      };

      try {
        if (editingEvent) {
          await updateEvent(editingEvent._id, newEvent);
        } else {
          await addEvent(newEvent);
        }
        popupClose();
      } catch (error) {
        console.error("Error saving event:", error);
      }
    }
  };

  const popupClose = () => {
    setPopup(false);
    setPopupEvent({ title: "", description: "", time: "", user: null });
    setEditingEvent(null);
  };

  const generateYearOptions = () => {
    const startYear = 1900;
    const endYear = 2100;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years;
  };

  const getCurrentTimeString = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); 
  };

  return (
    <div className="calendar-main">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePreviousMonth}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => setCurrentDate(new Date())}>Today</button>
          <button onClick={handleNextMonth}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="calendar-header-title">
            <h2>{currentDate.toLocaleString("default", { month: "long" })}</h2>
            <select
              value={currentDate.getFullYear()}
              onChange={handleYearChange}
              className="year-select"
            >
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="days-div">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {dates.map((item, index) => (
            <div
              key={index}
              className={`calendar-date ${selectDate && selectDate.toDateString() === item.date.toDateString() ? "selected" : ""} ${item.isOtherMonth ? "other-month" : ""} ${item.date.getDate() === today.getDate() && item.date.getMonth() === today.getMonth() && item.date.getFullYear() === today.getFullYear() ? "active" : ""}`}
              onClick={() => handleDateClick(item.date, item.isOtherMonth)}
            >
              {item.date.getDate()}
              {!item.isOtherMonth && (
                <EventIconContainer
                  date={new Date(item.date)}
                  isDateSelected={selectDate && selectDate.toDateString() === item.date.toDateString()}
                  onAddEventClick={handleAddEventClick}
                />
              )}
              <div className="event-container">
                {Array.isArray(events) &&
                  events
                    .filter((event) => {
                      const eventDate = new Date(event.date);
                      return (
                        eventDate.getDate() === item.date.getDate() &&
                        eventDate.getMonth() === item.date.getMonth() &&
                        eventDate.getFullYear() === item.date.getFullYear()
                      );
                    })
                    .map((event) => (
                      <ViewList
                        key={event._id}
                        event={event}
                        onEditClick={handleEditClick}
                        onDeleteClick={() => handleDeleteClick(event._id)}
                      />
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{editingEvent ? "Edit Event" : "Add an Event"} on {selectDate ? selectDate.toDateString() : ""}</h3>
            <input
              type="text"
              placeholder="Title"
              value={popupEvent.title}
              onChange={(e) => setPopupEvent({ ...popupEvent, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={popupEvent.description}
              onChange={(e) => setPopupEvent({ ...popupEvent, description: e.target.value })}
            />
            <input
              type="time"
              value={popupEvent.time}
              onChange={(e) => setPopupEvent({ ...popupEvent, time: e.target.value })}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />
            <Select
              placeholder="Select User"
              value={popupEvent.user ? { value: popupEvent.user, label: users.find(user => user._id === popupEvent.user)?.name } : null}
              onChange={(selectedOption) =>
                setPopupEvent({ ...popupEvent, user: selectedOption.value })
              }
              options={users.map((user) => ({
                value: user._id,
                label: user.name,
              }))}
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
  );
}

export default Month;
