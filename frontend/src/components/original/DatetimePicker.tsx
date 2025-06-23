import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  selectedDate?: Date;
  onDateChange?: (date: Date | null) => void;
  showTimeSelect?: boolean;
  className?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  onDateChange,
  showTimeSelect = true,
  className = ""
}) => {
  const [startDate, setStartDate] = useState<Date>(selectedDate || new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onDateChange?.(date);
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