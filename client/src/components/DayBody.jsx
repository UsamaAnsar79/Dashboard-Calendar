
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const DayCalendarBody = ({
  hours,
  currentDate,
  today,
  currentHour,
  filteredEvents,
  handleTimeSlotClick,
  handleEditEvent,
  handleDeleteEvent
}) => {
  const formatHour = (hour) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjustedHour}:00 ${suffix}`;
  };

  return (
    <div className="day-calendar-body">
      <div className="day-calendar-time-grid-body">
        {hours.map((hour) => (
          <div key={hour} className="day-calendar-time-row">
            <div className="day-calendar-time">{formatHour(hour)}</div>
            <div
              className={`day-calendar-time-cell ${currentDate.toDateString() === today ? 'selected' : ''} ${hour === currentHour ? 'current-hour' : ''}`}
              onClick={() => handleTimeSlotClick(hour)}
            >
              {filteredEvents
                .filter(event => parseInt(event.time.split(":")[0], 10) === hour)
                .map((event) => (
                  <div key={event.id} className="event-block">
                    {event.title}
                    <div>
                      <button onClick={() => handleEditEvent(event)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="trash-btn" onClick={(e) => handleDeleteEvent(event.id, e)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCalendarBody;

