import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from "@/types/types"; // Adjust the import path as necessary
interface DateTimePickerProps {
  selectedDate?: Date;
  onDateChange: (task: Task) => void;
  showTimeSelect?: boolean;
  className?: string;
  task: Task; // Assuming Task is defined in your types
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  onDateChange,
  showTimeSelect = true,
  className = "",
  task
}) => {
  const [startDate, setStartDate] = useState<Date>(selectedDate || new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onDateChange({...task, deadline: date }); 
    }
  };

  return (
    <div className={`p-4 ${className}`}>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        showTimeSelect={showTimeSelect}
        dateFormat={showTimeSelect ? "yyyy/MM/dd HH:mm" : "yyyy/MM/dd"}
        timeFormat="HH:mm"
        timeIntervals={15}
        className="border p-2 rounded w-full"
        placeholderText="日時を選択してください"
      />
    </div>
  );
};

export default DateTimePicker;