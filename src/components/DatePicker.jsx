import React from 'react'
import DatePicker from "react-datepicker";
import { useState } from 'react';

const Example = () => {
    const [date, setDate] = useState(new Date());

    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");
  
    return (
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
      />
    );
}

export default Example
