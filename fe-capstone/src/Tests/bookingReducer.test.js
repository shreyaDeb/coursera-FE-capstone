// src/__tests__/bookingReducer.test.js
import { availableTimesReducer } from '../App';

const mockFetchAPI = jest.fn();

describe('Booking Reducer Comprehensive Tests', () => {
    beforeAll(() => {
        global.fetchAPI = mockFetchAPI;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        mockFetchAPI.mockReturnValue(['17:00', '18:00', '19:00', '20:00']);
    });

    describe('initializeTimes', () => {
        test('calls fetchAPI and returns non-empty array of available times', () => {
            const initialState = [];
            const action = { type: 'INITIALIZE_TIMES' };

            const result = availableTimesReducer(initialState, action);

            expect(mockFetchAPI).toHaveBeenCalledTimes(1);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
            expect(result).toContain('17:00');
            expect(result).toContain('20:00');
        });

        test('returns consistent results for multiple calls', () => {
            const action = { type: 'INITIALIZE_TIMES' };

            const result1 = availableTimesReducer([], action);
            const result2 = availableTimesReducer([], action);

            // Both should be arrays with times
            expect(Array.isArray(result1)).toBe(true);
            expect(Array.isArray(result2)).toBe(true);
            expect(result1.length).toBe(result2.length);
        });
    });

    describe('updateTimes', () => {
        test('calls fetchAPI with selected date and returns available times', () => {
            const selectedDate = new Date('2023-12-25');
            const action = { type: 'UPDATE_TIMES', payload: selectedDate };

            const result = availableTimesReducer([], action);

            expect(mockFetchAPI).toHaveBeenCalledWith(selectedDate);
            expect(mockFetchAPI).toHaveBeenCalledTimes(1);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        test('handles different dates correctly', () => {
            const date1 = new Date('2023-12-25');
            const date2 = new Date('2023-12-26');

            // Mock different returns for different dates
            mockFetchAPI
                .mockReturnValueOnce(['17:00', '18:00']) // First call
                .mockReturnValueOnce(['19:00', '20:00']); // Second call

            const action1 = { type: 'UPDATE_TIMES', payload: date1 };
            const action2 = { type: 'UPDATE_TIMES', payload: date2 };

            const result1 = availableTimesReducer([], action1);
            const result2 = availableTimesReducer([], action2);

            expect(mockFetchAPI).toHaveBeenCalledWith(date1);
            expect(mockFetchAPI).toHaveBeenCalledWith(date2);
            expect(result1).toEqual(['17:00', '18:00']);
            expect(result2).toEqual(['19:00', '20:00']);
        });
    });

    describe('unknown actions', () => {
        test('returns current state for unknown action types', () => {
            const initialState = ['17:00', '18:00'];
            const action = { type: 'UNKNOWN_ACTION' };

            const result = availableTimesReducer(initialState, action);

            expect(result).toEqual(initialState);
            expect(mockFetchAPI).not.toHaveBeenCalled();
        });
    });

    describe('error handling', () => {
        test('uses fallback when fetchAPI throws error', () => {
            mockFetchAPI.mockImplementation(() => {
                throw new Error('API Error');
            });

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const action = { type: 'UPDATE_TIMES', payload: new Date() };
            const result = availableTimesReducer([], action);

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
            consoleWarnSpy.mockRestore();
        });
    });
});