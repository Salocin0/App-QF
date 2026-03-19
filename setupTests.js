import { jest } from '@jest/globals';

// Mock ToastAndroid
jest.mock('react-native/Libraries/Components/ToastAndroid/ToastAndroid', () => ({
  show: jest.fn(),
  SHORT: 0,
  LONG: 1,
}));

// Mock console.error to avoid noise in tests
console.error = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock process.env
global.process = global.process || {};
global.process.env = global.process.env || {};
global.process.env.REACT_APP_BACK_URL = 'http://127.0.0.1:8000';