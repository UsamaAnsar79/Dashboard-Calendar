import {Routes, Route } from "react-router-dom";
import CalendarLayout from "./CalandarLayout";
import { EventProvider } from './EventContext';
import "./Calendar.css"
import Month from "./Month"
import Week from "./Week"
import Day from "./Day"
import Agenda from "./agenda";
import MonthView from "./MonthView";

const CalendarRouting = () => {
  return (
    <EventProvider>
      <Routes>
        <Route path="/" element={<CalendarLayout />}>
          <Route index element={<Month />} />
          <Route path="month/:monthIndex" element={<Month />} />
          <Route path="week" element={<Week />} />
          <Route path="day" element={<Day />} />
          <Route path="day/:date" element={<Day />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="monthview" element={<MonthView />} />
        </Route>
      </Routes> 
      </EventProvider>
  );
};

export default CalendarRouting;