// src/App.js
import React, { useReducer, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import Headers from './components/header';
import Footer from './components/footer';

// Initialize times using the API as instructed
const initializeTimes = () => {
  if (typeof window.fetchAPI === 'function') {
    const today = new Date();
    const times = window.fetchAPI(today);
    console.log('Initialized times using API:', times);
    return times;
  } else {
    console.warn('fetchAPI not available, using fallback times');
    return ['17:00', '18:00', '19:00', '20:00', '21:00'];
  }
};

// Update times using the API as instructed
const availableTimesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      if (typeof window.fetchAPI === 'function') {
        const dateObj = new Date(action.payload);
        const times = window.fetchAPI(dateObj);
        console.log('Updated times using API for date:', action.payload, times);
        return times;
      } else {
        console.warn('fetchAPI not available, using fallback times');
        return ['17:00', '18:00', '19:00', '20:00', '21:00'];
      }

    case 'INITIALIZE_TIMES':
      return initializeTimes();

    default:
      return state;
  }
};

// Main component function
function Main() {
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, [], initializeTimes);
  const navigate = useNavigate();

  // Check API availability
  useEffect(() => {
    console.log('=== API Functions Check ===');
    console.log('fetchAPI available:', typeof window.fetchAPI === 'function');
    console.log('submitAPI available:', typeof window.submitAPI === 'function');
  }, []);

  const updateTimes = (selectedDate) => {
    dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
  };

  // Submit form function as required by instructions
  const submitForm = async (formData) => {
    console.log('Submitting form data:', formData);
    
    try {
      // Use the submitAPI function as instructed
      if (typeof window.submitAPI === 'function') {
        const isSuccessful = window.submitAPI(formData);
        
        if (isSuccessful) {
          console.log('Booking submitted successfully, navigating to confirmation page');
          navigate('/confirmed');
          return true;
        } else {
          alert('Sorry, there was an error submitting your reservation. Please try again.');
          return false;
        }
      } else {
        // Fallback for testing
        console.warn('submitAPI not available, simulating successful submission');
        navigate('/confirmed');
        return true;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error submitting your reservation. Please try again.');
      return false;
    }
  };

  return (
    <div className="App">
      <Headers />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                availableTimes={availableTimes}
                updateTimes={updateTimes}
                dispatch={dispatch}
                submitForm={submitForm}
              />
            }
          />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Main;