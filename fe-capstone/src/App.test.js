// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the child components
jest.mock('../src/pages/HomePage', () => () => <div>Home Page</div>);
jest.mock('../src/pages/BookingPage', () => () => <div>Booking Page</div>);
jest.mock('../src/components/header', () => () => <div>Header</div>);
jest.mock('../src/components/footer', () => () => <div>Footer</div>);

// Mock the API functions
const mockFetchAPI = jest.fn();
const mockSubmitAPI = jest.fn();

beforeAll(() => {
  global.fetchAPI = mockFetchAPI;
  global.submitAPI = mockSubmitAPI;
});

beforeEach(() => {
  jest.clearAllMocks();
  mockFetchAPI.mockReturnValue(['17:00', '18:00', '19:00', '20:00', '21:00']);
  mockSubmitAPI.mockReturnValue(true);
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});