import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

const mockProps = {
    availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00'],
    updateTimes: jest.fn(),
    dispatch: jest.fn(),
    submitForm: jest.fn().mockResolvedValue(true),
    onBookingSuccess: jest.fn()
};

describe('BookingForm HTML5 Validation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('date input has required attribute and min date validation', () => {
        render(<BookingForm {...mockProps} />);

        const dateInput = screen.getByLabelText(/choose date/i);

        expect(dateInput).toBeRequired();

        const today = new Date().toISOString().split('T')[0];
        expect(dateInput).toHaveAttribute('min', today);

        expect(dateInput).toHaveAttribute('type', 'date');
    });

    test('time select has required attribute', () => {
        render(<BookingForm {...mockProps} />);

        const timeSelect = screen.getByLabelText(/choose time/i);

        expect(timeSelect).toBeRequired();

        expect(timeSelect).toBeInstanceOf(HTMLSelectElement);

        const defaultOption = screen.getByText('Select a time');
        expect(defaultOption).toBeInTheDocument();
        expect(defaultOption.value).toBe('');
    });

    test('guests input has required, min, and max attributes', () => {
        render(<BookingForm {...mockProps} />);

        const guestsInput = screen.getByLabelText(/number of guests/i);

        expect(guestsInput).toBeRequired();

        expect(guestsInput).toHaveAttribute('min', '1');
        expect(guestsInput).toHaveAttribute('max', '10');

        expect(guestsInput).toHaveAttribute('type', 'number');

        expect(guestsInput).toHaveValue(1);
    });

    test('occasion select has correct options but no required attribute', () => {
        render(<BookingForm {...mockProps} />);

        const occasionSelect = screen.getByLabelText(/occasion/i);

        expect(occasionSelect).not.toBeRequired();

        const birthdayOption = screen.getByText('Birthday');
        const anniversaryOption = screen.getByText('Anniversary');
        const engagementOption = screen.getByText('Engagement');
        const otherOption = screen.getByText('Other');

        expect(birthdayOption).toBeInTheDocument();
        expect(anniversaryOption).toBeInTheDocument();
        expect(engagementOption).toBeInTheDocument();
        expect(otherOption).toBeInTheDocument();

        expect(occasionSelect).toHaveValue('Birthday');
    });

    test('submit button is initially disabled', () => {
        render(<BookingForm {...mockProps} />);

        const submitButton = screen.getByText('Make Your Reservation');

        expect(submitButton).toBeDisabled();
    });
});