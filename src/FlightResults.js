import React from 'react';
import PropTypes from 'prop-types';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import { format, isValid } from 'date-fns';

const safeFormat = (dateString, fmt) => {
  const date = new Date(dateString);
  return isValid(date) ? format(date, fmt) : '--:--';
};

const FlightResults = ({ flights }) => {
  if (!flights.length) {
    return <BpkText>No flights found for the selected date.</BpkText>;
  }

  return (
    <div>
      {flights.map((flight) => (
        <BpkCard key={flight.flightNumber} className="flight-card">
          <BpkText tagName="h3">{flight.origin} → {flight.destination}</BpkText>
          <BpkText>
            Departure: {safeFormat(flight.departureTime, 'HH:mm')} | Arrival: {safeFormat(flight.arrivalTime, 'HH:mm')}
          </BpkText>
          <BpkText>Flight: {flight.flightNumber}</BpkText>
          <BpkText>Price: ₹{flight.price.toLocaleString('en-IN')}</BpkText>
        </BpkCard>
      ))}
    </div>
  );
};

FlightResults.propTypes = {
  flights: PropTypes.arrayOf(PropTypes.shape({
    flightNumber: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default FlightResults;
