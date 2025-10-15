// src/Reducers/timesReducer.js

// Use the submitAPI function as instructed
export const submitBooking = async (formData) => {
  console.log('Submitting booking using API:', formData);
  
  // Use the API function as required by instructions
  if (typeof window.submitAPI === 'function') {
    const result = window.submitAPI(formData);
    console.log('API submission result:', result);
    return result;
  } else {
    console.warn('submitAPI not available, using fallback');
    return true;
  }
};

export const getAvailableTimes = (date) => {
  if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
    try {
      // Convert string date to Date object if needed
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return window.fetchAPI(dateObj);
    } catch (error) {
      console.error('Error calling fetchAPI:', error);
      return getFallbackTimes(date);
    }
  } else {
    console.warn('fetchAPI not available, using fallback times');
    return getFallbackTimes(date);
  }
};

// Fallback times function
const getFallbackTimes = (date) => {
  const day = new Date(date).getDay();
  if (day === 0 || day === 6) { // Weekend
    return ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
  } else { // Weekday
    return ['17:00', '18:00', '19:00', '20:00', '21:00'];
  }
};