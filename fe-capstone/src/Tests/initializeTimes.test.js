// src/__tests__/initializeTimes.test.js
import { availableTimesReducer } from '../App';

// Mock the global fetchAPI function
const mockFetchAPI = jest.fn();

beforeAll(() => {
    global.fetchAPI = mockFetchAPI;
});

beforeEach(() => {
    jest.clearAllMocks();
    // Mock returns a non-empty array as specified in instructions
    mockFetchAPI.mockReturnValue(['17:00', '18:00', '19:00', '20:00']);
});

describe('initializeTimes', () => {
    test('initializeTimes calls fetchAPI and returns non-empty array', () => {
        // Test the reducer with INITIALIZE_TIMES action
        const initialState = [];
        const action = { type: 'INITIALIZE_TIMES' };

        const newState = availableTimesReducer(initialState, action);

        // Verify fetchAPI was called
        expect(mockFetchAPI).toHaveBeenCalledTimes(1);

        // Verify it returns a non-empty array
        expect(Array.isArray(newState)).toBe(true);
        expect(newState.length).toBeGreaterThan(0);
        expect(newState).toEqual(['17:00', '18:00', '19:00', '20:00']);
    });

    test('initializeTimes uses fallback when fetchAPI is not available', () => {
        // Temporarily remove fetchAPI
        const originalFetchAPI = global.fetchAPI;
        delete global.fetchAPI;

        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

        const initialState = [];
        const action = { type: 'INITIALIZE_TIMES' };

        const newState = availableTimesReducer(initialState, action);

        // Should return fallback times
        expect(Array.isArray(newState)).toBe(true);
        expect(newState.length).toBeGreaterThan(0);
        expect(newState).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00']);

        expect(consoleWarnSpy).toHaveBeenCalledWith('fetchAPI not available, using fallback times');

        // Restore
        consoleWarnSpy.mockRestore();
        global.fetchAPI = originalFetchAPI;
    });
});