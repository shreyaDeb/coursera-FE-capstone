// src/components/BookingForm.js
import React, { useState, useEffect } from 'react';

const BookingForm = ({ availableTimes, updateTimes, dispatch, submitForm, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiAvailable, setApiAvailable] = useState({
    fetchAPI: false,
    submitAPI: false
  });

  // Check API availability on component mount
  useEffect(() => {
    setApiAvailable({
      fetchAPI: typeof window.fetchAPI === 'function',
      submitAPI: typeof window.submitAPI === 'function'
    });

    if (typeof window.fetchAPI !== 'function') {
      console.warn('fetchAPI is not available - using fallback mode');
    }
    if (typeof window.submitAPI !== 'function') {
      console.warn('submitAPI is not available - using fallback mode');
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === 'date') {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
      updateTimes(value);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: id === 'guests' ? parseInt(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.date || !formData.time || !formData.guests) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Use the submitForm function passed via props
      const isSuccessful = await submitForm(formData);

      if (isSuccessful) {
        console.log('Reservation Details:', formData);
        
        // Call the success callback if provided
        if (onBookingSuccess) {
          onBookingSuccess(formData);
        }

        // Reset form
        setFormData({
          date: '',
          time: '',
          guests: 1,
          occasion: 'Birthday'
        });

        // Reset available times to initial state
        dispatch({ type: 'INITIALIZE_TIMES' });
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Sorry, there was an error submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced validation function
  const isFormValid = () => {
    return formData.date && 
           formData.time && 
           formData.guests >= 1 && 
           formData.guests <= 10;
  };

  return (
    <div>
      <h2>Reserve Your Table</h2>

      {/* API Status Indicator */}
      {!apiAvailable.fetchAPI || !apiAvailable.submitAPI ? (
        <div style={{
          padding: '10px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '0.9rem'
        }}>
          <strong>Note:</strong> Running in offline mode. Some features may be limited.
        </div>
      ) : null}

      <form
        style={{
          display: 'grid',
          maxWidth: '300px',
          gap: '20px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="date">Choose date *</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label htmlFor="time">Choose time *</label>
          <select
            id="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select a time</option>
            {availableTimes && availableTimes.map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
          {availableTimes && availableTimes.length === 0 && (
            <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
              No available times for this date. Please select another date.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="guests">Number of guests *</label>
          <input
            type="number"
            id="guests"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Engagement">Engagement</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          style={{
            padding: '12px',
            backgroundColor: (!isFormValid() || isSubmitting) ? '#cccccc' : '#f4ce14',
            color: (!isFormValid() || isSubmitting) ? '#666' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: (!isFormValid() || isSubmitting) ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Make Your Reservation'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;