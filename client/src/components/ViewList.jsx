
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// const ViewList = ({ event, onEditClick, onDeleteClick }) => {
//   const truncate = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   return (
//     <div className="event">
    
//       {truncate(event.title,5)}
     
//       <div className='event-show'>
//         <button
//           className="edit-btn"
//           onClick={(e) => {
//             e.stopPropagation();
//             onEditClick(event);
//           }}
//         >
//           <FontAwesomeIcon icon={faEdit} />
//         </button>
//         <button
//           className="trash-btn"
//           onClick={(e) => {
//             e.stopPropagation();
//             onDeleteClick(event.id);
//           }}
//         >
//           <FontAwesomeIcon icon={faTrashCan} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewList;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ViewList = ({ event, onEditClick, onDeleteClick }) => {
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="event">
      {truncate(event.title, 5)}

      <div className="event-show">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(event);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="trash-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(event.id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

export default ViewList;