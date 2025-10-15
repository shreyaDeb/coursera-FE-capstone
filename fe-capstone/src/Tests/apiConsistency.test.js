// src/__tests__/apiConsistency.test.js

const mockFetchAPI = jest.fn();
const mockSubmitAPI = jest.fn();

beforeAll(() => {
  global.fetchAPI = mockFetchAPI;
  global.submitAPI = mockSubmitAPI;
});

beforeEach(() => {
  jest.clearAllMocks();
  
  mockFetchAPI.mockImplementation((date) => {
    const seededRandom = (seed) => {
      const m = 2**35 - 31;
      const a = 185852;
      let s = seed % m;
      return () => (s = s * a % m) / m;
    };

    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
      if(random() < 0.5) {
        result.push(i + ':00');
      }
      if(random() < 0.5) {
        result.push(i + ':30');
      }
    }
    return result.sort((a, b) => {
      const [aHours, aMinutes] = a.split(':').map(Number);
      const [bHours, bMinutes] = b.split(':').map(Number);
      return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
    });
  });

  mockSubmitAPI.mockReturnValue(true);
});

describe('API Consistency Tests', () => {
  test('fetchAPI produces valid time formats', () => {
    const testDates = [
      new Date('2023-12-25'),
      new Date('2023-12-26'),
      new Date('2023-12-27'),
      new Date('2023-12-28'),
      new Date('2023-12-29')
    ];

    testDates.forEach(date => {
      const times = global.fetchAPI(date);
      expect(Array.isArray(times)).toBe(true);

      times.forEach(time => {
        expect(time).toMatch(/^(1[7-9]|2[0-3]):(00|30)$/);
      });

      // Times should be in chronological order
      const sortedTimes = [...times].sort((a, b) => {
        const [aHours, aMinutes] = a.split(':').map(Number);
        const [bHours, bMinutes] = b.split(':').map(Number);
        return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
      });

      expect(times).toEqual(sortedTimes);
    });
  });

  test('fetchAPI respects time boundaries', () => {
    const testDate = new Date();
    const times = global.fetchAPI(testDate);

    times.forEach(time => {
      const [hours, minutes] = time.split(':').map(Number);
      expect(hours).toBeGreaterThanOrEqual(17);
      expect(hours).toBeLessThanOrEqual(23);
      expect([0, 30]).toContain(minutes);
    });
  });

  test('submitAPI accepts various form data structures', () => {
    const testCases = [
      { date: '2023-12-25', time: '18:00' },
      { date: '2023-12-25', time: '18:00', guests: 4 },
      { date: '2023-12-25', time: '18:00', guests: 4, occasion: 'Birthday' },
    ];

    testCases.forEach(formData => {
      const result = global.submitAPI(formData);
      expect(result).toBe(true);
      expect(mockSubmitAPI).toHaveBeenCalledWith(formData);
    });
  });
});