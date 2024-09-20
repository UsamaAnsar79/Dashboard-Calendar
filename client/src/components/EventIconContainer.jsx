
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const EventIconContainer = ({ date, isDateSelected, onAddEventClick}) => {
  const navigate = useNavigate();

  const navigateToDayView = () => {
    console.log("Navigating to day view for date:", date);
    navigate(`/home/day/${date.toISOString().split('T')[0]}`);
  };

  return (
    <div
      className={`event-icon-container ${isDateSelected ? 'show-icon' : ''}`}
      onClick={(e) => e.stopPropagation()} 
    >
      <button
        className="add-event-btn"
        title="add-event"
        onClick={() => onAddEventClick(date)}
      >
        <FontAwesomeIcon icon={faCalendarPlus} />
      </button>
      {isDateSelected && (
        <button
          className="view-events-btn"
          title="view-event"
          onClick={navigateToDayView}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      )}
    </div>
  );
};

export default EventIconContainer;
