// src/__tests__/BookingFormJSValidation.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

// Helper to get tomorrow's date
const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const mockProps = {
  availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00'],
  updateTimes: jest.fn(),
  dispatch: jest.fn(),
  submitForm: jest.fn(),
  onBookingSuccess: jest.fn()
};

describe('BookingForm JavaScript Validation', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    jest.clearAllMocks();
    mockProps.submitForm.mockResolvedValue(true);
  });

  test('form validation passes with valid data', async () => {
    render(<BookingForm {...mockProps} />);

    const dateInput = screen.getByTestId('date-input');
    const timeSelect = screen.getByTestId('time-select');
    const guestsInput = screen.getByTestId('guests-input');
    const submitButton = screen.getByTestId('submit-button');

    const tomorrowString = getTomorrowDateString();

    // Fill form
    await user.type(dateInput, tomorrowString);
    await user.selectOptions(timeSelect, '18:00');
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Button should be enabled
    expect(submitButton).not.toBeDisabled();

    // Submit form
    await user.click(submitButton);

    // Verify submission
    await waitFor(() => {
      expect(mockProps.submitForm).toHaveBeenCalledWith({
        date: tomorrowString,
        time: '18:00',
        guests: 4,
        occasion: 'Birthday'
      });
    });
  });

  test('form validation fails with missing date', async () => {
    render(<BookingForm {...mockProps} />);

    const timeSelect = screen.getByTestId('time-select');
    const guestsInput = screen.getByTestId('guests-input');
    const submitButton = screen.getByTestId('submit-button');

    // Fill only time and guests
    await user.selectOptions(timeSelect, '18:00');
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Button should be disabled
    expect(submitButton).toBeDisabled();

    // Try to submit (should not work)
    await user.click(submitButton);

    expect(mockProps.submitForm).not.toHaveBeenCalled();
  });

  test('form validation fails with missing time', async () => {
    render(<BookingForm {...mockProps} />);

    const dateInput = screen.getByTestId('date-input');
    const guestsInput = screen.getByTestId('guests-input');
    const submitButton = screen.getByTestId('submit-button');

    const tomorrowString = getTomorrowDateString();

    // Fill only date and guests
    await user.type(dateInput, tomorrowString);
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Button should be disabled
    expect(submitButton).toBeDisabled();

    await user.click(submitButton);

    expect(mockProps.submitForm).not.toHaveBeenCalled();
  });

  test('form validation fails with invalid guest count', async () => {
    render(<BookingForm {...mockProps} />);

    const dateInput = screen.getByTestId('date-input');
    const timeSelect = screen.getByTestId('time-select');
    const guestsInput = screen.getByTestId('guests-input');
    const submitButton = screen.getByTestId('submit-button');

    const tomorrowString = getTomorrowDateString();

    // Fill date and time
    await user.type(dateInput, tomorrowString);
    await user.selectOptions(timeSelect, '18:00');

    // Test invalid guest counts
    const invalidCounts = ['0', '-1', '11'];
    for (const count of invalidCounts) {
      await user.clear(guestsInput);
      await user.type(guestsInput, count);
      expect(submitButton).toBeDisabled();
    }

    expect(mockProps.submitForm).not.toHaveBeenCalled();
  });

  test('form resets after successful submission', async () => {
    render(<BookingForm {...mockProps} />);

    const dateInput = screen.getByTestId('date-input');
    const timeSelect = screen.getByTestId('time-select');
    const guestsInput = screen.getByTestId('guests-input');
    const submitButton = screen.getByTestId('submit-button');

    const tomorrowString = getTomorrowDateString();

    // Fill valid form
    await user.type(dateInput, tomorrowString);
    await user.selectOptions(timeSelect, '18:00');
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Submit
    await user.click(submitButton);

    // Wait for reset
    await waitFor(() => {
      expect(dateInput).toHaveValue('');
      expect(timeSelect).toHaveValue('');
      expect(guestsInput).toHaveValue(1);
    });

    // Button should be disabled after reset
    expect(submitButton).toBeDisabled();
  });

  test('updateTimes is called when date changes', async () => {
    render(<BookingForm {...mockProps} />);

    const dateInput = screen.getByTestId('date-input');
    const tomorrowString = getTomorrowDateString();

    await user.type(dateInput, tomorrowString);

    expect(mockProps.updateTimes).toHaveBeenCalledWith(tomorrowString);
  });

  test('handles form submission errors gracefully', async () => {
    // Mock failed submission
    mockProps.submitForm.mockResolvedValue(false);

    render(<BookingForm {...mockProps} />);

    const dateInput = screen.getByTestId('date-input');
    const timeSelect = screen.getByTestId('time-select');
    const guestsInput = screen.getByTestId('guests-input');
    const submitButton = screen.getByTestId('submit-button');

    const tomorrowString = getTomorrowDateString();

    // Fill form
    await user.type(dateInput, tomorrowString);
    await user.selectOptions(timeSelect, '18:00');
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Submit
    await user.click(submitButton);

    // Verify submission was attempted
    await waitFor(() => {
      expect(mockProps.submitForm).toHaveBeenCalled();
    });

    // Form should NOT reset on failure
    expect(dateInput).toHaveValue(tomorrowString);
    expect(timeSelect).toHaveValue('18:00');
    expect(guestsInput).toHaveValue(4);
  });
});