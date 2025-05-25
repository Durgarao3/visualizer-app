import React, { useState } from 'react';
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import { BpkCode } from '@skyscanner/backpack-web/bpk-component-code';
import STYLES from './App.scss';
import CustomCalendar from './CustomCalendar';
import { customFormat } from './dateUtilsWrapper';
import flightsData from './flights.json';
import FlightResults from './FlightResults';
import { isValid, parseISO } from 'date-fns';

const getClassName = cssModules(STYLES);

const getSafeDate = (date) => {
  if (date instanceof Date && isValid(date)) return date;
  if (typeof date === 'string') {
    const parsed = parseISO(date);
    if (isValid(parsed)) return parsed;
  }
  return new Date();
};

const App = () => {
  const initialDate = getSafeDate(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [formattedDate, setFormattedDate] = useState(customFormat(initialDate, 'dd/MM/yyyy'));
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleDateSelect = (date) => {
    const safeDate = getSafeDate(date);
    console.log('Selected date:', safeDate);
    setSelectedDate(safeDate);
    setFormattedDate(customFormat(safeDate, 'dd/MM/yyyy'));
    setShowResults(false);
  };

  const handleContinue = () => {
    const safeDate = getSafeDate(selectedDate);
    if (!isValid(safeDate)) {
      alert('Please select a valid travel date!');
      return;
    }

    const selectedDateStr = customFormat(safeDate, 'yyyy-MM-dd');
    const results = flightsData.filter(flight =>
      flight.departureTime.startsWith(selectedDateStr)
    );

    setFilteredFlights(results);
    setShowResults(true);
  };

  return (
    <div className={getClassName('App')}>
      <header className={getClassName('App__header')}>
        <div className={getClassName('App__header-inner')}>
          <BpkText tagName="h1" textStyle="xxl" className={getClassName('App__heading')}>
            Flight Schedule
          </BpkText>
        </div>
      </header>
      <main className={getClassName('App__main')}>
        <BpkText tagName="p" className={getClassName('App__text')}>
          Select your travel date to view available flights.
        </BpkText>

        <div className={getClassName('App__calendar')}>
          <CustomCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        <BpkButton onClick={handleContinue}>
          Search Flights
        </BpkButton>

        {formattedDate && (
          <BpkText tagName="p" className={getClassName('App__selected-date')}>
            Selected Date: <BpkCode>{formattedDate}</BpkCode>
          </BpkText>
        )}

        {showResults && (
          <FlightResults flights={filteredFlights} />
        )}
      </main>
    </div>
  );
};

export default App;
