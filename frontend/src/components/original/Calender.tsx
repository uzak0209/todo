import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="p-4">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date!)}
        showTimeSelect
        dateFormat="yyyy/MM/dd HH:mm"
        timeFormat="HH:mm"
        timeIntervals={15} // 15分単位で時間選択
        className="border p-2 rounded"
      />
    </div>
  );
};

export default DateTimePicker;
