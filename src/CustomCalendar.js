import React from 'react';
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from '@skyscanner/backpack-web/bpk-component-calendar';
import BpkInput, {
  INPUT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-input';
import { format, addMonths, isValid, parseISO } from 'date-fns';

const daysOfWeek = [
  { name: 'Monday', nameAbbr: 'Mon', index: 1, isWeekend: false },
  { name: 'Tuesday', nameAbbr: 'Tue', index: 2, isWeekend: false },
  { name: 'Wednesday', nameAbbr: 'Wed', index: 3, isWeekend: false },
  { name: 'Thursday', nameAbbr: 'Thu', index: 4, isWeekend: false },
  { name: 'Friday', nameAbbr: 'Fri', index: 5, isWeekend: false },
  { name: 'Saturday', nameAbbr: 'Sat', index: 6, isWeekend: true },
  { name: 'Sunday', nameAbbr: 'Sun', index: 0, isWeekend: true },
];

const getSafeDate = (date) => {
  if (date instanceof Date && isValid(date)) return date;
  if (typeof date === 'string') {
    const parsed = parseISO(date);
    if (isValid(parsed)) return parsed;
  }
  return new Date();
};

const formatDateFull = (date) =>
  date instanceof Date && isValid(date) ? format(date, 'EEEE, do MMMM yyyy') : '';

const formatMonth = (date) =>
  date instanceof Date && isValid(date) ? format(date, 'MMMM yyyy') : '';

const CustomCalendar = ({ selectedDate, onDateSelect }) => {
  const safeDate = getSafeDate(selectedDate);

  const handleDateChange = (date) => {
    const safe = getSafeDate(date);
    if (onDateSelect && isValid(safe)) {
      onDateSelect(safe); 
    }
  };

  return (
    <div>
      <BpkInput
        id="dateInput"
        type={INPUT_TYPES.text}
        name="date"
        value={safeDate ? format(safeDate, 'yyyy-MM-dd') : ''}
        placeholder="Departure date"
        readOnly
      />
      <BpkCalendar
        id="calendar"
        onDateSelect={handleDateChange}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={daysOfWeek}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        nextMonthLabel="Next month"
        previousMonthLabel="Previous month"
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: safeDate,
        }}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 6)}
      />
    </div>
  );
};

export default CustomCalendar;
