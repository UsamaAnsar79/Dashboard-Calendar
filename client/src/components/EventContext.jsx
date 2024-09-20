

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get("http://localhost:3001/events");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const addEvent = async (event) => {
    const response = await axios.post("http://localhost:3001/events", event);
    setEvents((prevEvents) => [...prevEvents, response.data.event]);
  };

  const updateEvent = async (id, updatedEvent) => {
    const response = await axios.put(
      `http://localhost:3001/events/${id}`,
      updatedEvent
    );
    console.log("Updating event:", response.data.event);
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event._id === id ? response.data.event : event
      );
      console.log("Events after update:", updatedEvents);
      return updatedEvents;
    });
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);