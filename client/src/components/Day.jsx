
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useEvents } from './EventContext';
// import DayCalendarBody from './DayBody'; 
// import { useParams } from 'react-router-dom';

// // Utility function to generate unique IDs
// const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
// // ...........
// const parseDateFromParams = (dateString) => {
//   const [year, month, day] = dateString.split('-').map(Number);
//   return new Date(Date.UTC(year, month - 1, day+1));
// };

// const normalizeDate = (date) => {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// };
// const Day = () => {
//   const { date } = useParams();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [popup, setPopup] = useState(false);
//   const [popupEvent, setPopupEvent] = useState({ title: "", description: "", time: "" });
//   const [editingEvent, setEditingEvent] = useState(null);
//   const { events, addEvent, updateEvent, deleteEvent } = useEvents();

//   const hours = Array.from({ length: 24 }, (_, i) => i);

//   const today = new Date().toDateString();
//   const currentHour = new Date().getHours();
//   useEffect(() => {
//     if (date) {
//       const parsedDate = parseDateFromParams(date);
//       setCurrentDate(normalizeDate(parsedDate));
//     }
//   }, [date]);

//   const handlePreviousDay = () => {
//     setCurrentDate(prevDate => {
//       const newDate = new Date(prevDate);
//       newDate.setDate(newDate.getDate() - 1);
//       return newDate;
//     });
//   };

//   const handleNextDay = () => {
//     setCurrentDate(prevDate => {
//       const newDate = new Date(prevDate);
//       newDate.setDate(newDate.getDate() + 1);
//       return newDate;
//     });
//   };

//   const filteredEvents = events.filter(event =>
//     new Date(event.date).toDateString() === currentDate.toDateString()
//   );

//   const handleTimeSlotClick = (hour) => {
//     const eventTime = `${hour.toString().padStart(2, '0')}:00`;
//     const existingEvent = filteredEvents.find(event => parseInt(event.time.split(":")[0], 10) === hour);

//     if (existingEvent) {
//       setPopupEvent(existingEvent);
//       setEditingEvent(existingEvent);
//     } else {
//       setPopupEvent({ title: "", description: "", time: eventTime });
//       setEditingEvent(null);
//     }
//     setPopup(true);
//   };

//   const handleEditEvent = (event) => {
//     setPopupEvent(event);
//     setEditingEvent(event);
//     setPopup(true);
//   };

//   const handleDeleteEvent = (eventId,e) => {
//     e.stopPropagation();
//     deleteEvent(eventId);
   
//   };

//   const popupSave = () => {
//     if (popupEvent.title) {
//       const eventDate = new Date(currentDate);
//       eventDate.setHours(parseInt(popupEvent.time.split(":")[0], 10), 0, 0, 0);

//       const newEvent = {
//         id: editingEvent ? editingEvent._id : generateUniqueId(), 
//         ...popupEvent,
//         date: eventDate,
//       };

//       if (editingEvent) {
//         updateEvent(editingEvent._id, newEvent);
//         setEditingEvent(null);
//       } else {
//         addEvent(newEvent);
//       }

//       setPopup(false);
//     }
//   };

//   const popupClose = () => {
//     setPopup(false);
//     setPopupEvent({ title: "", description: "", time: "" });
//     setEditingEvent(null);
//   };

//   return (
//     <div className="calendar-main">
//       <div className="calendar">
//         <div className="calendar-header">
//           <button onClick={handlePreviousDay}>
//             <FontAwesomeIcon icon={faArrowLeft} />
//           </button>
//           <button onClick={() => setCurrentDate(new Date())}>Current Day</button>
//           <button onClick={handleNextDay}>
//             <FontAwesomeIcon icon={faArrowRight} />
//           </button>
//           <div className="calendar-header-title">
//             <h2>{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit' })}</h2>
//           </div>
//         </div>

//         {/* Use the new DayCalendarBody component */}
//         <DayCalendarBody
//           hours={hours}
//           currentDate={currentDate}
//           today={today}
//           currentHour={currentHour}
//           filteredEvents={filteredEvents}
//           handleTimeSlotClick={handleTimeSlotClick}
//           handleEditEvent={handleEditEvent}
//           handleDeleteEvent={handleDeleteEvent}
//         />
//       </div>

//       {/* Popup */}
//       {popup && (
//         <div className="popup">
//           <div className="popup-content">
//             <h3>{editingEvent ? "Edit Event" : "Add an Event"} on {currentDate.toDateString()}</h3>
//             <input
//               type="text"
//               placeholder="Title"
//               value={popupEvent.title}
//               onChange={(e) =>
//                 setPopupEvent({ ...popupEvent, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={popupEvent.description}
//               onChange={(e) =>
//                 setPopupEvent({ ...popupEvent, description: e.target.value })
//               }
//             />
//             <input
//               type="time"
//               value={popupEvent.time}
//               onChange={(e) =>
//                 setPopupEvent({ ...popupEvent, time: e.target.value })
//               }
//               onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//             />
//             <div className="popup-buttons">
//               <button onClick={popupSave}>
//                 {editingEvent ? "Update Event" : "Add Event"}
//               </button>
//               <button onClick={popupClose}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Day;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEvents } from './EventContext';
import DayCalendarBody from './DayBody';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const parseDateFromParams = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1));
};

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const Day = () => {
  const { date } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popup, setPopup] = useState(false);
  const [popupEvent, setPopupEvent] = useState({ title: "", description: "", time: "", users: [] });
  const [editingEvent, setEditingEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date().toDateString();
  const currentHour = new Date().getHours();

  useEffect(() => {
    if (date) {
      const parsedDate = parseDateFromParams(date);
      setCurrentDate(normalizeDate(parsedDate));
    }
  }, [date]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handlePreviousDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const filteredEvents = events.filter(event =>
    new Date(event.date).toDateString() === currentDate.toDateString()
  );

  const handleTimeSlotClick = (hour) => {
    const eventTime = `${hour.toString().padStart(2, '0')}:00`;
    const existingEvent = filteredEvents.find(event => parseInt(event.time.split(":")[0], 10) === hour);

    if (existingEvent) {
      setPopupEvent(existingEvent);
      setEditingEvent(existingEvent);
    } else {
      setPopupEvent({ title: "", description: "", time: eventTime, users: [] });
      setEditingEvent(null);
    }
    setPopup(true);
  };

  const handleEditEvent = (event) => {
    setPopupEvent(event);
    setEditingEvent(event);
    setPopup(true);
  };

  const handleDeleteEvent = (eventId, e) => {
    e.stopPropagation();
    deleteEvent(eventId);
  };

  const popupSave = () => {
    if (popupEvent.title) {
      const eventDate = new Date(currentDate);
      eventDate.setHours(parseInt(popupEvent.time.split(":")[0], 10), 0, 0, 0);

      const newEvent = {
        id: editingEvent ? editingEvent._id : generateUniqueId(),
        ...popupEvent,
        date: eventDate,
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
    setPopupEvent({ title: "", description: "", time: "", users: [] });
    setEditingEvent(null);
  };

  return (
    <div className="calendar-main">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePreviousDay}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => setCurrentDate(new Date())}>Current Day</button>
          <button onClick={handleNextDay}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="calendar-header-title">
            <h2>{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit' })}</h2>
          </div>
        </div>

        <DayCalendarBody
          hours={hours}
          currentDate={currentDate}
          today={today}
          currentHour={currentHour}
          filteredEvents={filteredEvents}
          handleTimeSlotClick={handleTimeSlotClick}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{editingEvent ? "Edit Event" : "Add an Event"} on {currentDate.toDateString()}</h3>
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
              isMulti
              options={users.map(user => ({ value: user._id, label: user.name }))} 
              value={popupEvent.users}
              onChange={(selectedOptions) => setPopupEvent({ ...popupEvent, users: selectedOptions })}
              placeholder="Select Users"
            />
            <div className="popup-buttons">
              <button onClick={popupSave}>
                {editingEvent ? "Update Event" : "Add Event"}
              </button>
              <button onClick={popupClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Day;
