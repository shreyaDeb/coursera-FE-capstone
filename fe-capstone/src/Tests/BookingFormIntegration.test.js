// src/__tests__/BookingFormIntegration.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

describe('BookingForm Integration Tests', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00'],
        updateTimes: jest.fn(),
        dispatch: jest.fn(),
        submitForm: jest.fn().mockResolvedValue(true),
        onBookingSuccess: jest.fn()
    };

    test('complete booking flow with valid data', async () => {
        const user = userEvent.setup();
        render(<BookingForm {...mockProps} />);

        // Fill the form
        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i);
        const submitButton = screen.getByText('Make Your Reservation');

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        await user.type(dateInput, tomorrowString);
        await user.selectOptions(timeSelect, '19:00');
        await user.clear(guestsInput);
        await user.type(guestsInput, '3');
        await user.selectOptions(occasionSelect, 'Anniversary');

        // Verify form is valid
        expect(submitButton).not.toBeDisabled();

        // Submit form
        await user.click(submitButton);

        // Verify all functions called correctly
        await waitFor(() => {
            expect(mockProps.submitForm).toHaveBeenCalledWith({
                date: tomorrowString,
                time: '19:00',
                guests: 3,
                occasion: 'Anniversary'
            });

            expect(mockProps.onBookingSuccess).toHaveBeenCalledWith({
                date: tomorrowString,
                time: '19:00',
                guests: 3,
                occasion: 'Anniversary'
            });

            expect(mockProps.dispatch).toHaveBeenCalledWith({
                type: 'INITIALIZE_TIMES'
            });
        });
    });

    test('form maintains disabled state during submission', async () => {
        const user = userEvent.setup();

        // Mock a slow submission
        let resolveSubmission;
        const submissionPromise = new Promise(resolve => {
            resolveSubmission = resolve;
        });
        mockProps.submitForm.mockReturnValue(submissionPromise);

        render(<BookingForm {...mockProps} />);

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const submitButton = screen.getByText('Make Your Reservation');

        // Fill valid form data
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        await user.type(dateInput, tomorrowString);
        await user.selectOptions(timeSelect, '18:00');
        await user.clear(guestsInput);
        await user.type(guestsInput, '2');

        // Submit form
        await user.click(submitButton);

        // Button should show loading state and be disabled
        expect(submitButton).toHaveTextContent('Submitting...');
        expect(submitButton).toBeDisabled();

        // Complete the submission
        resolveSubmission(true);
        await submissionPromise;

        // Wait for form to reset and button to return to normal
        await waitFor(() => {
            expect(submitButton).toHaveTextContent('Make Your Reservation');
        });
    });
});