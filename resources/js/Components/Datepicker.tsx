import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <>
      <DatePicker
        // id="date-picker"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </>
  );
};

export default CustomDatePicker;