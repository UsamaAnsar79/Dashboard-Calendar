
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = async (event) => {
    try {
      const response = await axios.post("http://localhost:3001/events", event);
      setEvents((prevEvents) => [...prevEvents, response.data.event]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      const response = await axios.put(`http://localhost:3001/events/${id}`, updatedEvent);
      setEvents((prevEvents) => {
        return prevEvents.map((event) =>
          event._id === id ? response.data.event : event
        );
      });
    } catch (error) {
      console.error("Error updating event:", error);
    }
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
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
