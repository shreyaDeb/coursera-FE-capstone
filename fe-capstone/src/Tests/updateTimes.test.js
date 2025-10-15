// src/__tests__/updateTimes.test.js
import { availableTimesReducer } from '../App';

// Mock the global fetchAPI function
const mockFetchAPI = jest.fn();

beforeAll(() => {
    global.fetchAPI = mockFetchAPI;
});

beforeEach(() => {
    jest.clearAllMocks();
    // Mock returns different times based on date
    mockFetchAPI.mockImplementation((date) => {
        const day = date.getDate();
        if (day === 25) { // Specific date for testing
            return ['17:00', '18:00', '19:00'];
        }
        return ['20:00', '21:00'];
    });
});

describe('updateTimes', () => {
    test('UPDATE_TIMES action calls fetchAPI with selected date and returns times', () => {
        const testDate = new Date('2023-12-25'); // Pre-selected date as per instructions
        const initialState = [];
        const action = {
            type: 'UPDATE_TIMES',
            payload: testDate // Include pre-selected date in dispatch data
        };

        const newState = availableTimesReducer(initialState, action);

        // Verify fetchAPI was called with the correct date
        expect(mockFetchAPI).toHaveBeenCalledWith(testDate);
        expect(mockFetchAPI).toHaveBeenCalledTimes(1);

        // Verify it returns the expected times array
        expect(Array.isArray(newState)).toBe(true);
        expect(newState.length).toBeGreaterThan(0);
        expect(newState).toEqual(['17:00', '18:00', '19:00']);
    });

    test('UPDATE_TIMES returns different times for different dates', () => {
        const date1 = new Date('2023-12-25');
        const date2 = new Date('2023-12-26');

        const action1 = { type: 'UPDATE_TIMES', payload: date1 };
        const action2 = { type: 'UPDATE_TIMES', payload: date2 };

        const state1 = availableTimesReducer([], action1);
        const state2 = availableTimesReducer([], action2);

        // Both should return arrays
        expect(Array.isArray(state1)).toBe(true);
        expect(Array.isArray(state2)).toBe(true);

        // They might have different lengths based on the mock implementation
        expect(state1.length).toBe(3);
        expect(state2.length).toBe(2);
    });

    test('UPDATE_TIMES uses fallback when fetchAPI is not available', () => {
        // Temporarily remove fetchAPI
        const originalFetchAPI = global.fetchAPI;
        delete global.fetchAPI;

        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

        const testDate = new Date('2023-12-25');
        const action = { type: 'UPDATE_TIMES', payload: testDate };

        const newState = availableTimesReducer([], action);

        // Should return fallback times
        expect(Array.isArray(newState)).toBe(true);
        expect(newState).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00']);

        expect(consoleWarnSpy).toHaveBeenCalledWith('fetchAPI not available, using fallback times');

        // Restore
        consoleWarnSpy.mockRestore();
        global.fetchAPI = originalFetchAPI;
    });
});