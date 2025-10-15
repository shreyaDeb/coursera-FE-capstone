// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import BookingForm from '../components/BookingForm';
import BookingsTable from '../components/BookingsTable';

const BookingPage = ({ availableTimes, updateTimes, dispatch, submitForm }) => {
  const [bookingData, setBookingData] = useState([]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('littleLemonBookings');
    if (savedBookings) {
      setBookingData(JSON.parse(savedBookings));
    }
  }, []);

  // Function to handle new booking submissions
  const handleNewBooking = (formData) => {
    const newBooking = {
      ...formData,
      id: Date.now(),
      status: 'Confirmed',
      submittedAt: new Date().toISOString()
    };
    
    const updatedBookings = [...bookingData, newBooking];
    setBookingData(updatedBookings);
    localStorage.setItem('littleLemonBookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="booking-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Table Reservation</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Reserve your table at Little Lemon Restaurant
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Booking Form */}
        <div>
          <h2>Make a Reservation</h2>
          <BookingForm 
            availableTimes={availableTimes}
            updateTimes={updateTimes}
            dispatch={dispatch}
            submitForm={submitForm}
            onBookingSuccess={handleNewBooking}
          />
        </div>
        
        {/* Bookings Table */}
        <div>
          <BookingsTable bookingData={bookingData} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;